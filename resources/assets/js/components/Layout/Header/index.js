import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Item from 'components/Layout/Header/Item';
import { totalAmountSelector } from '~redux/modules/cart';
import colors, { colorLuminance } from 'utils/styles/color';
import { media } from 'utils/styles/media';

const propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

const Container = styled.div`
  align-items: center;
  background-color: ${colorLuminance(colors.grey, 0.5)};
  border-bottom: 1px solid ${colorLuminance(colors.grey, 0.2)};
  display: flex;
  height: 80px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const Left = styled.div`
  align-items: center;  
  justify-content: space-between;
  display: flex;
  width: 100%;

  ${media.tablet`
    justify-content: flex-start;
  `}
`;

const Right = styled.div`
  align-items: center;  
  display: none;

  ${media.tablet`
    display: flex;
  `}
`;

const Header = ({ totalAmount }) => (
  <Container>
    <Left>
      <Item noHover>E-commerce</Item>
    </Left>
    <Right>
      <Item noHover>
        Total: ${totalAmount}
      </Item>
      <Item noHover>
        <FontAwesomeIcon icon="shopping-cart" />
      </Item>
    </Right>
  </Container>
);

Header.propTypes = propTypes;

export default connect(state => ({
  totalAmount: totalAmountSelector(state),
}))(Header);
