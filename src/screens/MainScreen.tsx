import { Box, Button, Card } from "../components";
import { useAuth } from "../features/auth";

const MainScreen = () => {
	const { logout } = useAuth();

	return (	
		<>
			<Box flexDirection="row">
				<Card 
					gap={2} 
					padding={4} 
					width="30%"
				>
					<Button>Online Game</Button>
					<Button>Play Bots</Button>
					<Button onClick={() => logout()}>
						Logout
					</Button>
				</Card>
					<img
						src="main-screen-image.png"
						height={1000}
						width={"auto"}
						style={{ 
							objectFit: "cover", 
							display: "block" 
						}}
						alt="Main screen image"
					/>
			</Box>
		</>
	)
}

export default MainScreen;