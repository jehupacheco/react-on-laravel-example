import ReactOnRails from 'react-on-rails';
import fontawesome from '@fortawesome/fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';

fontawesome.library.add(faShoppingCart);

const dynamicRequire = (rawPaths, keyGenerator, filter = (() => true)) => (
  rawPaths.keys()
    .map(key => key.split('/'))
    .filter(filter)
    .reduce((cmps, split) => ({
      ...cmps,
      [keyGenerator(split)]: rawPaths(split.join('/')).default,
    }), {})
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
