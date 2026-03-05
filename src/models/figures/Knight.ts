import {
	BaseFigure,
	xAxis,
	yAxis,
	Cell
} from "..";
import { knightDirections } from "../../constants";
import {
	convertFromBoardIndex,
	convertToBoardIndex,
	getListIndexByCoordinates
} from "../../utils";

export class Knight extends BaseFigure {
	constructor(x: xAxis, y: yAxis, color: "black" | "white") {
		super("knight", "N", x, y, color, knightDirections)
	}

	getPossibleMoves(gameMode: "white" | "black", board: Cell[]) {
		if (this.getPinnedLine(gameMode, board)) return {
			possibleMoves: new Set<string>(),
			possibleAttackMoves: new Set<string>()
		};

		const { x, y } = convertFromBoardIndex(this.position, gameMode);
		const possibleMoves = new Set<string>();
		const possibleAttackMoves = new Set<string>();

		this.moveDirections.map(d => {
			const index = getListIndexByCoordinates(x + d.dx, y + d.dy);
			const move = convertToBoardIndex(x + d.dx, y + d.dy, gameMode);
			if (index !== -1 && !board[index].figure)
				possibleMoves.add(move);
			else possibleAttackMoves.add(move);
		})

		return {
			possibleMoves,
			possibleAttackMoves
		};
	}
}