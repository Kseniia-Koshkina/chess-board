import { Game } from "./game";

export interface GameSocketContextType {
	connect: () => void;
	sendMove: (move: string) => void;
	opponentMove?: string;
	game?: Game;
}