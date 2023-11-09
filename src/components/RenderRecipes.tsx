import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import RecipeCard from './RecipeCard';
import { DrinkType, MealType } from '../Type/type';
import Loading from './Loading';

type RenderRecipesProps = {
  listLength: number;
};

function RenderRecipes({ listLength }: RenderRecipesProps) {
  const { renderRecipes, loading } = useContext(RecipiesContext);
  const { pathname } = useLocation();

  if (loading) return <Loading />;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {
        renderRecipes?.slice(0, listLength)
          .map((recipe: DrinkType | MealType, index) => (
            <Link to={ `${pathname}/${recipe.idMeal || recipe.idDrink}` } key={ index }>
              <RecipeCard cardIndex={ index } recipe={ recipe } />
            </Link>
          ))
      }
    </div>
  );
}

export default RenderRecipes;
