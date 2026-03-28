import { ConnectionsStatus, Game } from "./game";

export interface GameSocketContextType {
	connect: () => void;
	disconnect: () => void;
	sendMove: (move: string) => void;
	opponentMove?: string;
	game?: Game;
	connectionStatus?: ConnectionsStatus
}