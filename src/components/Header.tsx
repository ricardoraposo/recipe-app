import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import LogoIcon from '../images/ícone Recipes app.png';
import Title from './Title';

function Header() {
  const route = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const showSearchIcon = !route.pathname.includes('profile')
    && !route.pathname.includes('done-recipes')
    && !route.pathname.includes('favorite-recipes');

  const pageTitle = () => {
    if (route.pathname.includes('meals')) {
      return <Title title="meals" />;
    } if (route.pathname.includes('drinks')) {
      return <Title title="drinks" />;
    } if (route.pathname.includes('profile')) {
      return <Title title="profile" />;
    } if (route.pathname.includes('done-recipes')) {
      return <Title title="done-recipes" />;
    } if (route.pathname.includes('favorite-recipes')) {
      return <Title title="favorite-recipes" />;
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <header className="flex justify-between items-center bg-mainYellow">
        <div className="flex items-center">
          <div>
            <img src={ LogoIcon } alt="recipe app icon" />
          </div>
          <div className="flex">
            <p className="italic text-mainPurple">RECIPE</p>
            {' '}
            <span className="font-bold text-mainPurple">app</span>
          </div>
        </div>
        <div className="flex items-center">
          {showSearchIcon && (
            <div>
              <button onClick={ toggleSearchBar }>
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="Ícone de Pesquisa"
                />
              </button>
              {showSearchBar && (
                <SearchBar />
              )}
            </div>
          )}
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Ícone de Perfil"
            />
          </Link>
        </div>
      </header>
      {pageTitle()}
      <Outlet />
    </>
  );
}

export default Header;
