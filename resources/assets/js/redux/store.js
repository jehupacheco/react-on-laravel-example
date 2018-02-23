import { createStore } from 'redux';
import cartReducer, { parseInitialState } from '~redux/modules/cart';

/* eslint-disable no-undef, no-underscore-dangle */
const store = ({ products }) => (
  createStore(
    cartReducer,
    parseInitialState(products),
    typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
  )
);
/* eslint-enable */

export default store;
