import api from "@/lib/api";


export interface SearchResult {

  id:string;

  title:string;

  description:string;

  category:string;

  href?:string;

}



export interface SearchResponse {

  query:string;

  results:SearchResult[];

}



export async function globalSearch(
  query:string
):Promise<SearchResponse>{

  const response =
    await api.get<SearchResponse>(
      "/search",
      {
        params:{
          q:query,
        },
      }
    );


  return response.data;

}
