import { 
	BaseFigure, 
	Cell, 
	Direction, 
	xAxis, 
	yAxis 
} from "..";
import { 
	opponentPawnAttackDirections, 
	opponentPawnDirection, 
	yourPawnAttackDirections, 
	yourPawnDirection
} from "../../constants";
import { 
	convertFromBoardIndex, 
	convertToBoardIndex, 
	getListIndexByCoordinates 
} from "../../utils";

export class Pawn extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("pawn", x, y, color, []);
	}

	getPossibleMoves(gameMode: "white"|"black", board: Cell[]) {
		const pawnAttackDirections = gameMode === this.color 
			? yourPawnAttackDirections 
			: opponentPawnAttackDirections;

		const pawnLongMoveDirection = gameMode === this.color ? -2 : 2;
		const pawnStartPosistion = gameMode === this.color ? 6 : 2;
		const pawnMoveDireation = gameMode === this.color 
			? yourPawnDirection
			: opponentPawnDirection

		const possibleAttackMoves = this.getAttackMoves(gameMode, board, pawnAttackDirections);
		const possibleMoves = new Set<string>();

		
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);

		possibleMoves.add(convertToBoardIndex(x, y + pawnMoveDireation.dy, gameMode));
		if (y == pawnStartPosistion) 
			possibleMoves.add(convertToBoardIndex(x, y + pawnLongMoveDirection, gameMode));

		return {
			possibleMoves,
			possibleAttackMoves
		};
	}

	private getAttackMoves(
		gameMode: "white"|"black", 
		board: Cell[], 
		attackDirection: Direction[]
	) {
		const possibleAttackMoves = new Set<string>();
		const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);

		attackDirection.map(d => {
			const index = getListIndexByCoordinates(x + d.dx, y + d.dy);
			const move = convertToBoardIndex(x + d.dx, y + d.dy, gameMode);
			if (
				index !== -1 
				&& board[index].figure 
				&& board[index].figure.color !== this.color) 
				possibleAttackMoves.add(move);
		});

		return possibleAttackMoves
	}
}
