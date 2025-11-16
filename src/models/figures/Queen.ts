import { BaseFigure, xAxis, yAxis } from "..";
import { lineAndDiagonalDirections } from "../../constants";

export class Queen extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("queen", x, y, color, lineAndDiagonalDirections)
	}
}