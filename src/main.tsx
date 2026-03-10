import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./features/auth"
import App from "./App.tsx"
import "./styles/ChessBoardStyles.css"
import { ThemeProvider } from "styled-components"
import { lightTheme } from "./styles/theme.ts"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={lightTheme}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
)