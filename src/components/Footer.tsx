import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer
        data-testid="footer"
        className="w-screen fixed bottom-0 bg-mainPurple flex justify-between px-12 py-2"
      >
        <button>
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src="/src/images/drinkIcon.svg"
              alt="drink-icon"
            />
          </Link>
        </button>
        <button>
          <Link to="/meals">
            <img
              data-testid="meals-bottom-btn"
              src="/src/images/mealIcon.svg"
              alt="meal-icon"
            />
          </Link>
        </button>
      </footer>

    </div>
  );
}

export default Footer;
