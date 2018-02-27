import React from 'react';
import { Provider } from 'react-redux';
import createStore from '~redux/store';
import Layout from 'components/Layout';
import Products from 'components/Products';

const ProductsIndex = props => (
  <Provider store={createStore(props)}>
    <Layout>
      <Products />
    </Layout>
  </Provider>
);

export default ProductsIndex;
