import type { LucideIcon } from "lucide-react";

export type SearchCategory =
  | "Page"
  | "Project"
  | "Material"
  | "Formula"
  | "Parameter"
  | "User"
  | "Document";


import { ComponentType } from "react";


export interface SearchItem {

  id:string;

  title:string;

  description:string;

  category:SearchCategory;

  href?:string;

  keywords:string[];

  metadata?:Record<string,string>;

  icon: ComponentType;

}
