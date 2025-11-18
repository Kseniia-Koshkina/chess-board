import { 
	diagonalDirections, 
	lineDirections 
} from "../constants";
import { Cell } from "../models";
import { checkForKnightAttack, checkForLineAttacks, checkForPawnAttack } from "../utils/checkForAttack";

export const isKingSafeAtPosition = (
  gameMode: "white" | "black",
  kingColor: "white" | "black",
  x: number,
  y: number,
  board: Cell[]
): boolean => {
  const rookOrQueenAttack = checkForLineAttacks(
		lineDirections,
		x,
		y,
		kingColor,
		["rook", "queen"],
		board
	);

	const bishopOrQueenAttack = checkForLineAttacks(
		diagonalDirections,
		x,
		y,
		kingColor,
		["bishop", "queen"],
		board
	);

	const knightAttack = checkForKnightAttack(
		x,
		y,
		kingColor,
		board
	)

	const pawnAttack = checkForPawnAttack(
		x, 
		y,
		kingColor,
		board,
		gameMode
	)

	if (rookOrQueenAttack || bishopOrQueenAttack || knightAttack || pawnAttack) return false;
  return true;
}