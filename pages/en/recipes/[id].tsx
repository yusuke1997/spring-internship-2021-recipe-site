import {GetServerSideProps,NextPage} from 'next';
import type {Recipe} from "../../../types/recipe";
import {getRecipeById} from "../../../lib/get_recipe_by_id"
import { getRecipeByIdEn } from '../../../lib/get_recipe_by_id_en';
import Link from 'next/link';

type Props = {
  recipe: Recipe;
  page
};

const RecipePage: NextPage<Props> = (props) => {
  const { recipe } = props;
  let author = recipe.author.user_name;
  if(author==''){
    author = 'Guest User';
  }

  return (
    <div>
      <h1>My Recipe Site</h1>
      <Link
              href = {{
                  pathname: '/recipes/'+props.page
              }}
       >Japanese</Link>

      {recipe && (
        <main>
          {recipe?.image_url ?
                     <img src={ props.recipe.image_url } className="img-thumbnail" alt="picture" width='300' /> :
                     <img src={ 'https://vegan.jpn.com/wp-content/themes/kale-child/images/no-image.png' } className="img-thumbnail" alt="picture" width='300' />
                }
          
          <h2>{recipe.title}</h2>
          <p>Author:{author}</p>
          <p>Last Update:{recipe.published_at.split('T')[0]}</p>
          <p>{recipe.description}</p>

          <h3>Ingredients</h3>
          <ol>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.name} : {ing.quantity}
              </li>
            ))}
          </ol>

          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </main>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    };
  } else {
    const recipe = await getRecipeByIdEn(id,'remark-fish-magician');
    return {
      props: {
        recipe: recipe,
        page:id
      },
    };
  }
};

export default RecipePage;
