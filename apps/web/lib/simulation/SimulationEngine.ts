// apps/web/lib/simulation/SimulationEngine.ts

import { materials, Material } from "./materials";

export interface PhysicsBody {
  id: string;
  name: string;
  mass: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  angularVelocity: { x: number; y: number; z: number };
  forces: { x: number; y: number; z: number };
  torque: { x: number; y: number; z: number };
  material: string;
  temperature: number;
  stress: number;
  strain: number;
  isDecomposed: boolean;
  parentId?: string;
  children: string[];
}

export interface Joint {
  id: string;
  type: "revolute" | "prismatic" | "fixed" | "ball";
  bodyA: string;
  bodyB: string;
  position: { x: number; y: number; z: number };
  axis?: { x: number; y: number; z: number };
  angle: number;
  torque: number;
  isLocked: boolean;
}

export class SimulationEngine {
  private bodies: Map<string, PhysicsBody> = new Map();
  private joints: Map<string, Joint> = new Map();
  private timeStep: number = 0.001;
  private gravity: number = 9.81;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private simulationTime: number = 0;
  private logs: string[] = [];

  constructor() {
    this.initializeDefaultAssembly();
  }

  private initializeDefaultAssembly(): void {
    // Robotic Arm Assembly – components
    const base: PhysicsBody = {
      id: "base",
      name: "Base Plate",
      mass: 5.2,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Aluminum",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      children: ["joint1"],
    };

    const joint1: PhysicsBody = {
      id: "joint1",
      name: "Shoulder Joint",
      mass: 1.8,
      position: { x: 0, y: 0.15, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Steel (Carbon)",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "base",
      children: ["arm1"],
    };

    const arm1: PhysicsBody = {
      id: "arm1",
      name: "Upper Arm",
      mass: 3.4,
      position: { x: 0, y: 0.35, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Aluminum",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "joint1",
      children: ["joint2", "gear1"],
    };

    const joint2: PhysicsBody = {
      id: "joint2",
      name: "Elbow Joint",
      mass: 1.2,
      position: { x: 0.3, y: 0.35, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Steel (Carbon)",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "arm1",
      children: ["arm2"],
    };

    const arm2: PhysicsBody = {
      id: "arm2",
      name: "Forearm",
      mass: 2.8,
      position: { x: 0.6, y: 0.35, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Aluminum",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "joint2",
      children: ["endEffector"],
    };

    const gear1: PhysicsBody = {
      id: "gear1",
      name: "Drive Gear",
      mass: 0.8,
      position: { x: 0.1, y: 0.35, z: 0.1 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Steel (Stainless)",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "arm1",
      children: [],
    };

    const endEffector: PhysicsBody = {
      id: "endEffector",
      name: "End Effector",
      mass: 1.1,
      position: { x: 0.85, y: 0.35, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      forces: { x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      material: "Aluminum",
      temperature: 25,
      stress: 0,
      strain: 0,
      isDecomposed: false,
      parentId: "arm2",
      children: [],
    };

    [base, joint1, arm1, joint2, arm2, gear1, endEffector].forEach((b) => {
      this.bodies.set(b.id, b);
    });

    // Joints
    const jointDefs: Joint[] = [
      {
        id: "j1",
        type: "revolute",
        bodyA: "base",
        bodyB: "joint1",
        position: { x: 0, y: 0.15, z: 0 },
        axis: { x: 0, y: 1, z: 0 },
        angle: 0,
        torque: 0,
        isLocked: false,
      },
      {
        id: "j2",
        type: "revolute",
        bodyA: "joint1",
        bodyB: "arm1",
        position: { x: 0, y: 0.35, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        angle: 0,
        torque: 0,
        isLocked: false,
      },
      {
        id: "j3",
        type: "revolute",
        bodyA: "arm1",
        bodyB: "joint2",
        position: { x: 0.3, y: 0.35, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        angle: 0,
        torque: 0,
        isLocked: false,
      },
      {
        id: "j4",
        type: "revolute",
        bodyA: "joint2",
        bodyB: "arm2",
        position: { x: 0.6, y: 0.35, z: 0 },
        axis: { x: 0, y: 0, z: 1 },
        angle: 0,
        torque: 0,
        isLocked: false,
      },
      {
        id: "j5",
        type: "fixed",
        bodyA: "arm2",
        bodyB: "endEffector",
        position: { x: 0.85, y: 0.35, z: 0 },
        angle: 0,
        torque: 0,
        isLocked: true,
      },
    ];
    jointDefs.forEach((j) => this.joints.set(j.id, j));

    this.log("Simulation engine initialized");
  }

  private log(msg: string): void {
    const ts = new Date().toLocaleTimeString();
    this.logs.push(`[${ts}] ${msg}`);
    if (this.logs.length > 1000) this.logs.shift();
  }

  // ---- Public API ----
  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.log("Simulation started");
  }

  public pause(): void {
    if (!this.isRunning) return;
    this.isPaused = true;
    this.log("Simulation paused");
  }

  public resume(): void {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.log("Simulation resumed");
  }

  public stop(): void {
    this.isRunning = false;
    this.isPaused = false;
    this.log("Simulation stopped");
  }

  public reset(): void {
    this.stop();
    this.simulationTime = 0;
    this.bodies.forEach((b) => {
      b.velocity = { x: 0, y: 0, z: 0 };
      b.angularVelocity = { x: 0, y: 0, z: 0 };
      b.forces = { x: 0, y: 0, z: 0 };
      b.torque = { x: 0, y: 0, z: 0 };
      b.temperature = 25;
      b.stress = 0;
      b.strain = 0;
      b.isDecomposed = false;
    });
    this.joints.forEach((j) => {
      j.angle = 0;
      j.torque = 0;
    });
    this.logs = [];
    this.log("Simulation reset");
  }

  public decompose(bodyId: string): void {
    const body = this.bodies.get(bodyId);
    if (!body || body.isDecomposed) return;
    body.isDecomposed = true;
    const offset = 0.05 + Math.random() * 0.1;
    body.position.x += (Math.random() - 0.5) * offset;
    body.position.y += (Math.random() - 0.5) * offset;
    body.position.z += (Math.random() - 0.5) * offset;
    body.children.forEach((childId) => {
      const child = this.bodies.get(childId);
      if (child && !child.isDecomposed) this.decompose(childId);
    });
    this.log(`Decomposed ${body.name}`);
  }

  public reassemble(bodyId: string): void {
    const body = this.bodies.get(bodyId);
    if (!body || !body.isDecomposed) return;
    body.isDecomposed = false;
    if (body.parentId) {
      const parent = this.bodies.get(body.parentId);
      if (parent) {
        body.position.x = parent.position.x;
        body.position.y = parent.position.y + 0.15;
        body.position.z = parent.position.z;
      }
    }
    body.children.forEach((childId) => {
      const child = this.bodies.get(childId);
      if (child && child.isDecomposed) this.reassemble(childId);
    });
    this.log(`Reassembled ${body.name}`);
  }

  public decomposeAll(): void {
    this.bodies.forEach((b) => { if (!b.isDecomposed) this.decompose(b.id); });
    this.log("Exploded view");
  }

  public reassembleAll(): void {
    this.bodies.forEach((b) => { if (b.isDecomposed) this.reassemble(b.id); });
    this.log("Reassembled all");
  }

  public applyForce(bodyId: string, force: { x: number; y: number; z: number }): void {
    const b = this.bodies.get(bodyId);
    if (b) {
      b.forces.x += force.x;
      b.forces.y += force.y;
      b.forces.z += force.z;
    }
  }

  public applyTorque(bodyId: string, torque: { x: number; y: number; z: number }): void {
    const b = this.bodies.get(bodyId);
    if (b) {
      b.torque.x += torque.x;
      b.torque.y += torque.y;
      b.torque.z += torque.z;
    }
  }

  public setMaterial(bodyId: string, materialName: string): void {
    const b = this.bodies.get(bodyId);
    if (b) b.material = materialName;
  }

  public step(): void {
    if (!this.isRunning || this.isPaused) return;
    const dt = this.timeStep;
    this.simulationTime += dt;

    this.bodies.forEach((b) => {
      if (b.isDecomposed) return;

      // gravity
      b.forces.y -= b.mass * this.gravity;

      // linear
      b.velocity.x += (b.forces.x / b.mass) * dt;
      b.velocity.y += (b.forces.y / b.mass) * dt;
      b.velocity.z += (b.forces.z / b.mass) * dt;
      b.position.x += b.velocity.x * dt;
      b.position.y += b.velocity.y * dt;
      b.position.z += b.velocity.z * dt;

      // angular
      b.angularVelocity.x += (b.torque.x / b.mass) * dt;
      b.angularVelocity.y += (b.torque.y / b.mass) * dt;
      b.angularVelocity.z += (b.torque.z / b.mass) * dt;
      b.rotation.x += b.angularVelocity.x * dt;
      b.rotation.y += b.angularVelocity.y * dt;
      b.rotation.z += b.angularVelocity.z * dt;

      // thermal & stress (simplified)
      const speed = Math.sqrt(b.velocity.x**2 + b.velocity.y**2 + b.velocity.z**2);
      b.temperature += speed * 0.1 * dt;
      const forceMag = Math.sqrt(b.forces.x**2 + b.forces.y**2 + b.forces.z**2);
      b.stress = (forceMag / 0.01) / 1e6; // MPa
      b.strain = b.stress / 200;

      // reset forces
      b.forces = { x: 0, y: 0, z: 0 };
      b.torque = { x: 0, y: 0, z: 0 };
    });

    // joint angles
    this.joints.forEach((j) => {
      if (!j.isLocked && j.type === "revolute") {
        j.angle += 0.01;
        j.torque = 5 * (1 + Math.sin(j.angle));
      }
    });
  }

  public getBodies(): PhysicsBody[] {
    return Array.from(this.bodies.values());
  }

  public getJoints(): Joint[] {
    return Array.from(this.joints.values());
  }

  public getSimulationTime(): number {
    return this.simulationTime;
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      isPaused: this.isPaused,
      time: this.simulationTime,
      bodyCount: this.bodies.size,
    };
  }

  public getLogs(): string[] {
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }
}