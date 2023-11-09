import AllMealsIcon from '../../images/mealCategoryIcon.svg';
import AllDrinksIcon from '../../images/allDrinksIcon.svg';
import AllIcon from '../../images/allTudo.svg';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

function TypeFilter({ setFilter }: Props) {
  return (
    <div className="flex justify-center items-center gap-8">
      <button
        onClick={ () => setFilter('all') }
        data-testid="filter-by-all-btn"
        className="flex flex-col items-center"
      >
        <img src={ AllIcon } alt="all categories" className="shrink-0 h-16" />
        <p>All</p>
      </button>
      <button
        onClick={ () => setFilter('meal') }
        data-testid="filter-by-meal-btn"
      >
        <img src={ AllMealsIcon } alt="all categories" className="shrink-0 h-16" />
        <p>Meals</p>
      </button>
      <button
        onClick={ () => setFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        <img src={ AllDrinksIcon } alt="all categories" className="shrink-0 h-16" />
        <p>Drinks</p>
      </button>
    </div>
  );
}

export default TypeFilter;
