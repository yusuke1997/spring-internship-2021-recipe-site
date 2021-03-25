import { FC } from "react";
import type { Recipe } from "../types/recipe";
import Link from 'next/link';

type Props = {
    recipe: Recipe
}

export const RecipeLink: FC<Props> = (props) => {
    return (
        <Link href="/recipes/[id]" as={`/recipes/${props.recipe.id}`}>
            <div id="recipe-link">
                {props.recipe?.image_url ? <img src={ props.recipe.image_url } className="img-thumbnail" alt="picture" width='300' /> : <div id="link-pic-alt"><p id="pic-alt-text">NO IMAGE</p></div>}
                <div className="link-title">{ props.recipe.title }</div>
            </div>
        </Link>
    )
}