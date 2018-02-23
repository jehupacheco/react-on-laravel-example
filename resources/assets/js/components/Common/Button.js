import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.color};
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  padding: 10px 15px;
`;

export default Button;
