// Import the combineReducers function from Redux
import { combineReducers } from 'redux';
// Import the cartReducer from the reducers directory
import cartReducer from './cartReducer';

// Define the rootReducer
const rootReducer = combineReducers({
  // Use the cartReducer to manage the cart state
  cart: cartReducer,
});

// Export the rootReducer
export default rootReducer;