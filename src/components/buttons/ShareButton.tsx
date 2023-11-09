import { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';

type Props = {
  id: string;
  keyStr: string;
  testid: string;
};

function ShareButton({ id, keyStr, testid }: Props) {
  const [message, setMessage] = useState(false);

  const handleShareClick = async () => {
    const recipeLink = `http://localhost:3000/${keyStr}/${id}`;
    await navigator.clipboard.writeText(recipeLink);
    setMessage(true);
    return message;
  };

  return (
    <div className="flex justify-center items-center group">
      <button
        onClick={ handleShareClick }
      >
        <img
          data-testid={ testid }
          src={ shareIcon }
          alt="share button"
          className="h-7"
        />
      </button>
      <p
        className="fixed top-1/4 left-1/2 whitespace-nowrap bg-mainPurple text-white
        p-2 rounded-xl text-xl scale-0 group-hover:scale-100
        transition-all -translate-x-1/2 -translate-y-1/2"
      >
        Link copied!
      </p>
    </div>
  );
}

export default ShareButton;
