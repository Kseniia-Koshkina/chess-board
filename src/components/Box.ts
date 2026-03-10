import styled from 'styled-components';

export const Box = styled.div<{
  width?: string;
  maxWidth?: string;
  padding?: number;
  margin?: number;
  display?: string;
  flexDirection?: 'row' | 'column';
  gap?: number;
  center?: boolean;
}>`
  width: ${props => props.width || '100%'};
  max-width: ${props => props.maxWidth || '100%'};
  padding: ${props => `${(props.padding || 0) * 8}px`};
  margin: ${props => `${(props.margin || 0) * 8}`};
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => props.flexDirection || 'column'};
  gap: ${props => `${(props.gap || 0) * 8}px`};
  box-sizing: border-box;

  ${props => props.center && `
    justify-content: center;
    align-items: center;
  `}
`;