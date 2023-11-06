import { useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import { DRINKS_LINK, MEALS_LINK } from '../Helpers/Links';
import { ApiReturn } from '../Type/type';

function DetailsCarousel() {
  const { pathname } = useLocation();
  const url = pathname.includes('drinks') ? MEALS_LINK : DRINKS_LINK;
  const key = pathname.includes('drinks') ? 'meals' : 'drinks';

  const { data } = useFetch<ApiReturn>(url);
  const recipes = data ? data[key] : [];

  return (
    <section className="mb-20">
      <h2 className="font-bold mt-6 mb-4">Recommended</h2>
      <ul
        className="w-full flex gap-5 list-none m-0 p-0 overflow-x-scroll"
      >
        {recipes.slice(0, 6).map((recipe, index) => (
          <li
            key={ recipe.idDrink || recipe.idMeal }
            data-testid={ `${index}-recommendation-card` }
            className="min-w-[45%] border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              className="object-cover"
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
              className="m-2"
            >
              {recipe.strMeal || recipe.strDrink}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DetailsCarousel;
