import { useEffect } from "react";
import { Box } from "../components";
import { Board } from "../features/chess";
import { useGameSocket } from "../features/socket/hooks/useGameSocket";

const GameScreen = () => {
	const {
		connect, 
		sendMove, 
		opponentMove
	} = useGameSocket();

	useEffect(() => {
		connect("5");
	});

	return (
		<>
		<Box center>
			<Board sendMove={sendMove} />
		</Box>
		<h1> {opponentMove} </h1>
		</>
	)
}

export default GameScreen;