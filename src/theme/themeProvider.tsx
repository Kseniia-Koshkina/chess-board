import { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./themeContext";
import { GlobalStyles, ThemeName, themes } from "./theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const savedTheme = localStorage.getItem("theme") as ThemeName | null;
	const [currentTheme, setCurrentTheme] = useState<ThemeName>(savedTheme || "light");

	const toggleTheme = () => {
		const newTheme = currentTheme == "light" ? "dark" : "light";
		setCurrentTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	}

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
			<StyledThemeProvider theme={ themes[currentTheme] }>
				<GlobalStyles />
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}