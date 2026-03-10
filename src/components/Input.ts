import styled from 'styled-components';

interface InputProps {
  width?: string;
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  bgColor?: string;
  fgColor?: string;
}

export const Input = styled.input<InputProps>`
  width: ${props => props.width || '100%'};
  padding: ${props => props.padding || '8px 12px'};
  border-radius: ${props => props.borderRadius || '5px'};
  border: 1px solid ${props => props.borderColor || props.theme.fg};
  background-color: ${props => props.bgColor || props.theme.bg};
  color: ${props => props.fgColor || props.theme.fg};
  font-size: 1rem;
	box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.fg};
    box-shadow: 0 0 0 2px rgba(0,0,0,0.1);
  }
`;