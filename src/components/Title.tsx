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
        <div>
          <img src={ PlateIcon } alt="plate and fork" />
          <h1 data-testid="page-title">
            Meals
          </h1>
        </div>
      );
    case 'drinks':
      return (
        <div>
          <img src={ DrinkIcon } alt="drink" />
          <h1 data-testid="page-title">
            Drinks
          </h1>
        </div>
      );
    case 'profile':
      return (
        <div>
          <img src={ ProfileIcon } alt="profile logo" />
          <h1 data-testid="page-title">
            Profile
          </h1>
        </div>
      );
    case 'done-recipes':
      return (
        <div>
          <img src={ DoneRecipesIcon } alt="done recipes icon" />
          <h1 data-testid="page-title">
            Done Recipes
          </h1>
        </div>
      );
    case 'favorite-recipes':
      return (
        <div>
          <img src={ FavoriteRecipesIcon } alt="favorite recipes logo" />
          <h1 data-testid="page-title">
            Favorite Recipes
          </h1>
        </div>
      );
    default:
  }
}

export default Title;
