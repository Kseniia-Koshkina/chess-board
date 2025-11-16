import { Figure } from "../models";
import { King } from "../models/figures/King";
import { Pawn } from "../models/figures/Pawn";
import { Rook } from "../models/figures/Rook";

export const figures: Figure[] = [
	// new Rook("f", "6", "black"),
	new Rook("h", "8", "black"),
	new Rook("a", "8", "black"),
	// new Rook("b", "8", "black"),
	new King("e", "1", "white"),
	new King("e", "8", "black"),
	new Rook("a", "1","white"),
	new Rook("h", "1","white"),
	new Pawn("b", "7", "white"),
	new Pawn("g", "2", "black")
];