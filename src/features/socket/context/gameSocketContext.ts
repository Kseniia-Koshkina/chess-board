import { createContext } from "react";
import { GameSocketContextType } from "../types/socket";

const GameSocketContext = createContext<GameSocketContextType>({
	connect: () => {},
	sendMove: (move: string) => {}
});

export default GameSocketContext;