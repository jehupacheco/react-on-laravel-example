import { OrderedMap } from 'immutable';
import Product from '~redux/models/Product';
import { createSelector } from 'reselect';

export const parseInitialState = products => (
  OrderedMap(products.reduce((acc, product) => ({
    ...acc,
    [product.id]: new Product(product),
  }), {}))
);

const SELECT_PRODUCT = 'playground/cart/SELECT_PRODUCT';
const UNSELECT_PRODUCT = 'playground/cart/UNSELECT_PRODUCT';

export const selectProduct = index => ({
  type: SELECT_PRODUCT,
  payload: {
    index: `${index}`,
  },
});

export const unselectProduct = index => ({
  type: UNSELECT_PRODUCT,
  payload: {
    index: `${index}`,
  },
});

export default function cartReducer(state = OrderedMap({}), { type, payload }) {
  switch (type) {
    case SELECT_PRODUCT:
      return state.update(payload.index, product => product.set('selected', true));
    case UNSELECT_PRODUCT:
      return state.update(payload.index, product => product.set('selected', false));
    default:
      return state;
  }
}

export const productsSelector = state => state.valueSeq();
export const selectedProductsSelector = createSelector(
  productsSelector,
  products => products.filter(product => product.get('selected')),
);
export const totalAmountSelector = createSelector(
  selectedProductsSelector,
  products => products.reduce((acc, product) => acc + product.get('price'), 0),
);
