import MainScreen from "./screens/MainScreen";
import AuthScreen from "./screens/AuthScreen";
import GameScreen from "./screens/GameScreen";
import { useAuth } from "./features/auth";
import { 
	createBrowserRouter, 
	redirect, 
	RouterProvider 
} from "react-router";

const App = () => {
	const { token, getToken } = useAuth();

	const authLoader = async () => {
		if (token) return;

		const localToken = await getToken();

		if (!localToken)
			return redirect("/login");

		return null;
	};

	const router = createBrowserRouter([
		{ 
			path: "/", 
			loader: authLoader, 
			Component: MainScreen
		},
		{	
			path: "/login",	
			Component: AuthScreen
		},
		{ 
			path: "/online/game/:gameId", 
			Component: GameScreen 
		}
	]);

	return <RouterProvider router={router} />
}

export default App;