import React from 'react';
import ReactOnRails from 'react-on-rails';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';

fontawesome.library.add(faShoppingCart);

const dynamicRequire = (rawPaths, keyGenerator, filter = (() => true)) => (
  rawPaths.keys()
    .map(key => key.split('/'))
    .filter(filter)
    .reduce((cmps, split) => {
      const Cmp = rawPaths(split.join('/')).server || rawPaths(split.join('/')).default;

      return ({
        ...cmps,
        [keyGenerator(split)]: (props) => {
          const sheet = new ServerStyleSheet();

          return ({
            renderedHtml: {
              componentHtml: renderToString(
                <StyleSheetManager sheet={sheet.instance}>
                  <Cmp {...props} />
                </StyleSheetManager>,
              ),
              componentCss: sheet.getStyleTags(),
            },
          });
        },
      });
    }, {})
);

const transformSplit = (split) => {
  const transformed = [...split.slice(0, split.length - 1), split[split.length - 1].split('.')[0]];

  return (
    transformed
      .filter(str => str !== 'index' && !str.includes('.'))
      .map(str => str.toLowerCase())
      .join('.')
  );
};

ReactOnRails.register({
  ...dynamicRequire(
    require.context('./views/', true, /.js$/),
    transformSplit,
  ),
});
