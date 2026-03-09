import MainScreen from "./screens/MainScreen";
import AuthScreen from "./screens/AuthScreen";
import { useAuth } from "./hooks/AuthHook";

const App = () => {
	const { token } = useAuth();

	if (!token) return <AuthScreen /> 
	return <MainScreen />
}

export default App;