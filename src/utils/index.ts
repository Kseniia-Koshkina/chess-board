import { 
	xAxisBlack, 
	xAxisBlackConvert, 
	xAxisWhite, 
	xAxisWhiteConvert, 
	yAxisBlack, 
	yAxisBlackConvert, 
	yAxisWhite, 
	yAxisWhiteConvert 
} from "../constants";
import { figures } from "../constants/Figures";
import { Cell } from "../models";

type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h';
type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8';

export const convertFromBoardIndex = (x: xAxis, y: yAxis, gameMode: string) => {
  const xConvert = gameMode == "white" ? xAxisWhiteConvert : xAxisBlackConvert;
  const yConvert = gameMode == "white" ? yAxisWhiteConvert : yAxisBlackConvert;
  return {x: xConvert[x], y: yConvert[y]}
}

export const convertToBoardIndex = (x: number, y: number, gameMode: "black"|"white") => {
  const xAxis = gameMode == "black" ? xAxisBlack : xAxisWhite;
  const yAxis = gameMode == "black" ? yAxisBlack : yAxisWhite;
  if (xAxis[x] && yAxis[y]) return xAxis[x]+yAxis[y];
  return "";
}

export const getBoardListIndex = (position: string, gameMode: "black"|"white") => {
  const {x, y} = convertFromBoardIndex(position[0] as xAxis, position[1] as yAxis, gameMode);
  return getListIndexByCoordinates(x, y);
}

export const getListIndexByCoordinates = (x: number, y: number) => {
	if (x < 0 || x > 7 || y < 0 || y > 7) {
    return -1;
  }
	return x + y * 8;
}

export const initBoard = (gameMode: "white"|"black") => {
	const xAxis = gameMode == "black" ? xAxisBlack : xAxisWhite;
	const yAxis = gameMode == "black"? yAxisBlack : yAxisWhite;

	const cells: Cell[] = [];
	for (let i = 0; i < 8; i++) {
		for (let k = 0; k < 8; k++) {
			let color = "#F0DAB5";
			if (i%2==0 && k%2==0 || i%2!==0 && k%2!==0) {
				color = "#B58763";
			}
			const figureOnPosition = figures.find(figure => {
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