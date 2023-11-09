import { useNavigate } from 'react-router-dom';

type Props = {
  ingredients: string[];
  storedIngredients: string[];
  setToDoneRecipes: () => void;
};

function FinishButton({ ingredients, storedIngredients, setToDoneRecipes }: Props) {
  const nav = useNavigate();
  const finished = ingredients.length > 0 && ingredients
    .every((ingredient) => storedIngredients.includes(ingredient));

  return (
    <button
      data-testid="finish-recipe-btn"
      disabled={ !finished }
      onClick={ () => {
        setToDoneRecipes();
        nav('/done-recipes');
      } }
      className="fixed bottom-0 text-center w-11/12 mb-4 py-3
      bg-mainYellow rounded-lg text-white font-bold right-1/2 translate-x-1/2
      disabled:bg-gray-300 disabled:opacity-90"
    >
      Finish Recipe
    </button>
  );
}

export default FinishButton;
