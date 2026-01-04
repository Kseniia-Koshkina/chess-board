import { convertFromBoardIndex, convertToBoardIndex, getListIndexByCoordinates } from ".";
import { diagonalDirections, knightDirections, lineDirections, opponentPawnAttackDirections, yourPawnAttackDirections } from "../constants";
import { Direction, Cell } from "../models";

export const getAttack = (
	kingPosition: string,
	kingColor: 'white'|'black',
	board: Cell[],
	gameMode: 'white'|'black'
) => {
	const {x, y} = convertFromBoardIndex(kingPosition, gameMode);

	return (
		getBishopOrQueenAttack(x,y,kingColor,board,gameMode) ||
		getRookOrQueenAttack(x,y,kingColor,board,gameMode) || 
		getKnightAttack(x,y,kingColor, board) ||
		getPawnAttack(x, y, kingColor, board, gameMode)
	)
}

const getPawnAttack = (
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
			return new Set<string>(board[index].position);
	}
	return;
}

const getKnightAttack = (
	x: number,
	y: number,
	color: 'white'|'black', 
	board: Cell[]
) => {
	for (const d of knightDirections) {
		const index = getListIndexByCoordinates(x+d.dx, y+d.dy);
		if (
			index !== -1 
			&& board[index]?.figure?.color !== color 
			&& board[index]?.figure?.name === "knight")
			return new Set<string>(board[index].position);
	};
	return;
}

const getRookOrQueenAttack = (
	x: number,
	y: number,
	color: 'white'|'black',
	board: Cell[],
	gameMode: 'white'|'black'
) => {
	return getLineAttack(
		lineDirections,
		x,
		y,
		color,
		board,
		gameMode,
		["rook", "queen"]
	);
}

const getBishopOrQueenAttack = (
	x: number,
	y: number,
	color: 'white'|'black',
	board: Cell[],
	gameMode: 'white'|'black'
) => {
	return getLineAttack(
		diagonalDirections,
		x,
		y,
		color,
		board,
		gameMode,
		["bishop", "queen"]
	);
}

const getLineAttack = (
	lineDirections: Direction[],
	x: number,
	y: number,
	color: 'white' | 'black',
	board: Cell[],
	gameMode: 'white' | 'black',
	possibleAttackFigures: string[]
): Set<string> | undefined => {
	for (const d of lineDirections) {
		const lineAtack = new Set<string>();
		let i = 1;
		while (true) {
			const index = getListIndexByCoordinates(x + d.dx*i, y + d.dy*i);
			lineAtack.add(convertToBoardIndex(x + d.dx*i, y + d.dy*i, gameMode))
			if (index === -1) break;

			if (board[index].figure 
				&& board[index].figure.name !== "king") {
				if (board[index].figure.color !== color 
					&& possibleAttackFigures.includes(board[index].figure.name)
				)
					return lineAtack;
				break;
			};
			i++;
		}
	}
	return;
}
