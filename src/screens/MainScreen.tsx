import { Board } from "../features/chess";
import { useAuth } from "../features/auth";

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