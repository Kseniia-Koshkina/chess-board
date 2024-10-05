import { Cell, Move } from "../models";
import { getBoardListIndex } from "../utils";

// need to rewrite
export const processMove = (board: Cell[], move: Move, gameMode: "white"|"black") => {
  const cellIndexFrom = getBoardListIndex(move.from, gameMode)
  const cellIndexTo = getBoardListIndex(move.to, gameMode)
  const figureToMove = board[cellIndexFrom].figure;
  figureToMove?.moveWasMade();
  figureToMove?.changePosition(move.to[0], move.to[1]);
  board[cellIndexTo].figure = figureToMove;
  board[cellIndexFrom].figure = undefined;
  return board;
}