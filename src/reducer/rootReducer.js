import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { authModal } from './authModalReducer';
import { cartReducer } from './cartReducer';
import { savedForLaterReducer } from './savedForLater';
const rootReducer = combineReducers({
  user: userReducer,
  authModal: authModal,
  localCart: cartReducer,
  savedForLater: savedForLaterReducer,
});

export default rootReducer;
