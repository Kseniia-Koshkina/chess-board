import { xAxisBlack, xAxisWhite, yAxisBlack, yAxisWhite } from "../constants";
import { Cell, Figure } from "../models";
import { King, Rook } from "../models/Figures";
import { convertFromBoardIndex } from "../utils";

const figure: Figure[] = [
  // new Rook("f", "6", "black"),
  new Rook("h", "8", "black"),
  new Rook("a", "8", "black"),
  new King("e", "1", "white"),
  new King("e", "8", "black"),
  new Rook("a", "1","white"),
  new Rook("h", "1","white"),
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