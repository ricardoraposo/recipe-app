import { DrinkType, MealType } from './type';

export type RecipiesContextType = {
  renderRecipes: DrinkType[] | MealType[],
  updateRecipesList: (newList: DrinkType[] | MealType[]) => void,
};
