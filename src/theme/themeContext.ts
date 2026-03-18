import { createContext, useContext } from "react";
import { ThemeName } from "./theme";

interface ThemeContextType {
	theme: ThemeName;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);