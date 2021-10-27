export const useUpdateUser = () => {
  const updateReduxStore = (user, token, dispatch) => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        name: user.name,
        email: user.email,
        token: token,
        wishlist: user.wishlist,
        role: user.role,
        _id: user._id,
      },
    });
  };
  const updateLocalStore = (user, token) => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({
        name: user.name,
        email: user.email,
        token: token,
        wishlist: user.wishlist,
        role: user.role,
        _id: user._id,
      })
    );
  };
  return { updateReduxStore, updateLocalStore };
};
