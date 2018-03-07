import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import colors from 'utils/styles/color';
import { getProducts } from '~redux/modules/products';

const PaginationList = styled.ul`
  text-align: center;
`;

const PaginationItem = styled.li`
  display: inline-block;
`;

const StyledLink = styled(Link)`
  border: solid ${props => props.color} 1px;
  color: ${props => props.color};
  display: inline-block;
  margin: 0 2px;
  padding: 5px 10px;
  text-decoration: none;

  &.current {
    background-color: #666;
    color: #fff;
    border: 0;
  }
`;

const mapStateToProps = state => ({
  data: state,
});

const mapDispatchToProps = dispatch => ({
  loadProducts(evt) {
    dispatch(getProducts(evt.target.dataset.page));
  },
});

const Pagination = ({ currentPage, totalProducts }) => {
  const pages = totalProducts / 10;

  const pagination = [...Array(pages)].map((item, index) => {
    const page = index + 1;
    const isCurrentPage = (currentPage === page) ? 'current' : '';

    return (
      <PaginationItem key={index} >
        <StyledLink className={isCurrentPage} data-page={page} color={colors.grey} to={`/?page=${page}`}> {page} </StyledLink>
      </PaginationItem>
    );
  });

  return (
    <div className="pagination">
      <PaginationList>
        {pagination}
      </PaginationList>
    </div>
  );
};

Pagination.defaultProps = {
  currentPage: 0,
  totalProducts: 100,
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalProducts: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
