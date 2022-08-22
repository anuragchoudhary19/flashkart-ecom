export const INITIAL_STATE = {
  products: [],
  loading: false,
  isLastPage: false,
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case 'FECTHING':
      return {
        ...state,
        loading: true,
      };
    case 'FECTHED':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        isLastPage: action.payload.isLastPage,
      };
    case 'ERROR':
      return { ...state, loading: false };
    default:
      return state;
  }
};
