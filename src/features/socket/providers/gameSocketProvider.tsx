import { useState } from "react";
import GameSocketContext from "../context/gameSocketContext"

const ws = import.meta.env.VITE_WS_BASE_URL;

const GameSocketProvider = (
	{ children }: { children: React.ReactNode }
) => {
	const [gameSocket, setGameSocket] = useState<WebSocket>();
	const [opponentMove, setOpponentMove] = useState<string>();

	const connect = (gameId: string) => {
		if (gameSocket) return;

		const socket = new WebSocket(ws + `/ws/game/${gameId}`);

		socket.addEventListener("open", () => {
			console.log("logging: connected to the game server");
		});

		socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			setOpponentMove(data.move);
		});

		setGameSocket(socket);
	}

	const sendMove = (move: string) => {
		if (gameSocket) {
			gameSocket.send(
				JSON.stringify({ move: move })
			);
		}
	}

	return (
		<GameSocketContext.Provider 
			value={{ 
				connect, 
				sendMove, 
				opponentMove 
				}}
			>
			{children}
		</GameSocketContext.Provider>
	)
}

export default GameSocketProvider;