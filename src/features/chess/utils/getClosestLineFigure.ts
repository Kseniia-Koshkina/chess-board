import { getListIndexByCoordinates } from ".";
import { Cell, Direction } from "../types";

export const getClosestLineFigure = (
	x: number,
	y: number,
	d: Direction, 
	board: Cell[]
) => {
	let i = 1;

	while (true) {
		const index = getListIndexByCoordinates(x + d.dx * i, y + d.dy * i);
		if (index === -1) return;
		if (board[index].figure)
			return board[index].figure;
		i++;
	}
}