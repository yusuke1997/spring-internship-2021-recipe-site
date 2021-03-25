import { Recipe } from '../types/recipe'
//import {RecipeLink} from '../components/RecipeLink'

export type link = {
    next?: string;
    prev?: string;
}

export type Response ={
    recipes: Recipe[];
    links: link;
}

export async function getAllRecipe(page_num: number,  api_key: string): Promise<Response> {
    let url = `https://internship-recipe-api.ckpd.co/recipes?page=${page_num}`;
    const response = await fetch(
      url,
      {headers: {"x-api-key" : api_key}}
    );
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