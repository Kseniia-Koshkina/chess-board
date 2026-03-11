import MainScreen from "./screens/MainScreen";
import AuthScreen from "./screens/AuthScreen";
import { useAuth } from "./features/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameScreen from "./screens/GameScreen";

const App = () => {
	const { token } = useAuth();	
	const router = createBrowserRouter([
		{ path: "/", Component: MainScreen },
		{ path: "/online/game/:gameId", Component: GameScreen }
	]);

	//change auth logic 
	if (!token) return <AuthScreen /> 
	return <RouterProvider router={router} />
}

export default App;