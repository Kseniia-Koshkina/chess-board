import { diagonalDirections, knightDirections, lineDirections, opponentPawnAttackDirections, xAxisBlack, xAxisWhite, yAxisBlack, yAxisWhite, yourPawnAttackDirections } from "../constants";
import { Cell, Figure } from "../models";
import { King, Knight, Pawn, Rook } from "../models/Figures";
import { convertFromBoardIndex, convertToBoardIndex } from "../utils";

const figure: Figure[] = [
  // new Rook("f", "6", "black"),
  new Rook("g", "5", "black"),
  new King("h", "1", "white"),
  new King("e", "8", "black"),
  new Knight("c", "7", "black"),
  new Pawn("f", "3","black"),
  new Pawn("f", "6", "white")
];

export const initBoard = (gameMode: "white"|"black") => {
  const xAxis = gameMode == "black" ? xAxisBlack : xAxisWhite;
  const yAxis = gameMode == "black"? yAxisBlack : yAxisWhite;

  const cells: Cell[] = [];
  for (let i = 0; i < 8; i++){
    for (let k = 0; k < 8; k++){
      let color = "#F0DAB5";
      if (i%2==0 && k%2==0 || i%2!==0 && k%2!==0) {
        color = "#B58763";
      }
      const figureOnPosition = figure.find(figure => {
        const {x, y} = convertFromBoardIndex(figure.x, figure.y, gameMode);
        if (x == k && y == i) return figure;
      })
      cells.push({
        position: xAxis[k] + yAxis[i], 
        color: color,
        figure: figureOnPosition
      });
    }
  }
  return cells;
}

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