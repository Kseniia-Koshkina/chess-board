import { Cell, Move } from "../models";

// need to rewrite
export const processMove = (board: Cell[], move: Move) => {
  const cellIndexFrom = board?.findIndex(cell => cell.position == move?.from);
  const cellIndexTo = board?.findIndex(cell => cell.position == move?.to);
  const figureToMove = board[cellIndexFrom].figure;
  figureToMove?.moveWasMade();
  figureToMove?.changePosition(move.to[0], move.to[1]);
  board[cellIndexTo].figure = figureToMove;
  board[cellIndexFrom].figure = undefined;
  return board;
}

