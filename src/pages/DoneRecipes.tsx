import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DoneRecipesLSType } from '../Type/type';
import ShareButton from '../components/buttons/ShareButton';
import Tags from '../components/Tags';
import TypeFilter from '../components/filters/TypeFilter';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const navigate = useNavigate();

  const filteredRecipes = doneRecipes.filter((recipe) => {
    switch (filter) {
      case 'meal':
        return recipe.type === 'meal';
      case 'drink':
        return recipe.type === 'drink';
      default:
        return true;
    }
  });

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
                  height={ 400 }
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
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="text-xs"
                  >
                    {`Done in: ${recipe.doneDate}`}
                  </p>
                </div>
                <ShareButton
                  id={ recipe.id }
                  keyStr={ `${recipe.type}s` }
                  testid={ `${index}-horizontal-share-btn` }
                />
                <Tags index={ index } tagList={ recipe.tags } />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
