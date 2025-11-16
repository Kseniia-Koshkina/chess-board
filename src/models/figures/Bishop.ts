import { BaseFigure, xAxis, yAxis, Cell } from "..";
import { diagonalDirections } from "../../constants";
import { convertFromBoardIndex, convertToBoardIndex } from "../../utils";

export class Bishop extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("bishop", x, y, color)
	}

	getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleMoves = new Set<string>();

		diagonalDirections.map(d => {
			let i = 1;
			while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode) && board && !board.find(cell=>cell.position == convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode))?.figure ) {
				const diagonalMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
				if (diagonalMove) possibleMoves.add(diagonalMove);
				i++;
			}
		})
		return possibleMoves
	}

	getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleAttackMoves = new Set<string>();

		diagonalDirections.map(d => {
			let i = 1;
			while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
				const diagonalMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
				const figure = board?.find(cell=> cell.position == diagonalMove)?.figure;
				if (figure && diagonalMove) {
					if (figure?.color !== this.color) possibleAttackMoves.add(diagonalMove);
					break
				}
				i++;
			}
		})
		return possibleAttackMoves;
	}
} 