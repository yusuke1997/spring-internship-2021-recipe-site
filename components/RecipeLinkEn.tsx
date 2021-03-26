import { FC } from "react";
import type { Recipe } from "../types/recipe";
import Link from 'next/link';
import { css, jsx } from '@emotion/react'

type Props = {
    recipe: Recipe
}

export const RecipeLinkEn: FC<Props> = (props) => {
    return (
        <div>
        <Link href="/en/recipes/[id]" as={`/en/recipes/${props.recipe.id}`}>
            <div id="recipe-link">
                {props.recipe?.image_url ?
                     <img src={ props.recipe.image_url } className="img-thumbnail" alt="picture" width='300' /> :
                     <img src={ 'https://vegan.jpn.com/wp-content/themes/kale-child/images/no-image.png' } className="img-thumbnail" alt="picture" width='300' />
                }
                <div className="link-title">{ props.recipe.title }</div>
            </div>
        </Link>
        </div>
    )
}