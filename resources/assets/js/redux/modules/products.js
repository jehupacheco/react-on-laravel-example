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
        products: response.data.data,
        pagination: {
          currentPage: response.data.current_page,
          totalProducts: response.data.total,
        },
      },
    });
  } catch (err) {
    return err;
  }
};

export default function productsReducer(state = { products: OrderedMap({}) }, { type, payload }) {
  switch (type) {
    case UPDATE_PRODUCTS:
      return {
        pagination: payload.pagination,
        products: getOrderedMapList(payload.products),
      };
    default:
      return state;
  }
}
