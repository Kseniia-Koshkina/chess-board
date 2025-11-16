import { BaseFigure, xAxis, yAxis, Cell } from "..";
import { knightDirections } from "../../constants";
import { convertFromBoardIndex, convertToBoardIndex } from "../../utils";

export class Knight extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("knight", x, y, color)
	}

	getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleMoves = new Set<string>();
	
		knightDirections.map(d => {
			const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
			if (!board?.find(cell=> cell.position == move)?.figure && move) possibleMoves.add(move);
		})
		return possibleMoves;
	}

	getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleAttackMoves = new Set<string>();
	
		knightDirections.map(d => {
			const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
			const figure = board?.find(cell=> cell.position == move)?.figure;
			if (figure && figure?.color !== this.color && move ) possibleAttackMoves.add(move);
		})
		return possibleAttackMoves;
	}
}