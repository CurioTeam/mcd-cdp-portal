import styled from 'styled-components';
import { Box } from '@makerdao/ui-components-core';

const Button = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.1s ease 0s;
  cursor: pointer;
`;

const FilledButton = styled(Button)`
  background-color: ${props => props.theme.colors.darkPurple};
  color: #ffffff;
  font-weight: bold;

  :hover {
    background-color: #50445e;
  }
`;

export { FilledButton };
