import { useAuth } from "../features/auth";
import { Button } from "../components/Button";
import { Box } from "../components/Box";
import { Card } from "../components/Card";

const MainScreen = () => {
	const { logout } = useAuth();

	return (	
		<>
			<Box flexDirection="row">
				<Card gap={2} padding={4}>
					<Button>Online Game</Button>
					<Button>Play Bots</Button>
					<Button onClick={() => logout()}>Logout</Button>
				</Card>
				<img src="main-screen-image.png"/>
			</Box>
		</>
	)
}

export default MainScreen;