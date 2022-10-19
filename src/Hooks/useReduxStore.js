import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
export const useReduxStore = () => {
  const dispatch = useDispatch();
  const addToReduxStore = useCallback(
    (key, value) => {
      dispatch({ type: key, payload: value });
    },
    [dispatch]
  );
  return [addToReduxStore];
};
