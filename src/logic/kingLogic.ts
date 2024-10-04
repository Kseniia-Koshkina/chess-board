import { diagonalDirections, knightDirections, lineDirections, opponentPawnAttackDirections, yourPawnAttackDirections } from "../constants";
import { Cell } from "../models";
import { convertToBoardIndex } from "../utils";


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