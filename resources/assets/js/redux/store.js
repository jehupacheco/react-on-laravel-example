import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import cartReducer, { parseInitialState } from '~redux/modules/cart';
import productsReducers from '~redux/modules/products';

/* eslint-disable no-undef, no-underscore-dangle */
const composeEnhancers = typeof window !== 'undefined' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const reducers = combineReducers({
  cartReducer,
  productsReducers,
});

console.log(reducers);

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
