import type {Recipe} from "../types/recipe"
import type {Response,link} from './get_all_recipes'

export async function getRecipesByKeyword(keyword: string, page_num: number, api_key: string): Promise<Response> {
    let url = `https://internship-recipe-api.ckpd.co/search?keyword=${keyword}`;
    //let url = `https://internship-recipe-api.ckpd.co/recipes?page=${page_num}`
    //const url = new URL(
    //    "https://internship-recipe-api.ckpd.co/search"
    //);
    //console.log('キーワード:'+keyword);
    //url.searchParams.set("keyword", keyword);
    const response = await fetch(
      url,
      {headers: {"x-api-key" : api_key}}
    );
    //console.log(response);
    if(!response.ok) {
      const dammy : Response = {
        recipes: [] as Recipe[],
        links: {} as link,
      }
      return dammy;
    }
    const recipe = await response.json();
    return recipe as Response;
}