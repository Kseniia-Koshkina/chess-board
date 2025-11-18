import { 
	BaseFigure, 
	Cell, 
	xAxis, 
	yAxis,
	Figure
} from "..";
import { lineAndDiagonalDirections } from "../../constants";
import { isKingSafeAtPosition } from "../../logic/kingLogic";
import { 
	convertFromBoardIndex, 
	convertToBoardIndex, 
	getListIndexByCoordinates 
} from "../../utils";

export class King extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("king", x, y, color, lineAndDiagonalDirections)
  }
	private wasUnderAttack = false;

  getPossibleMoves(gameMode:"white"|"black", board: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.position, gameMode);
    const possibleMoves = this.getCastleMoves(gameMode, board);

		const possibleAttackMoves = new Set<string>();

    this.moveDirections.map(d => {
			const index = getListIndexByCoordinates(x+d.dx, y+d.dy);
      if (index !== -1) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
				const kingSafeAtPosition = isKingSafeAtPosition(
					gameMode, 
					this.color, 
					x+d.dx, 
					y+d.dy, 
					board
				);
				if (board[index].figure 
					&& board[index].figure.color !== this.color
					&& kingSafeAtPosition
				) 
					possibleAttackMoves.add(move);
        if (kingSafeAtPosition)
          possibleMoves.add(move);
      }
    });

    return {
			possibleMoves,
			possibleAttackMoves
		};
  }

	wasCheck = () => {
		if (this.wasUnderAttack) return;
		this.wasUnderAttack = true;
	}

	private getCastleMoves(
		gameMode: "white" | "black",
		board: Cell[]
	) {
		const { x, y } = convertFromBoardIndex(this.position, gameMode);
		const possiblCastles = new Set<string>();
		if (this.moveMade || this.wasUnderAttack) return possiblCastles;
		const indexForLongCastle = gameMode == "white" ? 7 : 0;
		const indexForShortCastle = gameMode == "white" ? 0 : 7;
		const index = gameMode == "white" ? 1 : -1;

		const boardIndexForLongCastle = getListIndexByCoordinates(indexForLongCastle, y);
		const boardIndexForShortCastle = getListIndexByCoordinates(indexForShortCastle, y);
		const rookForLongCastle = board[boardIndexForLongCastle].figure;
		const rookForShortCastle = board[boardIndexForShortCastle].figure;

		const canMakeLongCastle = this.canMakeCastleInDirection(
			x,
			y,
			board,
			gameMode,
			1,
			rookForLongCastle
		)

		const canMakeShortCastle = this.canMakeCastleInDirection(
			x,
			y,
			board,
			gameMode,
			-1,
			rookForShortCastle
		)


		if (canMakeLongCastle)
			possiblCastles.add(
				convertToBoardIndex(x + 2*index, y, gameMode)
			);

		if (canMakeShortCastle) 
			possiblCastles.add(
				convertToBoardIndex(x+2*-1*index, y, gameMode)
			);

		return possiblCastles;
	}

	private canMakeCastleInDirection = (
		x: number,
		y: number,
		board: Cell[],
		gameMode: 'white'|'black',
		direction: number,
		rook?: Figure,
	) => {
		if (!rook || rook.moveMade) return false;
		for (let i = 1; i <= 2; i++) {
			if (board[getListIndexByCoordinates(x + i * direction, y)].figure 
			|| !isKingSafeAtPosition(gameMode, this.color, x + i * direction, y, board))
				return false;
		}

		return true;
	}
}