import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FavoritesType } from '../Type/type';
import ShareButton from '../components/buttons/ShareButton';
import TypeFilter from '../components/filters/TypeFilter';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage<FavoritesType[]>(
    'favoriteRecipes',
    [],
  );
  const navigate = useNavigate();

  const filteredRecipes = favoriteRecipes.filter((recipe) => {
    switch (filter) {
      case 'meal':
        return recipe.type === 'meal';
      case 'drink':
        return recipe.type === 'drink';
      default:
        return true;
    }
  });

  const removeItem = (recipeId: string) => {
    setFavoriteRecipes(favoriteRecipes.filter((item) => item.id !== recipeId));
  };

  return (
    <div>
      <TypeFilter setFilter={ setFilter } />
      <div className="flex flex-col mt-12 w-screen px-3 gap-6">
        {
          filteredRecipes.map((recipe, index) => (
            <div
              key={ recipe.id }
              className="flex border-2 rounded-lg overflow-hidden gap-2"
            >
              <button
                onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
                className="w-1/2"
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt="foto da receita"
                  className="w-full"
                />
              </button>
              <div className="w-1/2 flex flex-col justify-around items-start">
                <div>
                  <button
                    onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
                    data-testid={ `${index}-horizontal-name` }
                    className="text-base font-bold pt-8"
                  >
                    {recipe.name}
                  </button>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="text-xs"
                  >
                    {recipe.type === 'drink'
                      ? `${recipe.alcoholicOrNot} - ${recipe.category}`
                      : `${recipe.nationality} - ${recipe.category}`}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={ () => removeItem(recipe.id) }>
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="InLove"
                    />
                  </button>
                  <ShareButton
                    id={ recipe.id }
                    keyStr={ `${recipe.type}s` }
                    testid={ `${index}-horizontal-share-btn` }
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
