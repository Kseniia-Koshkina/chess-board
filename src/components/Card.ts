import styled from 'styled-components';
import { Box } from './Box';

interface CardProps {
  borderRadius?: string;
  bgColor?: string;
  fgColor?: string;
  shadow?: string;
	bgOpacity?: string;
}

export const Card = styled(Box).withConfig({
	shouldForwardProp: prop => ![
		'bgOpacity'
	].includes(prop)
})<CardProps>`
  border-radius: ${props => props.borderRadius || '20px'};
  background-color: ${props => (props.bgColor || props.theme.primary) + (props.bgOpacity || props.theme.mainOpacity)};

  color: ${props => props.fgColor || props.theme.fg};
  box-shadow: ${props => props.shadow || '0 2px 8px rgba(0,0,0,0.1)'};
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
	box-sizing: border-box;  
	margin: auto;

  &:hover {
    box-shadow: ${props => props.shadow || '0 4px 16px rgba(0,0,0,0.15)'};
  }
`;