import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export default function productsReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_PRODUCTS:
      return state;
    default:
      return state;
  }
}

export const getProducts = page => (dispatch) => {
  console.log(page);
  let products;

  axios.get(`/product/list?page=${page}`)
    .then((response) => {
      console.log(response.data);
      products = response.data.data;

      return dispatch({
        type: GET_PRODUCTS,
        payload: {
          products,
        },
      });
    });
};
