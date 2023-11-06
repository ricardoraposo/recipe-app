import PlateIcon from '../images/plateIcon.svg';
import DrinkIcon from '../images/drinkIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import DoneRecipesIcon from '../images/doneRecipesIcon.svg';
import FavoriteRecipesIcon from '../images/favoriteRecipes.svg';

type Props = {
  title: 'meals' | 'drinks' | 'profile' | 'done-recipes' | 'favorite-recipes';
};

function Title({ title }: Props) {
  switch (title) {
    case 'meals':
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-6">
          <img src={ PlateIcon } alt="plate and fork" className="h-10" />
          <h1 data-testid="page-title" className="text-mainPurple">
            MEALS
          </h1>
        </div>
      );
    case 'drinks':
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-6">
          <img src={ DrinkIcon } alt="drink" className="h-10" />
          <h1 data-testid="page-title" className="text-mainPurple">
            DRINKS
          </h1>
        </div>
      );
    case 'profile':
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-6">
          <img src={ ProfileIcon } alt="profile logo" className="h-10" />
          <h1 data-testid="page-title" className="text-mainPurple">
            PROFILE
          </h1>
        </div>
      );
    case 'done-recipes':
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-6">
          <img src={ DoneRecipesIcon } alt="done recipes icon" className="h-10" />
          <h1 data-testid="page-title" className="text-mainPurple">
            DONE RECIPES
          </h1>
        </div>
      );
    case 'favorite-recipes':
      return (
        <div className="flex flex-col justify-center items-center gap-2 py-6">
          <img src={ FavoriteRecipesIcon } alt="favorite recipes logo" className="h-10" />
          <h1 data-testid="page-title" className="text-mainPurple">
            FAVORITE RECIPES
          </h1>
        </div>
      );
    default:
  }
}

export default Title;
