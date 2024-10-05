import { Cell, Move, xAxis, yAxis } from "../models";
import { getBoardListIndex } from "../utils";

// need to rewrite
export const processMove = (board: Cell[], move: Move, gameMode: "white"|"black") => {
  if (move.to && move.from) {
    const cellIndexFrom = getBoardListIndex(move.from, gameMode)
    const cellIndexTo = getBoardListIndex(move.to, gameMode)
    const figureToMove = board[cellIndexFrom].figure;
    figureToMove?.moveWasMade();
    figureToMove?.changePosition(move.to[0] as xAxis, move.to[1] as yAxis);
    board[cellIndexTo].figure = figureToMove;
    board[cellIndexFrom].figure = undefined;
  }
  return board;
}