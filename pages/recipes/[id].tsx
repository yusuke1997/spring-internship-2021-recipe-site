import {GetServerSideProps,NextPage} from 'next';
import type {Recipe} from "../../types/recipe";
import {getRecipeById} from "../../lib/get_recipe_by_id"

type Props = {
  recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
  const { recipe } = props;
  let author = recipe.author.user_name;
  if(author==''){
    author = 'ゲストユーザ';
  }

  return (
    <div>
      <h1>My Recipe Site</h1>

      {recipe && (
        <main>
          
          {recipe.image_url&& (
            <img src={recipe.image_url} alt="レシピ画像" width="300" />
          )}
          <h2>{recipe.title}</h2>
          <p>製作者:{author}</p>
          <p>最終更新日:{recipe.published_at.split('T')[0]}</p>
          <p>{recipe.description}</p>

          <h3>材料</h3>
          <ol>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.name} : {ing.quantity}
              </li>
            ))}
          </ol>

          <h3>手順</h3>
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
    const recipe = await getRecipeById(id,'remark-fish-magician');
    return {
      props: {
        recipe: recipe,
      },
    };
  }
};

export default RecipePage;
