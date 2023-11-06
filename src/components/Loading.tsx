import LogoIcon from '../images/ícone Recipes app.png';

function Loading() {
  return (
    <div className="flex justify-center items-center mt-24 h-18 animate-ping">
      <img src={ LogoIcon } alt="loading state" />
    </div>
  );
}

export default Loading;
