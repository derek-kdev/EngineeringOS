// apps/web/components/dashboard/prototype/layout/PrototypeViewport.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from "three/addons/controls/DragControls.js";
import {
  Box,
  Grid3X3,
  Flame,
  Activity,
  Eye,
  Expand,
  RotateCcw,
  Move,
} from "lucide-react";

type ViewMode = "solid" | "wireframe" | "thermal" | "stress" | "xray" | "explode";

interface PrototypeViewportProps {
  running: boolean;
  wireframe: boolean;
  onToggleWireframe: () => void;
}

export default function PrototypeViewport({
  running,
  wireframe: _wireframeProp,
  onToggleWireframe: _onToggleWireframe,
}: PrototypeViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const materialRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const partRefs = useRef<THREE.Mesh[]>([]); // all meshes in model
  const originalPositions = useRef<Map<THREE.Mesh, THREE.Vector3>>(new Map());
  const tempValues = useRef<number[]>([]); // per-part temperature

  const [viewMode, setViewMode] = useState<ViewMode>("solid");
  const [isOrthographic, setIsOrthographic] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const [zoom, setZoom] = useState(0);

  // Three.js setup (mostly unchanged)
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b132b);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.target.set(0, 0, 0);
    controls.update();
    controlsRef.current = controls;

    // Lighting (same)
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x0088ff, 0.3);
    fillLight.position.set(-10, 0, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff6600, 0.2);
    rimLight.position.set(0, -5, -10);
    scene.add(rimLight);

    // Grid and axes
    const gridHelper = new THREE.GridHelper(20, 20, 0x00d2ff, 0x00d2ff);
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    const planeGeo = new THREE.PlaneGeometry(20, 20);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.01;
    plane.receiveShadow = true;
    scene.add(plane);

    // Model assembly (same as before)
    const modelGroup = new THREE.Group();
    const materials: THREE.MeshStandardMaterial[] = [];
    const meshes: THREE.Mesh[] = [];

    // We'll generate parts with names and materials
    const partData = [
      { name: "Base Plate", color: 0x4a6fa5, pos: [0, 0.2, 0], geo: new THREE.BoxGeometry(3, 0.4, 2) },
      { name: "Shoulder Joint", color: 0xcc8844, pos: [0, 0.8, 0], geo: new THREE.CylinderGeometry(0.6, 0.6, 0.8, 16) },
      { name: "Upper Arm", color: 0x88aadd, pos: [0, 1.8, 0], geo: new THREE.BoxGeometry(0.5, 1.8, 0.5) },
      { name: "Elbow Joint", color: 0xcc8844, pos: [0.6, 2.6, 0], geo: new THREE.SphereGeometry(0.4, 16, 16) },
      { name: "Forearm", color: 0x88aadd, pos: [1.2, 2.6, 0], geo: new THREE.BoxGeometry(0.4, 1.2, 0.4) },
      { name: "End Effector", color: 0xffaa44, pos: [1.8, 2.6, 0], geo: new THREE.BoxGeometry(0.3, 0.3, 0.3) },
    ];

    const tempVals: number[] = [];
    partData.forEach((p, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: p.color,
        metalness: 0.4,
        roughness: 0.6,
      });
      const mesh = new THREE.Mesh(p.geo, mat);
      const pos = new THREE.Vector3(p.pos[0], p.pos[1], p.pos[2]);
      mesh.position.copy(pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { name: p.name, originalPos: pos.clone() };
      modelGroup.add(mesh);
      materials.push(mat);
      meshes.push(mesh);
      // Assign random temperature for thermal demo (20-80 °C)
      const temp = 20 + Math.random() * 60;
      tempVals.push(temp);
    });

    scene.add(modelGroup);
    modelRef.current = modelGroup;
    materialRefs.current = materials;
    partRefs.current = meshes;

    // Store original positions
    const posMap = new Map<THREE.Mesh, THREE.Vector3>();
    meshes.forEach(m => posMap.set(m, m.position.clone()));
    originalPositions.current = posMap;
    tempValues.current = tempVals;

    // Drag controls setup
    const dragControls = new DragControls(meshes, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', (event) => {
      controls.enabled = false;
      // Highlight the dragged object? We'll just change emissive.
      if (event.object) {
        const mat = (event.object as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissive = new THREE.Color(0x00d2ff);
        mat.emissiveIntensity = 0.3;
      }
    });
    dragControls.addEventListener('drag', (event) => {
      // Update positions in map if needed
    });
    dragControls.addEventListener('dragend', (event) => {
      controls.enabled = true;
      if (event.object) {
        const mat = (event.object as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.emissive = new THREE.Color(0x000000);
        mat.emissiveIntensity = 0;
        // Update original position? We'll keep the dragged position as new original? No, we want reset to original when "Reassemble" is clicked.
        // So we do not update originalPositions.
      }
    });

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dragControls.dispose?.();
    };
  }, []);

  // Apply view mode changes
  useEffect(() => {
    if (!modelRef.current) return;
    const materials = materialRefs.current;
    const model = modelRef.current;
    const meshes = partRefs.current;

    // Reset materials
    materials.forEach((mat) => {
      mat.wireframe = false;
      mat.transparent = false;
      mat.opacity = 1;
      mat.emissive = new THREE.Color(0x000000);
      mat.emissiveIntensity = 0;
    });

    switch (viewMode) {
      case "solid":
        // Restore original colors (approximate)
        const colors = [0x4a6fa5, 0xcc8844, 0x88aadd, 0xcc8844, 0x88aadd, 0xffaa44];
        materials.forEach((mat, i) => {
          if (i < colors.length) mat.color.setHex(colors[i]);
        });
        break;
      case "wireframe":
        materials.forEach((mat) => {
          mat.wireframe = true;
          mat.color.setHex(0x00d2ff);
        });
        break;
      case "thermal":
        // Use temperature values to color parts
        materials.forEach((mat, i) => {
          const temp = tempValues.current[i] || 25;
          // Map temp 20-80 to hue from blue (0.6) to red (0.0)
          const t = Math.min(Math.max((temp - 20) / 60, 0), 1);
          const color = new THREE.Color();
          color.setHSL(0.6 - t * 0.6, 1, 0.5);
          mat.color.copy(color);
          mat.emissive = new THREE.Color(color);
          mat.emissiveIntensity = 0.3;
        });
        break;
      case "stress":
        materials.forEach((mat, i) => {
          const stress = i / materials.length;
          const color = new THREE.Color();
          color.setHSL(0.0 + stress * 0.66, 1, 0.5);
          mat.color.copy(color);
          mat.emissive = new THREE.Color(color);
          mat.emissiveIntensity = 0.2;
        });
        break;
      case "xray":
        materials.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = 0.4;
          mat.color.setHex(0x88ccff);
        });
        break;
      case "explode":
        // Move parts apart automatically
        if (!isExploded) {
          meshes.forEach((mesh, i) => {
            const dir = new THREE.Vector3(
              (i % 3) - 1,
              Math.floor(i / 3) % 3 - 1,
              Math.floor(i / 6) - 1
            ).normalize();
            const offset = 0.8 + i * 0.15;
            mesh.position.add(dir.multiplyScalar(offset));
          });
          requestAnimationFrame(() => {
            setIsExploded(true);
          });
        }
        // Also set wireframe-ish look
        materials.forEach((mat) => {
          mat.color.setHex(0x00d2ff);
          mat.emissive = new THREE.Color(0x00d2ff);
          mat.emissiveIntensity = 0.1;
        });
        break;
      default:
        break;
    }
  }, [viewMode, isExploded]);

  const toggleViewMode = (mode: ViewMode) => {
    // If switching to explode, we need to handle toggle
    if (mode === "explode") {
      if (viewMode === "explode") {
        // If already exploded, do nothing or reset? We'll toggle via separate buttons.
        return;
      }
      setViewMode("explode");
    } else {
      setViewMode(mode);
    }
  };

  const resetPositions = () => {
    const meshes = partRefs.current;
    meshes.forEach(m => {
      const orig = originalPositions.current.get(m);
      if (orig) {
        m.position.copy(orig);
      }
    });
    setIsExploded(false);
    // If current view is explode, switch to solid or stay? We'll keep solid.
    setViewMode("solid");
  };

  const explode = () => {
    // If already exploded, reset and explode again? We'll just call reset then explode.
    resetPositions();
    // Then apply explosion
    const meshes = partRefs.current;
    meshes.forEach((mesh, i) => {
      const dir = new THREE.Vector3(
        (i % 3) - 1,
        Math.floor(i / 3) % 3 - 1,
        Math.floor(i / 6) - 1
      ).normalize();
      const offset = 0.8 + i * 0.15;
      mesh.position.add(dir.multiplyScalar(offset));
    });
    setIsExploded(true);
    setViewMode("explode");
  };

  const viewButtons = [
    { mode: "solid", label: "Solid", icon: Box },
    { mode: "wireframe", label: "Wireframe", icon: Grid3X3 },
    { mode: "thermal", label: "Thermal", icon: Flame },
    { mode: "stress", label: "Stress", icon: Activity },
    { mode: "xray", label: "X-Ray", icon: Eye },
  ];

  return (
    <div className="relative w-full h-full bg-[#0B132B] overflow-hidden">
      {/* 3D Viewport */}
      <div ref={containerRef} className="w-full h-full" />

      {/* View Mode Toolbar */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 flex flex-wrap gap-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1 pointer-events-auto">
        {viewButtons.map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            onClick={() => toggleViewMode(mode as ViewMode)}
            className={`px-2 py-1 rounded text-xs transition flex items-center gap-1 ${
              viewMode === mode
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        <button
          onClick={explode}
          className={`px-2 py-1 rounded text-xs transition flex items-center gap-1 ${
            viewMode === "explode"
              ? "bg-white/20 text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Expand size={14} />
          <span className="hidden sm:inline">Explode</span>
        </button>
        <button
          onClick={resetPositions}
          className="px-2 py-1 rounded text-xs transition flex items-center gap-1 text-white/60 hover:text-white hover:bg-white/10"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Reassemble</span>
        </button>
        <div className="w-px bg-white/10 mx-1" />
        <button
          onClick={() => setIsOrthographic(!isOrthographic)}
          className={`px-2 py-1 rounded text-xs transition ${
            isOrthographic
              ? "bg-white/20 text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          {isOrthographic ? "Ortho" : "Persp"}
        </button>
      </div>

      {/* Simulation Status */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-white pointer-events-none">
        <span
          className={`h-2 w-2 rounded-full ${
            running ? "bg-emerald-400" : "bg-white/30"
          }`}
        />
        {running ? "Validation Running" : "Prototype Ready"}
      </div>

      {/* Bottom-left info */}
      <div className="absolute bottom-4 left-4 text-xs text-white/40 pointer-events-none">
        <div>Camera: {isOrthographic ? "Orthographic" : "Perspective"}</div>
        <div>Zoom: {zoom.toFixed(1)}</div>
        {isExploded && <div className="text-[#FF6B00]">🔧 Drag parts to adjust</div>}
      </div>
    </div>
  );
}