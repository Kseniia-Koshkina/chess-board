import { createContext } from "react";
import { GameSocketContextType } from "../types/socket";

const GameSocketContext = createContext<GameSocketContextType>({
	connect: () => {},
	sendMove: () => {}
});

export default GameSocketContext;