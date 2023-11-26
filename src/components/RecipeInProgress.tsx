import { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ApiReturn, DoneRecipesLSType, DrinkType, MealType } from '../Type/type';
import IngredientList from './ingredients/IngredientList';
import ShareButton from './buttons/ShareButton';
import FavoriteButton from './buttons/FavoriteButton';
import FinishButton from './buttons/FinishButton';
import RecipiesContext from '../context/RecipiesContext';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

import MealCategoryIcon from '../images/mealCategoryIcon.svg';
import DrinkCategoryIcon from '../images/drinkIcon.svg';
import Loading from './Loading';
import { formatDate } from '../Helpers/helpers';

function RecipeInProgress() {
  const { recipes } = useContext(RecipiesContext);
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const [doneRecipes, setDoneRecipes] = useLocalStorage<DoneRecipesLSType[]>(
    'doneRecipes',
    [],
  );

  const fodase = () => {
  };

  const key = pathname.includes('drinks') ? 'drinks' : 'meals';
  const dbUrl = pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';
  const url = `https://www.${dbUrl}.com/api/json/v1/1/lookup.php?i=${id}`;
  const storedIngredients = id ? recipes[key][id] : [];
  const { data, isLoading } = useFetch<ApiReturn>(url);
  const recipeData = data ? data[key][0] : {} as DrinkType | MealType;

  const ingredients = Object.keys(recipeData)
    .filter((product) => product.includes('strIngredient') && recipeData[product])
    .map((ingredient) => recipeData[ingredient]);

  const setToDoneRecipes = () => {
    setDoneRecipes([
      ...doneRecipes,
      {
        id: recipeData.idMeal || recipeData.idDrink,
        type: key === 'meals' ? 'meal' : 'drink',
        nationality: recipeData.strArea || '',
        category: recipeData.strCategory,
        alcoholicOrNot: recipeData.strAlcoholic || '',
        name: recipeData.strMeal || recipeData.strDrink,
        image: recipeData.strMealThumb || recipeData.strDrinkThumb,
        doneDate: formatDate(),
        tags: recipeData.strTags ? recipeData.strTags.split(',') : [],
      },
    ]);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mb-20">
      <div className="relative">
        <img
          data-testid="recipe-photo"
          src={ recipeData.strMealThumb || recipeData.strDrinkThumb }
          alt="recipe"
          className="brightness-50 h-64 w-full object-cover object-top"
        />
        <h1
          data-testid="recipe-title"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-center uppercase text-white opacity-80"
        >
          {recipeData.strMeal || recipeData.strDrink}
        </h1>
        <div className="absolute top-0 flex items-center gap-2 my-2 mx-3">
          {key === 'meals' ? (
            <img src={ MealCategoryIcon } alt="category" className="h-10" />
          ) : (
            <img src={ DrinkCategoryIcon } alt="category" className="h-10" />
          )}
          {recipeData.strCategory && (
            <p
              className="text-md font-semibold text-mainYellow
            tracking-widest"
              data-testid="recipe-category"
            >
              {recipeData.strCategory}
            </p>
          )}
        </div>
      </div>
      {/* se houver category (meals), renderiza um parágrafo com a info */}
      {/* se for alcólico (drink), renderiza um parágrafo com a info */}
      <div className="px-4">
        {/* componente para fazer o .map dos ingredientes do produto */}
        <div>
          <h2 className="font-bold mt-6 mb-4">Ingredients</h2>
          {recipeData.strAlcoholic && (
            <p
              data-testid="recipe-category"
              className="my-2 opacity-75"
            >
              {recipeData.strAlcoholic}
            </p>
          )}
          <IngredientList recipesData={ recipeData } />
        </div>
        <div className="mt-4 mb-8">
          <h2 className="font-bold mt-6">Instructions</h2>
          <p
            data-testid="instructions"
            className="border-2 rounded-lg py-4 px-2"
          >
            {recipeData.strInstructions}
          </p>
        </div>
        {/* se for meals, haverá info de video, que será renderizado */}
        {pathname.includes('meals') && recipeData.strYoutube && (
          <div>
            <h2 className="font-bold mt-6 mb-4">Video</h2>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${recipeData.strYoutube.split('=')[1]}` }
              title="YouTube video player"
              allowFullScreen
              className="w-full"
            />
          </div>
        )}
      </div>
      <div className="absolute top-0 right-0 flex items-center gap-2 my-2 mx-3">
        <ShareButton
          id={ recipeData.idMeal || recipeData.idDrink }
          keyStr={ key }
          testid="share-btn"
        />
        <FavoriteButton favorites={ recipeData } />
      </div>
      <FinishButton
        ingredients={ ingredients }
        storedIngredients={ storedIngredients }
        setToDoneRecipes={ setToDoneRecipes }
      />
    </div>
  );
}

export default RecipeInProgress;
