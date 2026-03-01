import { getListIndexByCoordinates } from ".";
import { 
	diagonalDirections,
	knightDirections, 
	lineDirections, 
	opponentPawnAttackDirections, 
	yourPawnAttackDirections 
} from "../constants";
import { Cell, Direction } from "../models";


export const canRookOrQueenProtectKing = (
	x: number,
	y: number,
	color: 'white' | 'black',
	board: Cell[]
) => checkForLineProtection(
	lineDirections,
	x,
	y,
	color,
	["rook", "queen"],
	board
);

export const canBishopOrQueenProtectKing = (
	x: number,
	y: number,
	color: 'white' | 'black',
	board: Cell[]
) => checkForLineProtection(
	diagonalDirections,
	x,
	y,
	color,
	["bishop", "queen"],
	board
);

const checkForLineProtection = (
	lineDirections: Direction[],
	x: number,
	y: number,
	color: 'white' | 'black',
	possibleProtectFigures: string[],
	board: Cell[]
): boolean => {
	for (const d of lineDirections) {
		let i = 1;
		while (true) {
			const index = getListIndexByCoordinates(x + d.dx * i, y + d.dy * i);
			if (index === -1) break;
			if (board[index].figure
				&& board[index].figure.name !== "king") {
				if (board[index].figure.color === color
					&& possibleProtectFigures.includes(board[index].figure.name)
				)
					return true;
				break;
			};
			i++;
		}
	}

	return false;
}

export const canKnighProtectKing = (
	x: number,
	y: number,
	color: 'white' | 'black',
	board: Cell[]
): boolean => {
	for (const d of knightDirections) {
		const index = getListIndexByCoordinates(x + d.dx, y + d.dy);
		if (
			index !== -1
			&& board[index]?.figure?.color === color
			&& board[index]?.figure?.name === "knight")
			return true;
	};

	return false;
}

export const canPawnProtectKing = (
	x: number,
	y: number,
	color: 'white' | 'black',
	board: Cell[],
	gameMode: 'white' | 'black'
) => {
	const pawnDirections = gameMode === color
		? yourPawnAttackDirections
		: opponentPawnAttackDirections;

	for (const d of pawnDirections) {
		const index = getListIndexByCoordinates(x + d.dx, y + d.dy);
		if (index !== -1
			&& board[index].figure?.color === color
			&& board[index].figure?.name === "pawn")
			return true;
		return false;
	}

	return false;
}