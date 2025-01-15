// Import the createStore function from Redux
import { createStore } from 'redux';
// Import the rootReducer from the reducers directory
import rootReducer from './reducers/rootReducer';

// Create the Redux store
const store = createStore(
  // Use the rootReducer to manage the state
  rootReducer,
  // Enable Redux DevTools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Export the store
export default store;