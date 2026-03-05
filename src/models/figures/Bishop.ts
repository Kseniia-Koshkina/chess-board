import { BaseFigure, xAxis, yAxis } from "..";
import { diagonalDirections } from "../../constants";

export class Bishop extends BaseFigure {
	constructor(x: xAxis, y: yAxis, color: "black" | "white") {
		super("bishop", "B", x, y, color, diagonalDirections)
	}
}