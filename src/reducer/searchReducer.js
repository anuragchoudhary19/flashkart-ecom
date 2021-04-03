const initialState = { text: '', brand: { id: '', name: '' }, product: { id: '', name: '' } };

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...state, ...action.payload };
    case 'SEARCH_BRAND':
      return { ...state, ...action.payload };
    case 'SEARCH_PRODUCT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
