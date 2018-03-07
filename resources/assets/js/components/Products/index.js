import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { productsSelector } from '~redux/modules/cart';
import { fetchProducts } from '~redux/modules/products';
import Product from './Product';
import Pagination from './Pagination';

const propTypes = {
  products: ImmutablePropTypes.seq.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  pagination: PropTypes.shape(),
};

const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 900px;
`;

let loadedPage = '1';

const mapStateToProps = state => ({
  products: productsSelector(state),
  pagination: state.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchData(currentPage) {
    dispatch(fetchProducts(currentPage));
  },
});

class Products extends Component {
  componentDidUpdate() {
    const { location, fetchData } = this.props;
    const currentPage = this.getPage(location.search);

    if (loadedPage !== currentPage) {
      fetchData(currentPage);
      loadedPage = currentPage;
    }
  }

  getPage = query => query.substr(query.indexOf('=') + 1);

  render() {
    const { products, pagination } = this.props;

    return (
      <div>
        <h1>Products - page {pagination.currentPage}</h1>
        <ProductsContainer>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </ProductsContainer>
        <Pagination currentPage={pagination.currentPage} totalProducts={pagination.totalProducts} />
      </div>
    );
  }
}

Products.propTypes = propTypes;

Products.defaultProps = {
  pagination: {
    current_page: 1,
    total: 0,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
