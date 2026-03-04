import { Cell, Direction } from "../models";
import { getClosestLineFigure } from "../utils/getClosestLineFigure";

export const getPinnedAttackDirections = (
	x: number, 
	y: number,
	figureColor: 'white' | 'black',
	board: Cell[]
) => {
	const diagonalAttackDirections = checkDiagonals(x, y, figureColor, board);
	if (diagonalAttackDirections) 
		return diagonalAttackDirections;
	const lineAttackDirections = checkLines(x, y, figureColor, board);
	if (lineAttackDirections) 
		return lineAttackDirections;
}

const checkDiagonals = (
	x: number, 
	y: number, 
	figureColor: 'white' | 'black', 
	board: Cell[]
) => {
	const possibleAttackFigures = ["bishop", "queen"];
	const directionFromLeftToRight = [
		{ dx: 1, dy: -1 },
		{ dx: -1, dy: 1 }
	];

	const isLeftToRightDiagonalAttack = isLineUnderAttack(
		x,
		y,
		figureColor,
		directionFromLeftToRight,
		possibleAttackFigures,
		board
	);

	if (isLeftToRightDiagonalAttack) return directionFromLeftToRight;

	const directionFromRightToLeft = [
		{ dx: -1, dy: -1 },
		{ dx: 1, dy: 1 }
	];

	const isRightToLeftDiagonalAttack = isLineUnderAttack(
		x,
		y,
		figureColor,
		directionFromRightToLeft,
		possibleAttackFigures,
		board
	);

	if (isRightToLeftDiagonalAttack) return directionFromRightToLeft;
}

const checkLines = (
	x: number, 
	y: number, 
	figureColor: 'white' | 'black',	
	board: Cell[]
) => {
	const possibleAttackFigures = ["rook", "queen"];
	const horizontalAttackDirections = [
		{ dx: 1, dy: 0 },
		{ dx: -1, dy: 0 }
	];

	if (isLineUnderAttack(
		x,
		y,
		figureColor,
		horizontalAttackDirections,
		possibleAttackFigures,
		board
	)) return horizontalAttackDirections;

	const verticalAttackDirections = [
		{ dx: 0, dy: 1 },
		{ dx: 0, dy: -1 }
	];

	if (isLineUnderAttack(
		x,
		y,
		figureColor,
		verticalAttackDirections,
		possibleAttackFigures,
		board
	)) return verticalAttackDirections;
}

const isLineUnderAttack = (
	x: number, 
	y: number, 
	figureColor: 'white' | 'black',
	direction: Direction[],
	possibleAttackFigures: string[],
	board: Cell[]
) => {
		const figure1 = getClosestLineFigure(
			x,
			y,
			direction[0],
			board
		);

		const figure2 = getClosestLineFigure(
			x,
			y,
			direction[1],
			board
		);

		if (!figure1 || !figure2) return false;

		const figure1IsAttacking = possibleAttackFigures.includes(figure1.name) && figure1.color != figureColor;
		const figure2IsAttacking = possibleAttackFigures.includes(figure2.name) && figure2.color != figureColor;

		const figure1IsKing = figure1.name === "king" && figure1.color === figureColor;
		const figure2IsKing = figure2.name === "king" && figure2.color === figureColor;

		if (figure1IsAttacking && figure2IsKing || figure2IsAttacking && figure1IsKing) return true;

		return false;
}