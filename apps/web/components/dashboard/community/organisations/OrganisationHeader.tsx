"use client";

interface OrganisationHeaderProps {
  onCreate: () => void;
}

export default function OrganisationHeader({
  onCreate,
}: OrganisationHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          Engineering Organisations
        </h1>

        <p className="mt-2 text-white/60">
          Organisation overview and engineering workload.
        </p>
      </div>


      <button
        onClick={onCreate}
        className="
          rounded-xl
          bg-[#00D2FF]
          px-5
          py-3
          font-semibold
          text-black
          transition
          hover:opacity-90
        "
      >
        + Create Organisation
      </button>

    </header>
  );
}