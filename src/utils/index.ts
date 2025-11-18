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

type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h';
type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8';

export const convertFromBoardIndex = (position: string, gameMode: string) => {
	const x = position[0] as xAxis;
	const y = position[1] as yAxis;
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
  const {x, y} = convertFromBoardIndex(position, gameMode);
  return getListIndexByCoordinates(x, y);
}

export const getListIndexByCoordinates = (x: number, y: number) => {
	if (x < 0 || x > 7 || y < 0 || y > 7) {
    return -1;
  }
	return x + y * 8;
}

export const stringSetIntersection = (
	setA: Set<string>, 
	setB: Set<string>
): Set<string> => {
  const result = new Set<string>();
  for (const item of setA) {
    if (setB.has(item)) result.add(item);
	}

  return result;
}