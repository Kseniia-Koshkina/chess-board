import { BaseFigure, xAxis, yAxis, Cell } from "..";
import { lineAndDiagonalDirections } from "../../constants";
import { convertFromBoardIndex, convertToBoardIndex } from "../../utils";

export class Queen extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("queen", x, y, color)
	}

	getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleMoves = new Set<string>();

		lineAndDiagonalDirections.map(d => {
			let i = 1;
			while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode) && board && !board.find(cell=>cell.position == convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode))?.figure ) {
				const move = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
				if (move) possibleMoves.add(move);
				i++;
			}
		})

		return possibleMoves;
	}

	getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
		const possibleAttackMoves = new Set<string>();

		lineAndDiagonalDirections.map(d => {
			let i = 1;
			while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
				const move = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
				const figure = board?.find(cell=> cell.position == move)?.figure;
				if (figure && move) {
					if (figure?.color !== this.color) possibleAttackMoves.add(move);
					break
				}
				i++;
			}
		})

		return possibleAttackMoves;
	}
}