import { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipiesContext from '../../context/RecipiesContext';

type IngredientProps = {
  index: number;
  product: string;
  ingredientName: string;
  ingredientKey: string;
};

function IngredientCard({
  index,
  ingredientKey,
  ingredientName,
  product,
}: IngredientProps) {
  const { recipes, toggleItem } = useContext(RecipiesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const key = pathname.includes('meals') ? 'meals' : 'drinks';

  const isInProgress = (name: string) => {
    const ingredients = id ? recipes[key][id] : [];
    const ingredient = ingredients.find((item) => item === name);
    return !!ingredient;
  };

  if (pathname.includes('in-progress')) {
    return (
      <div
        className="tracking-wide h-8"
      >
        <label
          htmlFor={ ingredientName }
          data-testid={ `${index}-ingredient-step` }
          style={ {
            textDecoration: isInProgress(ingredientName)
              ? 'line-through solid rgb(0, 0, 0)' : 'none',
          } }
          className="flex items-center gap-2"
        >
          <input
            type="checkbox"
            id={ ingredientName }
            checked={ isInProgress(ingredientName) }
            onChange={ () => {
              toggleItem(ingredientName, key, id);
            } }
          />
          {`${ingredientName} - ${ingredientKey}`}

        </label>
        <br />
      </div>
    );
  }

  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ product }
      className="tracking-wide list-disc list-inside"
    >
      {`${ingredientName} - ${ingredientKey}`}
    </li>
  );
}

export default IngredientCard;
