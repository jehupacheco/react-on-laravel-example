import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ProductModel from '~redux/models/Product';
import { selectProduct, unselectProduct } from '~redux/modules/cart';
import PropTypes from 'prop-types';
import Image from 'components/Common/Image';
import Button from 'components/Common/Button';
import colors, { colorLuminance } from 'utils/styles/color';
import Name from './Name';

const propTypes = {
  product: PropTypes.instanceOf(ProductModel).isRequired,
  select: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
};

const Container = styled.div`
  align-items: flex-end;
  background-color: ${colorLuminance(colors.grey, 0.5)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 250px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Description = styled.div`
  padding: 20px;
`;

const Bottom = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;

const Product = ({ product, select, unselect }) => (
  <Container>
    <div>
      <ImageContainer>
        <Image src={product.images[0]} />
        <Name>
          <span>{product.name}</span>
        </Name>
      </ImageContainer>
      <Description>
        {product.description}
      </Description>
    </div>
    <Bottom>
      <span>${product.price}</span>
      <Button color={colors.grey} onClick={product.selected ? unselect : select}>
        {product.selected ? 'Remove me' : 'Add me'}
      </Button>
    </Bottom>
  </Container>
);

Product.propTypes = propTypes;

export default connect(
  null,
  (dispatch, props) => ({
    select: () => { dispatch(selectProduct(props.product.id)); },
    unselect: () => { dispatch(unselectProduct(props.product.id, props.product.rowId)); },
  }),
)(Product);
