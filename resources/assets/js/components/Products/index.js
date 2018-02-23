import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { productsSelector } from '~redux/modules/cart';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Product from './Product';

const propTypes = {
  products: ImmutablePropTypes.seq.isRequired,
};

const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 900px;
`;

const Products = ({ products }) => (
  <div>
    <h1>Products</h1>
    <ProductsContainer>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </ProductsContainer>
  </div>
);

Products.propTypes = propTypes;

export default connect(state => ({
  products: productsSelector(state),
}))(Products);
