export const useLocalStorage = () => {
  const addToLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
  };
  return [addToLocalStorage];
};
