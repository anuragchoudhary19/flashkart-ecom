let initialState = [];

if (typeof window !== 'undefined') {
  if (localStorage.getItem('saved')) {
    initialState = JSON.parse(localStorage.getItem('saved'));
  }
}
export const savedForLaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_FOR_LATER':
      return action.payload;
    case 'MOVE_TO_CART':
      return action.payload;
    case 'REMOVE_FROM_SAVED_FOR_LATER':
      return action.payload;
    default:
      return state;
  }
};
