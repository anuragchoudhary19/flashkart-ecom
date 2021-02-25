let initialState = [];

if (typeof window !== 'undefined') {
  if (localStorage.getItem('localCart')) {
    initialState = JSON.parse(localStorage.getItem('localCart'));
  }
}
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    case 'DELETE_FROM_CART':
      return action.payload;
    case 'SAVED_FOR_LATER':
      return action.payload;
    default:
      return state;
  }
};
