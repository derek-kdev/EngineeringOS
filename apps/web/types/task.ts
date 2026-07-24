export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskType {
  GENERAL = "GENERAL",
  CALCULATION = "CALCULATION",
  SIMULATION = "SIMULATION",
  DESIGN = "DESIGN",
  ANALYSIS = "ANALYSIS",
}


export interface TaskUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
}


export interface TaskMember {
  id: string;
  role: string;
  status: string;
  user?: TaskUser;
}


export interface EngineeringTask {

  id: string;

  organizationId: string;

  assignedToId?: string | null;

  createdById: string;


  title: string;

  description?: string | null;


  taskType: TaskType;

  status: TaskStatus;


  dueDate?: string | null;


  createdAt: string;

  updatedAt: string;


  assignedTo?: TaskMember | null;

  createdBy?: TaskUser;

}



export interface CreateTaskDto {

  organizationId:string;

  assignedToId:string;

  title:string;

  description?:string;

  taskType?:TaskType;

  dueDate?:string;

}



export interface UpdateTaskDto {

  title?:string;

  description?:string;

  status?:TaskStatus;

  assignedToId?:string;

  dueDate?:string;

}
