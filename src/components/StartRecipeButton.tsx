import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DoneRecipesLSType } from '../Type/type';
import RecipiesContext from '../context/RecipiesContext';

function StartRecipeButton() {
  const {
    recipes: inProgressRecipes,
    initInProgressStorage,
  } = useContext(RecipiesContext);
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();
  const key = pathname.includes('meals') ? 'meals' : 'drinks';

  const isDone = doneRecipes.find((recipe: any) => recipe.id === id);

  const isRecipeInProgress = () => {
    const allRecipes = inProgressRecipes[key];
    if (allRecipes && id) {
      const recipe = allRecipes[id];
      if (recipe) return true;
    }
    return false;
  };

  const handleStartRecipeClick = () => {
    switch (key) {
      case 'meals':
        initInProgressStorage(key, id);
        navigate(`/meals/${id}/in-progress`);
        break;
      case 'drinks':
        initInProgressStorage(key, id);
        navigate(`/drinks/${id}/in-progress`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center">
      {!isDone && (
        <button
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipeClick }
          className="fixed bottom-0 text-center w-11/12 mb-4 py-3 bg-mainYellow rounded-lg
          text-white font-bold"
        >
          {isRecipeInProgress() ? 'CONTINUE RECIPE' : 'START RECIPE'}
        </button>
      )}
    </div>
  );
}

export default StartRecipeButton;
