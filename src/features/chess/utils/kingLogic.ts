import {
	diagonalDirections,
	lineDirections
} from "../constants";
import { Cell, Figure } from "../types";
import { convertFromBoardIndex } from ".";
import { 
	checkForKnightAttack, 
	checkForLineAttacks, 
	checkForPawnAttack,
	canKnighProtectKing, 
	canPawnProtectKing, 
	canRookOrQueenProtectKing 
} from "../utils";

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

export const canProtectKing = (
	lineAttack: Set<string>,
	gameMode: "white" | "black",
	king: Figure,
	board: Cell[]
) => {
	const lineAttackArray = Array.from(lineAttack);

	for (const position of lineAttackArray) {
		const { x, y } = convertFromBoardIndex(position, gameMode);

		if (canPawnProtectKing(
			x,
			y,
			king.color,
			board,
			gameMode			
		)) return true;

		if (canRookOrQueenProtectKing(
			x,
			y,
			king.color,
			board		
		)) return true;

		if (canKnighProtectKing(
			x,
			y,
			king.color,
			board
		)) return true;

		if (canRookOrQueenProtectKing(
			x,
			y,
			king.color,
			board
		)) return true;
	}
}