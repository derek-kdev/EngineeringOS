"use client";


export default function BOMPanel() {


  return (

    <section

      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "

    >


      <div className="mb-5">


        <h2

          className="
            text-xl
            font-semibold
            text-white
          "

        >

          Bill of Materials (BOM)

        </h2>



        <p

          className="
            mt-2
            text-sm
            text-white/50
          "

        >

          Manage prototype components, materials, quantities, and suppliers.

        </p>


      </div>




      <div

        className="
          rounded-2xl
          border
          border-white/10
          bg-black/20
          p-6
          text-center
          text-sm
          text-white/50
        "

      >

        No components added yet.

      </div>



    </section>

  );

}