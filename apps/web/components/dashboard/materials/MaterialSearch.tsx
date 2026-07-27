"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  searchMaterials,
  Material,
} from "@/services/materials.service";


interface MaterialSearchProps {
  onResults: (materials: Material[]) => void;
}


export default function MaterialSearch({
  onResults,
}: MaterialSearchProps) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    const timer = setTimeout(async () => {

      if (!query.trim()) {

        setResults([]);

        return;

      }


      try {

        setLoading(true);


        const data = await searchMaterials(query);


        setResults(data);

        onResults(data);


      } catch (error) {

        console.error(
          "Material search failed:",
          error,
        );

      } finally {

        setLoading(false);

      }


    }, 400);



    return () => clearTimeout(timer);


  }, [query, onResults]);



  return (

    <div className="relative w-full">


      <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-xl" />



      <div className="relative flex items-center rounded-full border border-white/10 bg-slate-900/90 px-6 py-4 backdrop-blur">


        <input

          value={query}

          onChange={(e) => setQuery(e.target.value)}

          placeholder="Search materials..."

          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"

        />



        <button

          disabled={loading}

          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-500 disabled:opacity-50"

        >

          ✈

        </button>


      </div>




      {results.length > 0 && (

        <div className="absolute z-30 mt-3 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl">


          {results.slice(0, 6).map((material) => (

            <Link

              key={material.id}

              href={`/dashboard/materials/${material.id}`}

              className="block border-b border-white/5 px-5 py-3 text-white transition hover:bg-slate-800"

            >

              <p className="font-medium">

                {material.name}

              </p>


              <p className="text-sm text-slate-400">

                {material.category} / {material.subcategory}

              </p>


            </Link>

          ))}


        </div>

      )}


    </div>

  );

}
