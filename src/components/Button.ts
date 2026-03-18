import styled from "styled-components";

const SPACING_UNIT = 4;

interface ButtonProps {
  width?: string;
	height?: string;
  padding?: number | string;
  borderRadius?: string;
  bgColor?: string;
  fgColor?: string;
	bgOpacity?: string;
}

export const Button = styled.button.withConfig({
	shouldForwardProp: prop => ![
		'bgOpacity'
	].includes(prop)
})<ButtonProps>`
  width: ${props => props.width || "100%"};
	height: ${props => props.height || "auto"};
  padding: ${props =>
    typeof props.padding === "number"
      ? `${props.padding * SPACING_UNIT}px`
      : props.padding || "8px 16px"};
  border-radius: ${props => props.borderRadius || "20px"};
  border: none;

  background-color: ${props => (props.bgColor || props.theme.primary) + (props.bgOpacity || "")};
  color: ${props => props.fgColor || props.theme.bg};

  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;