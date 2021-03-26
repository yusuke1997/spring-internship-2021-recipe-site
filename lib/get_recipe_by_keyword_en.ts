import type {Recipe} from "../types/recipe"
import type {Response,link} from './get_all_recipes'

export async function getRecipesByKeywordEn(keyword: string, page_num: number, api_key: string): Promise<Response> {
    let url = `https://b0759f7ed7f9.ngrok.io/search?keyword=${keyword}&page=${page_num}`;
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
        ja:'',
        en:''
      }
      return dammy;
    }
    const recipe = await response.json();
    return recipe as Response;
}