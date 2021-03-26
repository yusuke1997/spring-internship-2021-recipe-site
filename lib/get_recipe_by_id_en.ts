import type {Recipe} from "../types/recipe"


export async function getRecipeByIdEn(id: number, api_key: string): Promise<Recipe> {
    const url = `https://b0759f7ed7f9.ngrok.io/recipes/${id}`;
    const response = await fetch(
      url,
      {headers: {"x-api-key" : api_key}}
    )
    const recipe = await response.json();
    return recipe as Recipe;
  
  }