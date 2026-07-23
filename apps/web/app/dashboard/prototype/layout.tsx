"use client";


export default function PrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <div
      className="
        fixed
        inset-0
        overflow-hidden
        bg-[#050b18]
      "
    >

      {children}

    </div>

  );

}