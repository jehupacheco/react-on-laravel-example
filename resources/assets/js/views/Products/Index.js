import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import createStore from '~redux/store';
import Layout from 'components/Layout';
import Products from 'components/Products';

const Client = props => (
  <Provider store={createStore(props)}>
    <Layout>
      <Products />
    </Layout>
  </Provider>
);

export const server = (props) => {
  const sheet = new ServerStyleSheet();

  return ({
    renderedHtml: {
      componentHtml: renderToString(
        <StyleSheetManager sheet={sheet.instance}>
          <Client {...props} />
        </StyleSheetManager>,
      ),
      componentCss: sheet.getStyleTags(),
    },
  });
};

export default Client;
