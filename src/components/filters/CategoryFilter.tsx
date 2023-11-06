import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchAPI } from '../../Helpers/FetchAPI';
import FilterButton from './FilterButton';
import RecipiesContext from '../../context/RecipiesContext';
import { CategoryType, DrinkType, MealType } from '../../Type/type';
import { addToCache, getFromCache } from '../../hooks/useFetch';

import AllMealsIcon from '../../images/mealCategoryIcon.svg';
import BeefIcon from '../../images/beefIcon.svg';
import GoatIcon from '../../images/goatIcon.svg';
import ChickenIcon from '../../images/chickenIcon.svg';
import BreakfastIcon from '../../images/breakfastIcon.svg';
import DessertIcon from '../../images/dessertIcon.svg';

import AllDrinksIcon from '../../images/allDrinksIcon.svg';
import OrdinaryDrinksIcon from '../../images/ordinaryDrinksIcon.svg';
import CocktailIcon from '../../images/cocktailIcon.svg';
import ShakeIcon from '../../images/shakeIcon.svg';
import OtherDrinks from '../../images/otherDrinksIcon.svg';
import CocoaDrinks from '../../images/cocoaDrinks.svg';

const mealList = [BeefIcon, BreakfastIcon, ChickenIcon, DessertIcon, GoatIcon];
const drinksList = [OrdinaryDrinksIcon, CocktailIcon, ShakeIcon,
  OtherDrinks, CocoaDrinks];

type CategoryProps = {
  endpoints: {
    initialList: string,
    categories: string,
  };
};

function CategoryFilter({ endpoints }: CategoryProps) {
  const { pathname } = useLocation();
  const { categories, initialList } = endpoints;
  const { updateRecipesList, updateLoading } = useContext(RecipiesContext);

  const [categoriesList, setCategoriesList] = useState<string[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchAPI(categories);
      const fiveCategories = (
        Object.values(data)[0] as CategoryType[]
      ).slice(0, 5)
        .map(({ strCategory }) => strCategory);
      setCategoriesList(fiveCategories);
    };
    fetchCategories();
  }, []);

  const handleClick = async () => {
    const cachedData = getFromCache<DrinkType[] | MealType[]>(initialList);
    if (cachedData) {
      updateRecipesList(cachedData);
      return;
    }

    updateLoading(true);
    const recipesData = await fetchAPI(initialList);
    const recipes = Object.values(recipesData)[0] as DrinkType[] | MealType[];
    updateRecipesList(recipes);
    updateLoading(false);
    addToCache(initialList, recipes);
  };

  return (
    <section>
      <div className="flex gap-2 justify-between items-start shrink-0 mx-2 mb-4">
        <button
          data-testid="All-category-filter"
          onClick={ handleClick }
          className="flex flex-col items-center"
        >
          <img
            src={ pathname.includes('meal') ? AllMealsIcon : AllDrinksIcon }
            alt="all categories"
          />
          <p className="font-thin text-sm shrink-0">All</p>
        </button>
        {categoriesList?.map((categoryName, index) => (
          <FilterButton
            key={ categoryName }
            buttonInfo={ { categoryName, initialList } }
            icon={ pathname.includes('meal') ? mealList[index] : drinksList[index] }
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
