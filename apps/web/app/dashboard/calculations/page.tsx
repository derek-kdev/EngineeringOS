"use client";


import CalculatorHeader from "@/components/dashboard/calculations/CalculatorHeader";
import FormulaLibrary from "@/components/dashboard/calculations/FormulaLibrary";
import CalculatorPanel from "@/components/dashboard/calculations/CalculatorPanel";
import CalculationHistory from "@/components/dashboard/calculations/CalculationHistory";


export default function CalculationsPage(){


return (

<div

className="
space-y-8
"

>


<CalculatorHeader />



<div

className="
grid
grid-cols-1
xl:grid-cols-12
gap-6
"

>


<div

className="
xl:col-span-3
"

>

<FormulaLibrary />

</div>




<div

className="
xl:col-span-6
"

>

<CalculatorPanel />

</div>




<div

className="
xl:col-span-3
"

>

<CalculationHistory />

</div>



</div>



</div>

);


}