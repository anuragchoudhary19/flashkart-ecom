import { useEffect } from 'react';
import { currentUser } from '../axiosFunctions/auth';
import { auth } from '../firebase';
import { useLocalStorage } from './useLocalStorage';
import { useReduxStore } from './useReduxStore';

const getPayloadFromResponse = (res, token) => {
  return {
    name: res.data.name,
    email: res.data.email,
    token: token,
    wishlist: res.data.wishlist,
    role: res.data.role,
    _id: res.data._id,
  };
};

export const useUnsubscribe = () => {
  const [addToLocalStorage] = useLocalStorage();
  const [addToReduxStore] = useReduxStore();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const token = await user.getIdToken(true);
      currentUser(token)
        .then((res) => {
          const payload = getPayloadFromResponse(res, token);
          addToLocalStorage('user', JSON.stringify(payload));
          addToReduxStore('LOGGED_IN_USER', payload);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [addToLocalStorage, addToReduxStore]);
};
