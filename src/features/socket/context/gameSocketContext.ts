import { createContext } from "react";
import { GameSocketContextType } from "../types/socket";

const GameSocketContext = createContext<GameSocketContextType>({
	connect: () => {},
	disconnect: () => {},
	sendMove: (move: string) => {}
});

export default GameSocketContext;