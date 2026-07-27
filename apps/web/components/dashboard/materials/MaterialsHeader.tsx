import MaterialSearch from "./MaterialSearch";
import { Material } from "@/services/materials.service";


interface MaterialsHeaderProps {
  onResults: (materials: Material[]) => void;
}


export default function MaterialsHeader({
  onResults,
}: MaterialsHeaderProps) {

  return (
    <section className="flex justify-center py-4">

      <div className="w-full max-w-xl">

        <MaterialSearch
          onResults={onResults}
        />

      </div>

    </section>
  );
}
