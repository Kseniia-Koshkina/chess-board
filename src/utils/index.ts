import { xAxisBlack, xAxisBlackConvert, xAxisWhite, xAxisWhiteConvert, yAxisBlack, yAxisBlackConvert, yAxisWhite, yAxisWhiteConvert } from "../constants"

type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h';
type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8';

export const convertFromBoardIndex = (x: xAxis, y: yAxis, gameMode: string) => {
  const xConvert = gameMode == "white" ? xAxisWhiteConvert : xAxisBlackConvert;
  const yConvert = gameMode == "white" ? yAxisWhiteConvert : yAxisBlackConvert;
  return {x: xConvert[x], y: yConvert[y]}
}

export const convertToBoardIndex = (x: number, y: number, gameMode: "black"|"white") => {
  const xAxis = gameMode=="black" ? xAxisBlack : xAxisWhite;
  const yAxis = gameMode=="black" ? yAxisBlack : yAxisWhite;
  if (xAxis[x] && yAxis[y]) return xAxis[x]+yAxis[y];
  return;
}