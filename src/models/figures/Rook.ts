import { BaseFigure, xAxis, yAxis } from "..";
import { lineDirections } from "../../constants";

export class Rook extends BaseFigure {
	constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
		super("rook", x, y, color, lineDirections)
	}
}