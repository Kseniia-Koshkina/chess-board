import { getListIndexByCoordinates } from ".";
import { knightDirections, opponentPawnAttackDirections, yourPawnAttackDirections } from "../constants";
import { Cell, Direction } from "../models";

export const checkForLineAttacks = (
	lineDirections: Direction[],
	x: number,
	y: number,
	color: 'white' | 'black',
	possibleAttackFigures: string[],
	board: Cell[]
): boolean => {
	for (const d of lineDirections) {
		let i = 1;
		while (true) {
			const index = getListIndexByCoordinates(x + d.dx*i, y + d.dy*i);
			if (index === -1) break;
			if (board[index].figure) {
				if (board[index].figure.color !== color 
					&& possibleAttackFigures.includes(board[index].figure.name)
				)
					return true;
				break;
			};
			i++;
		}
	}

	return false;
}

export const checkForKnightAttack = (
	x: number, 
	y: number, 
	color: 'white'|'black', 
	board: Cell[]
): boolean => {
	for (const d of knightDirections) {
		const index = getListIndexByCoordinates(x+d.dx, y+d.dy);
		if (
			index !== -1 
			&& board[index]?.figure?.color !== color 
			&& board[index]?.figure?.name === "knight")
			return true;
	};

	return false;
}

export const checkForPawnAttack = (
	x: number,
	y: number,
	color: 'white'|'black',
	board: Cell[],
	gameMode: 'white'|'black'
) => {
	const pawnDirections = gameMode === color 
		? yourPawnAttackDirections 
		: opponentPawnAttackDirections;

	for (const d of pawnDirections) {
		const index = getListIndexByCoordinates(x+d.dx, y+d.dy);
		if (index !== -1 
			&& board[index].figure?.color !== color 
			&& board[index].figure?.name === "pawn") 
			return true;
		return false;
	}

	return false;
}