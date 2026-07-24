"use client";

import Modal from "@/components/dashboard/ui/Modal";
import CreateOrganizationForm from "./CreateOrganizationForm";


export default function CreateOrganizationModal({

open,

onClose,

onCreated,

}:{

open:boolean;

onClose:()=>void;

onCreated?:()=>void;

}){


return (

<Modal

open={open}

onClose={onClose}

title="Create Organisation"

>


<CreateOrganizationForm

onCreated={()=>{

onCreated?.();

onClose();

}}

/>


</Modal>

);


}
