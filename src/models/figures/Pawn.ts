import { BaseFigure, xAxis, yAxis } from "..";
import { convertFromBoardIndex, convertToBoardIndex } from "../../utils";

export class Pawn extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("pawn", x, y, color)
	}

	getPossibleMoves(gameMode:"white"|"black") {
		if (gameMode == this.color) {
			const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
			const possibleMoves = new Set<string>()
			possibleMoves.add(convertToBoardIndex(x, y-1, gameMode));
			if (y == 6) possibleMoves.add(convertToBoardIndex(x, y-2, gameMode));
			return possibleMoves;
		}
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleMoves = new Set<string>()
		possibleMoves.add(convertToBoardIndex(x, y+1, gameMode));
		if (y == 1) possibleMoves.add(convertToBoardIndex(x, y+2, gameMode));
		return possibleMoves;
	}

	getAttackMoves(gameMode:"white"|"black") {
		if (gameMode == this.color) {
			const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
			const possibleMoves = new Set<string>()
			possibleMoves.add(convertToBoardIndex(x-1, y-1, gameMode));
			possibleMoves.add(convertToBoardIndex(x+1, y-1, gameMode));
			return possibleMoves;
		}
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleMoves = new Set<string>()
		possibleMoves.add(convertToBoardIndex(x+1, y+1, gameMode));
		possibleMoves.add(convertToBoardIndex(x-1, y+1, gameMode));
		return possibleMoves;
	}
}
