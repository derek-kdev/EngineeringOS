import MaterialCard from "./MaterialCard";
import { Material } from "@/services/materials.service";


interface MaterialGridProps {
  materials: Material[];
}


export default function MaterialGrid({
  materials,
}: MaterialGridProps) {

  if (!materials.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl border border-white/10 bg-slate-900">
        <p className="text-slate-500">
          No materials found
        </p>
      </div>
    );
  }


  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
        />
      ))}

    </div>
  );
}
