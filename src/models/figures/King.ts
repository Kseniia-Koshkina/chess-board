import { 
	BaseFigure, 
	Cell, 
	xAxis, 
	yAxis 
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
				const kingSafeAtPosition = isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board)
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

		let left = x + 1;
		let right = x - 1;

		if (rookForLongCastle && !rookForLongCastle.moveMade) {
			while (left <= 7) {
				if (left == 7) 
					possiblCastles.add(
						convertToBoardIndex(x + 3*index, y, gameMode)
					);
				if (board[getListIndexByCoordinates(left, y)].figure ||
					!isKingSafeAtPosition(gameMode, this.color, left, y, board)) 
					break
				left++
			}
		}

		if (rookForShortCastle && !rookForShortCastle.moveMade) {
			while (right >= 0) {
				if (right == 0) 
					possiblCastles.add(
						convertToBoardIndex(x+2*-1*index, y, gameMode)
					);
				if (board[getListIndexByCoordinates(right, y)].figure || 
					!isKingSafeAtPosition(gameMode, this.color, right, y, board)) 
					break
				right--
			}
		}

		return possiblCastles;
	}
}