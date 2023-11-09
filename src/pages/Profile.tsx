import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

import DoneRecipesIcon from '../images/doneRecipesIcon.svg';
import FavoriteRecipesIcon from '../images/favoriteRecipes.svg';
import LogoutIcon from '../images/logoutIcon.svg';
import Divider from '../components/Divider';

function Profile() {
  const [user] = useLocalStorage<{ email: string }>('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <main className="flex flex-col items-center">
        <div>
          <h2
            data-testid="profile-email"
            className="font-bold"
          >
            {user.email}
          </h2>
        </div>
        <div className="flex flex-col items-center w-full mt-24 gap-6">
          <button
            data-testid="profile-done-btn"
            onClick={ () => navigate('/done-recipes') }
            className="flex justify-start items-center text-2xl gap-4"
          >
            <img src={ DoneRecipesIcon } alt="icone de receitas feitas" />
            <p>Done Recipes</p>
          </button>
          <Divider />
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => navigate('/favorite-recipes') }
            className="flex justify-start items-center text-2xl gap-4"
          >
            <img src={ FavoriteRecipesIcon } alt="icone de receitas favoritas" />
            <p>Favorite Recipes</p>
          </button>
          <Divider />
          <button
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
            className="flex justify-start items-center text-2xl gap-4"
          >
            <img src={ LogoutIcon } alt="icone de logout" />
            <p>Logout</p>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
