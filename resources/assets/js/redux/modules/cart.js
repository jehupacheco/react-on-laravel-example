import { OrderedMap } from 'immutable';
import Product from '~redux/models/Product';
import { createSelector } from 'reselect';
import axios from 'utils/axios';

const getOrderedMapList = arr => OrderedMap(arr.reduce((acc, product) => ({
  ...acc,
  [product.id]: new Product(product),
}), {}));

export const parseInitialState = (products, cart) => {
  const productsMap = getOrderedMapList(products);

  return Object.keys(cart).reduce((updatedProducts, rowId) => (
    updatedProducts.update(`${cart[rowId].id}`, product => (
      product
        ? product.set('rowId', rowId).set('selected', true)
        : product
    ))
  ), productsMap);
};

const SELECT_PRODUCT = 'playground/cart/SELECT_PRODUCT';
const UNSELECT_PRODUCT = 'playground/cart/UNSELECT_PRODUCT';
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

export const selectProduct = index => async (dispatch) => {
  try {
    await axios.post('/cart/addProduct', {
      id: index,
    });

    return dispatch({
      type: SELECT_PRODUCT,
      payload: {
        index: `${index}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const unselectProduct = (index, rowId) => async (dispatch) => {
  try {
    await axios.post('/cart/removeProduct', {
      id: index,
      rowId,
    });

    return dispatch({
      type: UNSELECT_PRODUCT,
      payload: {
        index: `${index}`,
        rowId: `${rowId}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export default function cartReducer(state = OrderedMap({}), { type, payload }) {
  switch (type) {
    case SELECT_PRODUCT:
      return state.update(payload.index, product => product.set('selected', true));
    case UNSELECT_PRODUCT:
      return state.update(payload.index, product => product.set('selected', false));
    case UPDATE_PRODUCTS:
      return getOrderedMapList(payload.data);
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
