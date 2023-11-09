export const lettersOnlyRegex = /^[a-zA-Z]+$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

export const passwordRegex = (length: number = 8) => {
  return new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{${length},}$`);
};

export const initInProgress = {
  meals: {},
  drinks: {},
};

const addZero = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

export const formatDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${addZero(month)}/${addZero(day)}/${addZero(year)}`;
};
