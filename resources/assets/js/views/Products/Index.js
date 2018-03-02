import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter, Switch } from 'react-router-dom';
import createStore from '~redux/store';
import Layout from 'components/Layout';

const ProductsIndex = props => (
  <BrowserRouter>
    <Provider store={createStore(props)}>
      <Switch>
        <Layout />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export const server = props => (
  <StaticRouter>
    <Provider store={createStore(props)}>
      <Switch>
        <Layout />
      </Switch>
    </Provider>
  </StaticRouter>
);


export default ProductsIndex;
