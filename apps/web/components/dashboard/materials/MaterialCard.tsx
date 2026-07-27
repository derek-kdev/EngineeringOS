import Link from "next/link";

import { Material } from "@/services/materials.service";


interface MaterialCardProps {
  material: Material;
}


export default function MaterialCard({
  material,
}: MaterialCardProps) {

  return (

    <Link
      href={`/dashboard/materials/${material.id}`}
      className="block"
    >

      <div className="cursor-pointer rounded-xl border border-white/10 bg-slate-900 p-5 transition hover:border-blue-500/50 hover:bg-slate-800">


        <div className="mb-4 flex h-40 items-center justify-center overflow-hidden rounded-lg bg-slate-800">

          {material.imageUrl ? (

            <img
              src={material.imageUrl}
              alt={material.name}
              className="h-full w-full object-cover"
            />

          ) : (

            <div className="text-sm text-slate-500">
              No Image Available
            </div>

          )}

        </div>



        <h3 className="text-lg font-semibold text-white">
          {material.name}
        </h3>



        <p className="mt-1 text-sm text-blue-400">

          {material.category}
          {" / "}
          {material.subcategory}

        </p>



        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">


          <div>

            <p className="text-slate-500">
              Density
            </p>

            <p className="text-white">
              {material.density} kg/m³
            </p>

          </div>



          <div>

            <p className="text-slate-500">
              Young Modulus
            </p>

            <p className="text-white">
              {material.youngsModulus} GPa
            </p>

          </div>



          <div>

            <p className="text-slate-500">
              Yield Strength
            </p>

            <p className="text-white">
              {material.yieldStrength} MPa
            </p>

          </div>



          <div>

            <p className="text-slate-500">
              Melting Point
            </p>

            <p className="text-white">
              {material.meltingPoint} °C
            </p>

          </div>


        </div>


      </div>


    </Link>

  );

}
