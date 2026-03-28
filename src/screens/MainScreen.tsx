import { useTheme } from "../theme/themeContext";
import { Box, Button, Card, Container, LoadingText } from "../components";
import { useAuth } from "../features/auth";
import { useGameSocket } from "../features/socket/hooks/useGameSocket";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MainScreen = () => {
	const { theme, toggleTheme } = useTheme();
	const { logout } = useAuth();
	const {	
		connect,
		disconnect, 
		game, 
		connectionStatus 
	} = useGameSocket();
	const navigate = useNavigate();

	useEffect(() => {
		if (game?.gameId)
			navigate(`/online/game/${game.gameId}`);
	}, [game?.gameId, navigate]);

	const Navigation = () => 
		<Card
			height="80px"
			bgOpacity="40"
			padding={2}
			style={{
				borderRadius: "20px 20px 0px 0px"
			}}
		>
			<Box 
				flexDirection="row" 
				style={{ justifyContent: "space-between" }}
			>
				<Box 
					flexDirection="row"
					style={{ alignItems: "start" }} 
					gap={3}
				>
					<img 
						height="50px" 
						src={`logo-${theme}.svg`} 
					/>
					<img 
						height="60px" 
						src={`chess-naming-long-${theme}.png`} 
					/>
				</Box>
				<Box 
					flexDirection="row-reverse" 
					gap={1}
				>
					<Button 
						bgOpacity="90"
						style={{
							height: "50px", 
							width: "100px"
						}} 
						onClick={() => logout()}
					>
						LogOut
					</Button>
					<Button 
						bgOpacity="90"
						style={{
							height: "50px", 
							width: "50px", 
							borderRadius: "30px", 
							padding: "0"
						}} 
						onClick={() => toggleTheme()}
					>
						<img src="moon.svg" height="25px" />
					</Button>
				</Box>
			</Box>
		</Card>

	const MenuButton = (
		{ icon, title, description, onClick}:
		{
			icon: string;
			title: string;
			description: string;
			onClick?: () => void;
		}
	) =>
		<Button 
			padding={6} 
			bgOpacity="80"
			onClick={onClick}
		>
			<Box 
				flexDirection="row" 
				gap={3} 
				style={{ 
					textAlign: "left", 
					margin: "auto" 
				}}>
				<Box width="20%">
					<img src={icon} style={{ height: "50px", width: "50px"}} />
				</Box>
				<Box gap={0.5}>
					<p style={{
						fontSize: "25px", 
						margin: 0, 
						fontWeight: "600"
					}}>
						{title}
					</p>
					<p style={{ margin: 0 }}>
						{description}
					</p>
				</Box>
			</Box>
		</Button>

	const Menu = () => 
		<Card>
			<Navigation />
			<Box padding={4}>
				<Box flexDirection="row" >
					<Card
						gap={2} 
						padding={4} 
						width="30%"
						bgOpacity="40"
					>
						<MenuButton 
							icon="online-icon.svg" 
							title="PLAY ONLINE" 
							description="Find a real opponent" 

							onClick={() => connect()}
						/>
						<MenuButton 
							icon="bot-icon.svg" 
							title="PLAY vs BOT" 
							description="Choose AI difficulty" 
						/>
					</Card>

					<Box width="70%">
						<img
							src="main-screen-image.png"
							alt="Main screen"
							style={{
								width: '100%',
								height: '100%',
								display: 'block'
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Card>

	const WaitingPanel = () => 
		<Card
				gap={5} 
				padding={2} 
				height="600px"
				maxWidth="400px"
				width="100%"
				bgOpacity="40"
			>
				<Box center>
					<LoadingText >
						Searching for an opponent
					</LoadingText>
					<Button 
						onClick={() => disconnect()} 
						style={{ marginTop: "20px" }}
					>
						Cancel
					</Button>
				</Box>
		</Card>

	return (	
		<Container padding={3} >
			{connectionStatus == "waiting" 
				? <WaitingPanel />
				: <Menu />
			}
		</Container>
	)
}

export default MainScreen;