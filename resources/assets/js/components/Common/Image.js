import styled from 'styled-components';

export default styled.img`
  display: block;
  max-width: 100%;
  ${props => props.width && `width: ${props.width}`}
`;
