import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DrinkType, FavoritesType, MealType } from '../../Type/type';
import useLocalStorage from '../../hooks/useLocalStorage';

import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

type FavoriteButtonProps = {
  favorites: DrinkType | MealType
};

function FavoriteButton({ favorites }: FavoriteButtonProps) {
  const [value, setValue] = useLocalStorage<FavoritesType[]>('favoriteRecipes', []);
  const { pathname } = useLocation();
  const key = pathname.includes('drinks') ? 'drink' : 'meal';
  const [checked, setChecked] = useState(false);
  const { id } = useParams();
  const isFavorited = value.some((item) => item.id === id);

  useEffect(() => {
    if (isFavorited) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [isFavorited]);

  const setToFavorites = () => {
    if (!isFavorited) {
      const favorited: FavoritesType[] = [
        ...value,
        {
          id: favorites.idMeal || favorites.idDrink,
          type: key,
          nationality: favorites.strArea || '',
          category: favorites.strCategory,
          alcoholicOrNot: favorites.strAlcoholic || '',
          name: favorites.strMeal || favorites.strDrink,
          image: favorites.strMealThumb || favorites.strDrinkThumb,
        },
      ];

      toggleFavorited();
      setValue(favorited);
    } else {
      setValue(value.filter((item) => item.id !== id));
    }
  };

  const toggleFavorited = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <button
        onClick={ setToFavorites }
      >
        <img
          data-testid="favorite-btn"
          src={ checked ? blackHeartIcon : whiteHeartIcon }
          alt={ checked ? 'InLove' : 'NotInLove' }
          className="h-7"
        />
      </button>
    </div>
  );
}

export default FavoriteButton;
