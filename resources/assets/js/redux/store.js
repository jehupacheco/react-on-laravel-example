import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cartReducer, { parseInitialState } from '~redux/modules/cart';

/* eslint-disable no-undef, no-underscore-dangle */
const composeEnhancers = typeof window !== 'undefined' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const store = ({ products, cart }) => (
  createStore(
    cartReducer,
    parseInitialState(products, cart),
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  )
);
/* eslint-enable */

export default store;
