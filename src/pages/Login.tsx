import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';

import tomatoes from '../images/tomatoes.svg';
import logo from '../images/logo.svg';

type User = {
  email: string;
};

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage<User>('user');
  const form = useForm({
    initialValues: { email: '', password: '' },
    validation: {
      email: { filter: 'email' },
      password: { filter: 'length', length: 7 },
    },
    onSubmit: (values) => {
      setUser({ email: values.email });
      navigate('/meals');
    },
  });

  return (
    <div className="h-screen relative">
      <div className="h-1/2 bg-mainPurple flex justify-center items-center">
        <img src={ logo } alt="logo" className="h-72" />
      </div>
      <form
        action="submit"
        onSubmit={ form.handleSubmit }
        className="flex flex-col items-center gap-4 mt-28"
      >
        <h2 className="text-3xl italic">Login</h2>
        <input
          name="email"
          type="text"
          value={ form.values.email }
          onChange={ form.handleChange }
          data-testid="email-input"
          placeholder="Email"
          className="p-3 border border-mainPurple w-5/6 text-xl rounded-xl
          text-mainPurple placeholder-mainPurple placeholder:opacity-50"
        />
        <input
          name="password"
          type="password"
          value={ form.values.password }
          onChange={ form.handleChange }
          data-testid="password-input"
          placeholder="Password"
          className="p-3 border border-mainPurple w-5/6 text-xl rounded-xl
          text-mainPurple placeholder-mainPurple placeholder:opacity-50"
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !form.validate }
          className="p-3 text-xl text-white bg-mainYellow w-5/6 rounded-xl
          disabled:bg-mainYellow disabled:opacity-60"
        >
          Enter
        </button>
      </form>
      <img
        src={ tomatoes }
        alt="foto de tomate"
        className="absolute top-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default Login;
