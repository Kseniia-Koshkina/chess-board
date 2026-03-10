import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./features/auth"
import App from "./App.tsx"
import "./styles/ChessBoardStyles.css"

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
)