import { useDispatch } from 'react-redux';
export const useReduxStore = () => {
  const dispatch = useDispatch();
  const addToReduxStore = (key, value) => {
    dispatch({ type: key, payload: value });
  };
  return [addToReduxStore];
};
