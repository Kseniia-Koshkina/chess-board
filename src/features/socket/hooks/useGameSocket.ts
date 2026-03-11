import { useContext } from "react";
import gameSocketContext from "../context/gameSocketContext";

export const useGameSocket = () => useContext(gameSocketContext);