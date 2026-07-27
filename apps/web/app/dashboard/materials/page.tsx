"use client";

import { useEffect, useState } from "react";

import MaterialsHeader from "@/components/dashboard/materials/MaterialsHeader";
import MaterialGrid from "@/components/dashboard/materials/MaterialGrid";

import {
  getMaterials,
  Material,
} from "@/services/materials.service";


export default function MaterialsPage() {

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadMaterials() {

      try {

        const data = await getMaterials();

        setMaterials(data.slice(0, 12));

      } catch (error) {

        console.error(
          "Failed to load materials:",
          error,
        );

      } finally {

        setLoading(false);

      }

    }


    loadMaterials();

  }, []);



  return (

    <div className="min-h-screen bg-slate-950 px-8">

      <div className="sticky top-0 z-20 flex justify-center bg-slate-950/90 py-4 backdrop-blur">

        <MaterialsHeader
          onResults={setMaterials}
        />

      </div>


      <div className="pt-6">

        {loading ? (

          <div className="flex h-60 items-center justify-center rounded-xl border border-white/10 bg-slate-900">

            <p className="text-slate-400">
              Loading engineering materials...
            </p>

          </div>

        ) : (

          <MaterialGrid
            materials={materials}
          />

        )}

      </div>

    </div>

  );
}
