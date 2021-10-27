let initialState;
if (typeof window !== 'undefined') {
  if (localStorage.getItem('user')) {
    if (localStorage.getItem('cartOnDB')) {
      initialState = JSON.parse(localStorage.getItem('cartOnDB'));
    } else {
      initialState = null;
    }
  } else {
    if (localStorage.getItem('cartLocal')) {
      initialState = JSON.parse(localStorage.getItem('cartLocal'));
    } else {
      initialState = null;
    }
  }
}
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    case 'SAVED_FOR_LATER':
      return action.payload;
    default:
      return state;
  }
};
