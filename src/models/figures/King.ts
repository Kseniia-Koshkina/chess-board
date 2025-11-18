import { BaseFigure, Cell, xAxis, yAxis } from "..";
import { lineAndDiagonalDirections } from "../../constants";
import { isKingSafeAtPosition } from "../../logic/kingLogic";
import { convertFromBoardIndex, convertToBoardIndex, getListIndexByCoordinates } from "../../utils";

export class King extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("king", x, y, color, lineAndDiagonalDirections)
  }

  getPossibleMoves(gameMode:"white"|"black", board: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = this.getCastleMoves(gameMode, board);

		const possibleAttackMoves = new Set<string>();

    this.moveDirections.map(d => {
			const index = getListIndexByCoordinates(x+d.dx, y+d.dy);
      if (index !== -1) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
				if (board[index].figure 
					&& board[index].figure.color !== this.color) 
					possibleAttackMoves.add(move);
        if (isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board))
          possibleMoves.add(move);
      }
    });

    return {
			possibleMoves,
			possibleAttackMoves
		};
  }

	private getCastleMoves(
		gameMode: "white" | "black",
		board: Cell[]
	) {
		const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
		const possiblCastles = new Set<string>();
		if (this.moveMade) return possiblCastles;
		const indexForLongCastle = gameMode == "white" ? 7 : 0;
		const indexForShortCastle = gameMode == "white" ? 0 : 7;
		const index = gameMode == "white" ? 1 : -1;

		const boardIndexForLongCastle = getListIndexByCoordinates(indexForLongCastle, y);
		const boardIndexForShortCastle = getListIndexByCoordinates(indexForShortCastle, y);
		const rookForLongCastle = board ? board[boardIndexForLongCastle].figure : undefined;
		const rookForShortCastle = board ? board[boardIndexForShortCastle].figure : undefined;

		let left = x + 1;
		let right = x - 1;

		if (rookForLongCastle) {
			while (left <= 7) {
				if (left == 7) 
					possiblCastles.add(
						convertToBoardIndex(x + 3*index, y, gameMode)
					);
				if (board[getListIndexByCoordinates(left, y)].figure) 
					break
				left++
			}
		}

		if (rookForShortCastle) {
			while (right >= 0) {
				if (right == 0) 
					possiblCastles.add(
						convertToBoardIndex(x+2*-1*index, y, gameMode)
					);
				if (board[getListIndexByCoordinates(right, y)].figure) 
					break
				right--
			}
		}

		return possiblCastles
	}
}