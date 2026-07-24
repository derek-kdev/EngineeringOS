"use client";

import { useState } from "react";

import { useOrganizationTasks } from "@/hooks/useTasks";
import { tasksApi } from "@/lib/api/tasks";
import { useOrganizationMembers } from "@/hooks/useOrganizations";




export default function WorkspaceTaskBoard({
  organizationId,
}: {
  organizationId: string;
}) {


  const {
    tasks,
    isLoading,
    mutate,
  } = useOrganizationTasks(
    organizationId
  );



  const {
    members,
  } = useOrganizationMembers(
    organizationId
  );



  const [
    title,
    setTitle
  ] = useState("");



  const [
    description,
    setDescription
  ] = useState("");



  const [
    assignedToId,
    setAssignedToId
  ] = useState("");



  const [
    taskType,
    setTaskType
  ] = useState("GENERAL");



  const [
    dueDate,
    setDueDate
  ] = useState("");



  const [
    creating,
    setCreating
  ] = useState(false);



  const createTask = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    if(
      !title ||
      !assignedToId
    ){

      return;

    }


    try {


      setCreating(true);



      await tasksApi.create({

        organizationId,

        assignedToId,

        title,

        description,

        taskType,

        dueDate,

      });



      setTitle("");

      setDescription("");

      setAssignedToId("");

      setDueDate("");



      await mutate();



    } finally {

      setCreating(false);

    }


  };




return (

<div className="
space-y-6
">


{/* Create Assignment */}

<div className="
rounded-2xl
border
border-white/10
bg-white/5
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Create Engineering Assignment

</h2>



<form
onSubmit={createTask}
className="
space-y-4
"
>


<input

value={title}

onChange={(e)=>
setTitle(e.target.value)
}

placeholder="Task title e.g. Run simulation"

className="
w-full
rounded-lg
border
border-white/10
bg-[#0B132B]
px-4
py-2
text-white
"

/>



<textarea

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

placeholder="Task description"

rows={3}

className="
w-full
rounded-lg
border
border-white/10
bg-[#0B132B]
px-4
py-2
text-white
"

/>



<select

value={assignedToId}

onChange={(e)=>
setAssignedToId(e.target.value)
}

className="
w-full
rounded-lg
border
border-white/10
bg-[#0B132B]
px-4
py-2
text-white
"

>


<option value="">
Assign member
</option>


{
members?.map((member: Membership)=>(

<option
key={member.id}
value={member.id}
>

{
member.user?.displayName ||
member.user?.email
}

</option>

))

}


</select>




<select

value={taskType}

onChange={(e)=>
setTaskType(e.target.value)
}

className="
w-full
rounded-lg
border
border-white/10
bg-[#0B132B]
px-4
py-2
text-white
"

>

<option value="GENERAL">
General
</option>


<option value="CALCULATION">
Calculation
</option>


<option value="SIMULATION">
Simulation
</option>


<option value="CAD">
CAD Modelling
</option>


</select>





<input

type="date"

value={dueDate}

onChange={(e)=>
setDueDate(e.target.value)
}

className="
w-full
rounded-lg
border
border-white/10
bg-[#0B132B]
px-4
py-2
text-white
"

/>





<button

disabled={creating}

className="
rounded-full
bg-[#00D2FF]
px-6
py-2
text-black
font-medium
disabled:opacity-50
"

>

{
creating
?
"Creating..."
:
"Assign Task"
}

</button>



</form>


</div>





{/* Assignment List */}


<div className="
rounded-2xl
border
border-white/10
bg-white/5
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Engineering Assignments

</h2>




{
isLoading && (

<p>
Loading assignments...
</p>

)

}




{
tasks?.length===0 && (

<p className="text-white/50">
No assignments created yet.
</p>

)

}





{
tasks?.map(task=>(


<div

key={task.id}

className="
rounded-xl
bg-black/20
p-4
mb-3
"

>


<h3 className="
font-semibold
">

{task.title}

</h3>



<p className="
text-sm
text-white/60
">

{task.description}

</p>




<div className="
flex
justify-between
mt-4
text-sm
">


<span>

{
task.assignedTo?.user?.displayName ||
task.assignedTo?.user?.email ||
"Unassigned"
}

</span>



<span>

{task.status}

</span>


</div>


</div>


))

}


</div>



</div>

);


}
