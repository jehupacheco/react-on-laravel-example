import React from 'react';
import { Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from 'components/Layout/Header';
import Products from 'components/Products';

const Body = styled.div`
  padding: 120px;
`;

const Layout = () => (
  <div>
    <Header />
    <Body>
      <Route path="/" component={Products} />
    </Body>
  </div>
);

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
