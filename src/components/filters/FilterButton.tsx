import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../../Helpers/FetchAPI';
import RecipiesContext from '../../context/RecipiesContext';
import { DrinkType, MealType } from '../../Type/type';
import { addToCache, getFromCache } from '../../hooks/useFetch';

type ButtonProps = {
  buttonInfo: {
    categoryName: string,
    initialList: string,
  };
  icon: string;
};

function FilterButton({ buttonInfo: { categoryName, initialList }, icon }: ButtonProps) {
  const { updateRecipesList, updateLoading } = useContext(RecipiesContext);

  const [toggle, setToggle] = useState<boolean>(false);

  const { pathname } = useLocation();

  const handleClick = async () => {
    const apiURL = pathname === '/drinks' ? 'thecocktaildb' : 'themealdb';
    const url = `https://www.${apiURL}.com/api/json/v1/1/filter.php?c=${categoryName}`;
    if (!toggle) {
      const cachedData = getFromCache<DrinkType[] | MealType[]>(url);
      if (cachedData) {
        updateRecipesList(cachedData);
      } else {
        updateLoading(true);
        const recipesData = await fetchAPI(url);
        const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
        updateRecipesList(recipes);
        updateLoading(false);
        addToCache(url, recipes);
      }
    } else {
      const cachedData = getFromCache<DrinkType[] | MealType[]>(initialList);
      if (cachedData) {
        updateRecipesList(cachedData);
      } else {
        updateLoading(true);
        const recipesData = await fetchAPI(initialList);
        const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
        updateRecipesList(recipes);
        updateLoading(false);
        addToCache(initialList, recipes);
      }
    }
    setToggle(!toggle);
  };

  return (
    <button
      onClick={ handleClick }
      key={ categoryName }
      data-testid={ `${categoryName}-category-filter` }
      className="flex flex-col items-center w-12"
    >
      <img src={ icon } alt="all categories" className="shrink-0" />
      <p className="font-thin text-sm">{categoryName}</p>

    </button>
  );
}

export default FilterButton;
