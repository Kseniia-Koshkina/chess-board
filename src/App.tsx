import MainScreen from "./screens/MainScreen";
import AuthScreen from "./screens/AuthScreen";
import { useAuth } from "./features/auth";

const App = () => {
	const { token } = useAuth();

	if (!token) return <AuthScreen /> 
	return <MainScreen />
}

export default App;