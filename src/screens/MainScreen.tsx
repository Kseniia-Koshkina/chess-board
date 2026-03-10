import Board from "../features/chess/components/Board";
import { useAuth } from "../hooks/AuthHook";

const MainScreen = () => {
	const { token, logout } = useAuth();

	return (	
		<>
			{token?.access_token}
			<button>Online game</button>
			<button>Play with computer</button>
			<button onClick={() => logout()}>Logout</button>

			<Board />
		</>
	)
}

export default MainScreen;