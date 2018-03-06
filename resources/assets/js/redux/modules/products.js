import { OrderedMap } from 'immutable';
import Product from '~redux/models/Product';
import axios from 'axios';

const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

const getOrderedMapList = arr => OrderedMap(arr.reduce((acc, product) => ({
  ...acc,
  [product.id]: new Product(product),
}), {}));

export const fetchProducts = page => async (dispatch) => {
  try {
    const response = await axios.get(`/product/list?page=${page}`);

    return dispatch({
      type: UPDATE_PRODUCTS,
      payload: {
        data: response.data.data,
      },
    });
  } catch (err) {
    return err;
  }
};

export default function productsReducer(state = OrderedMap({}), { type, payload }) {
  switch (type) {
    case UPDATE_PRODUCTS:
      return getOrderedMapList(payload.data);
    default:
      return state;
  }
}
