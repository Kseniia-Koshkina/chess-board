import styled from 'styled-components';

export const Box = styled.div.withConfig({
	shouldForwardProp: prop => ![
		'flexDirection',
		'center',
		'maxWidth',
		'maxHeight'
	].includes(prop)
})<{
  width?: string;
	maxHeight?: string;
	height?: string;
  maxWidth?: string;
  padding?: number;
  margin?: number;
  display?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse';
  gap?: number;
  center?: boolean;
}>`
  width: ${props => props.width || '100%'};
	max-width: ${props => props.maxWidth || '100%'};
	height: ${props => props.height || '100%'};
	max-height: ${props => props.maxHeight || '100%'};
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