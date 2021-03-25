export const authModal = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_MODAL':
      return action.payload;
    case 'SHOW_SIGNUP_MODAL':
      return action.payload;
    case 'SHOW_PASSWORD_RECOVERY_MODAL':
      return action.payload;
    case 'HIDE_MODAL':
      return action.payload;
    default:
      return state;
  }
};
