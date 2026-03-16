import 'styled-components';
import { createGlobalStyle } from 'styled-components';

interface Theme {
	background: string;
	bg: string;
	fg: string;
	primary: string;
	mainOpacity: string;
}

export type ThemeName = "light" | "dark";

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.background};
    font-family: sans-serif;
  }
`

export const themes = {
	light: {
		background: '#ffffff',
		bg: '#ffffff',
		primary: '#0170DB',
		mainOpacity: '10'
	} as Theme,
	dark: {
		background: '#1e1e1e',
		bg: '#ffffff',
		primary: '#0170DB',
		mainOpacity: '10'
	} as Theme
}