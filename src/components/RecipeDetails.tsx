import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

import { ApiReturn, DrinkType, MealType } from "../Type/type";

import IngredientList from "./ingredients/IngredientList";
import ShareButton from "./buttons/ShareButton";
import DetailsCarousel from "./DetailsCarousel";
import StartRecipeButton from "./StartRecipeButton";
import FavoriteButton from "./buttons/FavoriteButton";
import MealCategoryIcon from "../images/mealCategoryIcon.svg";
import DrinkCategoryIcon from "../images/drinkIcon.svg";
import Loading from "./Loading";

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const key = pathname.includes("drinks") ? "drinks" : "meals";
  const dbUrl = pathname.includes("drinks") ? "thecocktaildb" : "themealdb";
  const url = `https://www.${dbUrl}.com/api/json/v1/1/lookup.php?i=${id}`;

  const { data, isLoading } = useFetch<ApiReturn>(url);
  const recipeData = data ? data[key][0] : ({} as DrinkType | MealType);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="relative">
        <img
          data-testid="recipe-photo"
          src={recipeData.strMealThumb || recipeData.strDrinkThumb}
          alt="recipe"
          className="h-64 w-full object-cover object-top brightness-50"
        />
        <h1
          data-testid="recipe-title"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          text-center uppercase text-white opacity-80"
        >
          {recipeData.strMeal || recipeData.strDrink}
        </h1>
        <div className="absolute top-0 mx-3 my-2 flex items-center gap-2">
          {key === "meals" ? (
            <img src={MealCategoryIcon} alt="category" className="h-10" />
          ) : (
            <img src={DrinkCategoryIcon} alt="category" className="h-10" />
          )}
          {recipeData.strCategory && (
            <p
              className="text-md text-mainYellow font-semibold
            tracking-widest"
              data-testid="recipe-category"
            >
              {recipeData.strCategory}
            </p>
          )}
        </div>
      </div>
      <div className="px-4">
        {/* componente para fazer o .map dos ingredientes do produto */}
        <div>
          <h2 className="mb-4 mt-6 font-bold">Ingredients</h2>
          {recipeData.strAlcoholic && (
            <p data-testid="recipe-category" className="my-2 opacity-75">
              {recipeData.strAlcoholic}
            </p>
          )}
          <IngredientList recipesData={recipeData} />
        </div>
        <div className="mb-8 mt-4">
          <h2 className="mt-6 font-bold">Instructions</h2>
          <p
            data-testid="instructions"
            className="rounded-lg border-2 px-2 py-4"
          >
            {recipeData.strInstructions}
          </p>
        </div>
        {/* se for meals, haverá info de video, que será renderizado */}
        {pathname.includes("meals") && recipeData.strYoutube && (
          <div>
            <h2 className="mb-4 mt-6 font-bold">Video</h2>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                recipeData.strYoutube.split("=")[1]
              }`}
              title="YouTube video player"
              allowFullScreen
              className="w-full"
            />
          </div>
        )}
        <DetailsCarousel />
      </div>
      <div className="absolute right-0 top-0 mx-3 my-2 flex items-center gap-2">
        <ShareButton
          id={recipeData.idMeal || recipeData.idDrink}
          keyStr={key}
          testid="share-btn"
        />
        <FavoriteButton favorites={recipeData} />
      </div>
      <StartRecipeButton />
    </div>
  );
}

export default RecipeDetails;
