import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { authModal } from './authModalReducer';
import { cartReducer } from './cartReducer';
import { savedForLaterReducer } from './savedForLater';
import { searchReducer } from './searchReducer';
const rootReducer = combineReducers({
  user: userReducer,
  authModal: authModal,
  cart: cartReducer,
  savedForLater: savedForLaterReducer,
  search: searchReducer,
});

export default rootReducer;
