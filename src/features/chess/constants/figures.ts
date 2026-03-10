import { Figure } from "../types";
import { 
	Bishop,
	Rook,
	King,
	Pawn
} from "../pieces";

export const figures: Figure[] = [
	new Rook("h", "8", "black"),
	new Rook("a", "8", "black"),
	new King("e", "1", "white"),
	new King("e", "8", "black"),
	new Bishop("d", "8", "black"),
	new Rook("a", "1", "white"),
	new Rook("h", "1", "white"),
	new Pawn("b", "7", "white"),
	new Pawn("f", "2", "white")
];