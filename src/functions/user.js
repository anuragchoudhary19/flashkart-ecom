import { currentUser } from '../axiosFunctions/auth';
import { auth } from '../firebase';

export const unsubscribe = (dispatch) => {
  return auth.onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken(true);
      currentUser(token)
        .then((res) => {
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              name: res.data.name,
              email: res.data.email,
              token: token,
              wishlist: res.data.wishlist,
              role: res.data.role,
              _id: res.data._id,
            })
          );
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: token,
              wishlist: res.data.wishlist,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
