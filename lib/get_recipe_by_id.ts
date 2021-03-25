import type {Recipe} from "../types/recipe"


export async function getRecipeById(id: number, api_key: string): Promise<Recipe> {
    const url = `https://internship-recipe-api.ckpd.co/recipes/${id}`;
    const response = await fetch(
      url,
      {headers: {"x-api-key" : api_key}}
    )
    const recipe = await response.json();
    return recipe as Recipe;
  
  }