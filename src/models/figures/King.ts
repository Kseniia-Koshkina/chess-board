import { BaseFigure, Cell, xAxis, yAxis } from "..";
import { lineAndDiagonalDirections } from "../../constants";
import { castleMoves, isKingSafeAtPosition } from "../../logic/kingLogic";
import { convertFromBoardIndex, convertToBoardIndex } from "../../utils";

export class King extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("king", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMovesAndCatles = castleMoves(gameMode, this.moveMade, x, y, board)

    lineAndDiagonalDirections.map(d => {
      if (convertToBoardIndex(x+d.dx, y+d.dy, gameMode) && board && !board.find(cell => cell.position == convertToBoardIndex(x+d.dx, y+d.dy, gameMode))?.figure ) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
        if (move) {
          if (isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board)) {
            possibleMovesAndCatles.add(move);
          }
        }
      }
    });

    return possibleMovesAndCatles;
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();
    lineAndDiagonalDirections.map(d => {
      if (convertToBoardIndex(x+d.dx, y+d.dy, gameMode)) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
        const figure = board?.find(cell=> cell.position == move)?.figure;
        if (figure && move) {
          if (figure?.color !== this.color && 
            isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board)) {
            possibleAttackMoves.add(move);
          }
        }
      }
    })

    return possibleAttackMoves;
  }
}