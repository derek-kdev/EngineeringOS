"use client";


interface Props {
  status: string;
}


export default function StatusBadge({
  status,
}: Props) {


  const styles: Record<string, string> = {

    Active:
      "bg-[#00D2FF]/10 text-[#00D2FF] border-[#00D2FF]/20",

    Completed:
      "bg-green-500/10 text-green-400 border-green-500/20",

    Planning:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    Prototype:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",

    Failed:
      "bg-red-500/10 text-red-400 border-red-500/20",

    Archived:
      "bg-white/10 text-white/50 border-white/10",

  };



  return (

    <span

      className={`
        inline-flex
        w-fit
        max-w-max
        items-center
        whitespace-nowrap
        rounded-full
        border
        px-2.5
        py-1
        text-xs
        font-medium
        leading-none
        transition-all
        duration-200
        ${styles[status] || "bg-white/10 text-white/60 border-white/10"}
      `}

    >

      {status}

    </span>

  );

}