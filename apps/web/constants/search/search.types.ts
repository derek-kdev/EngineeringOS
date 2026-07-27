export type SearchCategory =
  | "Page"
  | "Project"
  | "Material"
  | "Formula"
  | "Parameter"
  | "User"
  | "Document";


export interface SearchItem {

  id:string;

  title:string;

  description:string;

  category:SearchCategory;

  href?:string;

  keywords:string[];

  metadata?:Record<string,string>;

  icon:any;

}
