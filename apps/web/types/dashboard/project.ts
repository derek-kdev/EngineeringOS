export interface Project {

  id:string;

  name:string;

  description:string;

  status:
  | "Active"
  | "Completed"
  | "Planning"
  | "Prototype"
  | "Failed";


  owner:string;

  members:number;

  updatedAt:string;

}