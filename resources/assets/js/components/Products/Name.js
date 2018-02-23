import styled from 'styled-components';
import colors from 'utils/styles/color';

const Name = styled.div`
  background-color: rgb(0,0,0,0.5);
  bottom: 0;
  font-weight: bold;
  color: ${colors.white};
  padding: 20px;
  position: absolute;
  text-align: right;
  text-transform: uppercase;
  width: 100%;
`;

export default Name;
