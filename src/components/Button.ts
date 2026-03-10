import styled from "styled-components";

const SPACING_UNIT = 4;

interface ButtonProps {
  width?: string;
  padding?: number | string;
  borderRadius?: string;
  bgColor?: string;
  fgColor?: string;
}

export const Button = styled.button<ButtonProps>`
  width: ${props => props.width || "auto"};
  padding: ${props =>
    typeof props.padding === "number"
      ? `${props.padding * SPACING_UNIT}px`
      : props.padding || "8px 16px"};
  border-radius: ${props => props.borderRadius || "6px"};
  border: none;

  background-color: ${props => props.bgColor || props.theme.primary};
  color: ${props => props.fgColor || props.theme.bg};

  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;

  &:hover {
    filter: brightness(0.9);
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;