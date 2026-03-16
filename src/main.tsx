import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./features/auth"
import App from "./App.tsx"
import "./styles/ChessBoardStyles.css"
import { ThemeProvider } from "./theme/themeProvider.tsx"
import GameSocketProvider from "./features/socket/providers/gameSocketProvider.tsx"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<GameSocketProvider>
					<App />
				</GameSocketProvider>
			</AuthProvider>
		</ThemeProvider>
	</StrictMode>
)