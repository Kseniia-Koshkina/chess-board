import 'styled-components';

interface Theme {
    bg: string;
    fg: string;
    primary: string;
    secondary: string;
    inputBg: string;
    inputFg: string;
    borderColor: string;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}

export const lightTheme: Theme = {
  bg: '#ffffff',
  fg: '#000000',
  primary: '#4a90e2',
  secondary: '#f0f0f0',
  inputBg: '#ffffff',
  inputFg: '#000000',
  borderColor: '#cccccc',
};

export const darkTheme: Theme = {
  bg: '#1e1e1e',
  fg: '#ffffff',
  primary: '#4a90e2',
  secondary: '#333333',
  inputBg: '#2a2a2a',
  inputFg: '#ffffff',
  borderColor: '#555555',
};