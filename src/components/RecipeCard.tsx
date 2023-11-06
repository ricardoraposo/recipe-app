import { DrinkType, MealType } from '../Type/type';

type RecipeCardProps = {
  cardIndex: number,
  recipe: DrinkType | MealType,
};

function RecipeCard({ cardIndex, recipe }: RecipeCardProps) {
  return (
    <div
      data-testid={ `${cardIndex}-recipe-card` }
      className="border-gray-900 rounded-lg overflow-hidden shadow-lg max-w-[10rem]
                                                                      max-h-[15rem]"
    >
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${cardIndex}-card-img` }
        className="w-40"
      />
      <p data-testid={ `${cardIndex}-card-name` } className="py-2 px-6">
        {recipe.strMeal || recipe.strDrink}
      </p>
    </div>
  );
}

export default RecipeCard;
