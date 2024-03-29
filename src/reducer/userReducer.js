let initialState = null;

if (localStorage.getItem('user')) {
  initialState = JSON.parse(localStorage.getItem('user'));
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};
