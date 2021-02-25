export const authModal = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.payload;
    case 'HIDE_MODAL':
      return action.payload;
    default:
      return state;
  }
};
