import {
	diagonalDirections,
	lineDirections
} from "../constants";
import { Cell } from "../models";
import { 
	checkForKnightAttack, 
	checkForLineAttacks, 
	checkForPawnAttack 
} from "../utils/checkForAttack";

export const isKingSafeAtPosition = (
	gameMode: "white" | "black",
	kingColor: "white" | "black",
	x: number,
	y: number,
	board: Cell[]
): boolean => {
	if (
		checkForLineAttacks(
			lineDirections,
			x,
			y,
			kingColor,
			["rook", "queen"],
			board
		)
	) return false;

	if (
		checkForLineAttacks(
			diagonalDirections,
			x,
			y,
			kingColor,
			["bishop", "queen"],
			board
		)
	) return false;

	if (
		checkForKnightAttack(
			x,
			y,
			kingColor,
			board
		)
	) return false;

	if (
		checkForPawnAttack(
			x,
			y,
			kingColor,
			board,
			gameMode
		)
	) return false;

	return true;
}