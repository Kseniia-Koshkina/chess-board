import { BaseFigure, Cell, xAxis, yAxis } from "..";
import { lineAndDiagonalDirections } from "../../constants";
import { castleMoves, isKingSafeAtPosition } from "../../logic/kingLogic";
import { convertFromBoardIndex, convertToBoardIndex, getListIndexByCoordinates } from "../../utils";

export class King extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("king", x, y, color, lineAndDiagonalDirections)
  }

  getPossibleMoves(gameMode:"white"|"black", board: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = castleMoves(gameMode, this.moveMade, x, y, board);
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
}