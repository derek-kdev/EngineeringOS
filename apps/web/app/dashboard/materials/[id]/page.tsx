"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getMaterialById,
  Material,
} from "@/services/materials.service";


export default function MaterialDetailPage() {

  const params = useParams();

  const id = params.id as string;


  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    async function loadMaterial() {

      try {

        const data = await getMaterialById(id);

        setMaterial(data);

      } catch (error) {

        console.error(
          "Failed to load material:",
          error,
        );

      } finally {

        setLoading(false);

      }

    }


    if (id) {
      loadMaterial();
    }

  }, [id]);



  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-950">

        <p className="text-slate-400">
          Loading material details...
        </p>

      </div>

    );

  }



  if (!material) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-950">

        <p className="text-slate-400">
          Material not found
        </p>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-950 p-8">


      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-900 p-8">


        <div className="grid gap-8 md:grid-cols-2">


          <div className="flex h-96 items-center justify-center overflow-hidden rounded-xl bg-slate-800">

            {material.imageUrl ? (

              <img
                src={material.imageUrl}
                alt={material.name}
                className="h-full w-full object-cover"
              />

            ) : (

              <p className="text-slate-500">
                No Image Available
              </p>

            )}

          </div>



          <div>


            <h1 className="text-4xl font-bold text-white">
              {material.name}
            </h1>


            <p className="mt-2 text-blue-400">
              {material.category} / {material.subcategory}
            </p>


            <p className="mt-6 text-slate-300">
              {material.description}
            </p>


            <div className="mt-8 grid grid-cols-2 gap-5">


              <Property
                label="Density"
                value={`${material.density} kg/m³`}
              />


              <Property
                label="Young's Modulus"
                value={`${material.youngsModulus} GPa`}
              />


              <Property
                label="Yield Strength"
                value={`${material.yieldStrength} MPa`}
              />


              <Property
                label="Ultimate Strength"
                value={`${material.ultimateStrength} MPa`}
              />


              <Property
                label="Melting Point"
                value={`${material.meltingPoint} °C`}
              />


              <Property
                label="Max Temperature"
                value={`${material.maxOperatingTemp} °C`}
              />


              <Property
                label="Thermal Conductivity"
                value={`${material.thermalConductivity}`}
              />


              <Property
                label="Electrical Conductivity"
                value={`${material.electricalConductivity}`}
              />


            </div>


          </div>


        </div>



        <div className="mt-10">


          <h2 className="text-xl font-semibold text-white">
            Applications
          </h2>


          <div className="mt-3 flex flex-wrap gap-3">

            {material.applications.map((item) => (

              <span
                key={item}
                className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
              >
                {item}
              </span>

            ))}

          </div>


        </div>


      </div>


    </div>

  );

}



function Property({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="rounded-lg border border-white/10 bg-slate-950 p-4">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-white">
        {value}
      </p>

    </div>

  );

}
