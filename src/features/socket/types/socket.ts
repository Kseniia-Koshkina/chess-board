export interface GameSocketContextType {
	connect: (gameId: string) => void;
	sendMove: (move: string) => void;
	opponentMove?: string;
}