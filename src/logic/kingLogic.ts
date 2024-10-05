import { processMove } from "./moveLogic";
import { diagonalDirections, knightDirections, lineDirections, opponentPawnAttackDirections, yourPawnAttackDirections } from "../constants";
import { Cell, Figure, Move } from "../models";
import { convertToBoardIndex } from "../utils";

// need to rewrite
export const isKingSafeAtPosition = (
  gameMode: "white" | "black",
  kingColor: "white" | "black",
  x: number,
  y: number,
  board?: Cell[]
): boolean => {

  let saveAtPosition = true;
  // check for line attack
  lineDirections.forEach(d => {
    let i = 1;
    while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
      const lineMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
      const figure = board?.find(cell=> cell.position == lineMove)?.figure;
      if (figure && lineMove && figure.color !== kingColor) {
        if (i == 1 && figure.name === "king") {
          saveAtPosition = false;
          break;
        }
        if (["rook", "queen"].includes(figure.name)) {
          saveAtPosition = false;
          break;
        }
        else break;
      }
      i++;
    }
  });

  if (saveAtPosition) {
    // check for diagonal attack
    diagonalDirections.forEach(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
        const lineMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        const figure = board?.find(cell=> cell.position == lineMove)?.figure;
        if (figure && lineMove && figure.color !== kingColor) {
          if (i == 1 && figure.name === "king") {
            saveAtPosition = false;
            break;
          }
          if (["bishop", "queen"].includes(figure?.name)) {
            saveAtPosition = false;
            break;
          }
          else break;
        }
        i++;
      }
    });
  }

  if (saveAtPosition) {
    // check for a knight attack
    knightDirections.forEach(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      const figure = board?.find(cell=> cell.position == move)?.figure;
      if (figure && move && figure?.color !== kingColor && figure?.name === "knight") saveAtPosition = false;
    });
  }

  if (saveAtPosition) {
    // check for a pawn attack
    const pawnDirections = gameMode === kingColor ? yourPawnAttackDirections : opponentPawnAttackDirections
    pawnDirections.forEach(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      const figure = board?.find(cell=> cell.position == move)?.figure;
      if (figure && move && figure?.color !== kingColor && figure?.name === "pawn") saveAtPosition = false;
    });
  }

  return saveAtPosition;
}

export const castleMoves = (
  gameMode: "white" | "black",
  moveMade: boolean,
  x: number,
  y: number,
  board?: Cell[]
) => {
  const possiblCastles = new Set<string>();
  if (moveMade) return possiblCastles;
  const indexForLongCastle = gameMode == "white" ? 7 : 0;
  const indexForShortCastle = gameMode == "white" ? 0 : 7;
  const index = gameMode == "white" ? 1 : -1;

  const rookForLongCastle = board?.find(cell=> cell.position == convertToBoardIndex(indexForLongCastle, y, gameMode))?.figure;
  const rookForShortCastle = board?.find(cell=> cell.position == convertToBoardIndex(indexForShortCastle, y, gameMode))?.figure;
  
  let left = x+1;
  let right = x-1;
  if (rookForLongCastle) {
    while (left <= 7) {
      if (left == 7) possiblCastles.add(convertToBoardIndex(x+3*index, y, gameMode));
      if (board?.find(cell=> cell.position == convertToBoardIndex(left, y, gameMode))?.figure) break
      left++
    }
  }

  if (rookForShortCastle) {
    while (right >= 0) {
      if (right == 0) possiblCastles.add(convertToBoardIndex(x+2*-1*index, y, gameMode));
      if (board?.find(cell=> cell.position == convertToBoardIndex(right, y, gameMode))?.figure) break
      right--
    }
  }

  return possiblCastles
}

export const isCastleMove = (move: Move, figure: Figure) => {
  const castleFrom = figure.color == "white" ? "e1" : "e8";
  const castleTo = figure.color == "white" ? new Set(["b1", "g1"]) : new Set(["b8", "g8"]);
  const appropriateCastleMoveFrom = move.from == castleFrom;
  const appropriateCastleMoveTo = castleTo.has(move.to || "");
  if (figure.name == "king" && appropriateCastleMoveFrom && appropriateCastleMoveTo) return true
  return false;
}

export const makeCastle = (board: Cell[], kingMove: Move, figure: Figure) => {
  const castleTo = kingMove.to;
  const whiteKing = figure.color == "white";
  const rookMove: Move = {}; 
  if (whiteKing) {
    switch (castleTo) {
      case "b1": {
        rookMove.from = "a1";
        rookMove.to = "c1";
        break
      }
      case "g1": {
        rookMove.from = "h1";
        rookMove.to = "f1";
        break
      }
    }
  }
  if (!whiteKing) {
    switch (castleTo) {
      case "b8": {
        rookMove.from = "a8";
        rookMove.to = "c8";
        break
      }
      case "g8": {
        rookMove.from = "h8";
        rookMove.to = "f8";
        break
      }
    }
  }

  processMove(board, kingMove);
  processMove(board, rookMove);
  return board;
}