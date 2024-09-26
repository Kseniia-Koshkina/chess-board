import { diagonalDirections, lineDirections, xAxisBlack, xAxisWhite, yAxisBlack, yAxisWhite } from "../constants";
import { Cell, Figure } from "../models";
import { Bishop, King, Rook } from "../models/Figures";
import { convertFromBoardIndex, convertToBoardIndex } from "../utils";

const figure: Figure[] = [
  new Rook("f", "6", "black"),
  new Rook("g", "5", "black"),
  new King("h", "1", "white"),
  new Bishop("c", "7", "black")
];

export const initBoard = (gameMode: "white"|"black") => {
  const xAxis = gameMode == "black" ? xAxisBlack : xAxisWhite;
  const yAxis = gameMode == "black"? yAxisBlack : yAxisWhite;

  const cells: Cell[] = [];
  for (let i = 0; i < 8; i++){
    for (let k = 0; k < 8; k++){
      let color = "#EEEED2";
      if (i%2==0 && k%2==0 || i%2!==0 && k%2!==0) {
        color = "#769656";
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

  lineDirections.forEach(d => {
    let i = 1;
    while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
      const lineMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
      const figure = board?.find(cell=> cell.position == lineMove)?.figure;
      if (figure && lineMove) 
        if (figure?.color !== kingColor && ["rook", "queen"].includes(figure?.name)) {
          saveAtPosition = false;
          break;
        }
        else break;
      i++;
    }
  });

  diagonalDirections.forEach(d => {
    let i = 1;
    while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
      const lineMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
      const figure = board?.find(cell=> cell.position == lineMove)?.figure;
      if (figure && lineMove) 
        if (figure?.color !== kingColor && ["bishop", "queen"].includes(figure?.name)) {
          saveAtPosition = false;
          break;
        }
        else break;
      i++;
    }
  });

  return saveAtPosition;
}