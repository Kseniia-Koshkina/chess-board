import { useState } from "react";
import GameSocketContext from "../context/gameSocketContext"
import { Game } from "../types/game";
import { GameStartMessage, messageMapper, MoveMessage } from "../types/massage";

const ws = import.meta.env.VITE_WS_BASE_URL;

const GameSocketProvider = (
	{ children }: { children: React.ReactNode }
) => {
	const [game, setGame] = useState<Game>();
	const [gameSocket, setGameSocket] = useState<WebSocket>();
	const [opponentMove, setOpponentMove] = useState<string>("");

	const connect = () => {
		if (gameSocket) return;

		const socket = new WebSocket(ws + "/ws/online/game");

		socket.addEventListener("open", () => {
			console.log("logging: connected to the game server");
		});

		socket.addEventListener("message", (event) => {
			const raw = JSON.parse(event.data);
			const message = messageMapper(raw);
			const type = message.type;

			switch (type) {
				case "game_start":
					startGame(message)
					break;
				case "move": 
					receiveMove(message)
					break;
				case "waiting": 
					break;
			}
		});

		setGameSocket(socket);
	}

	const startGame = (message: GameStartMessage) => {
		const gameData = {
			color: message.payload.color,
			gameId: message.gameId
		}

		setGame(gameData);
	}

	const sendMove = (move: string) => {
		if (gameSocket && game) {
			console.log(" send move ", move)
			gameSocket.send(
				JSON.stringify({ 
					type: "move",
					game_id: game.gameId,
					payload: {
						move: move
					}
				})
			);
		}
	}

	const receiveMove = (message: MoveMessage) => {
		setOpponentMove(message.payload.move);
	}

	return (
		<GameSocketContext.Provider 
			value={{ 
				connect, 
				sendMove,
				opponentMove,
				game
			}}
		>
			{children}
		</GameSocketContext.Provider>
	)
}

export default GameSocketProvider;