import { Box } from "../components";
import { Board } from "../features/chess";
import { useGameSocket } from "../features/socket/hooks/useGameSocket";

const GameScreen = () => {
	const { 
		sendMove,
		game,
		opponentMove
	} = useGameSocket();

	return (
		<>
			<Box center >
				<Board 
					sendMove={sendMove} 
					gameMode={game?.color || "white"} 
				/> 
			
			</Box>
			<h2>Opponent Move: {opponentMove}</h2>
		</>
	)
}

export default GameScreen;