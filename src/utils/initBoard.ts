import { convertFromBoardIndex } from ".";
import { 
	xAxisBlack, 
	xAxisWhite, 
	yAxisBlack, 
	yAxisWhite 
} from "../constants";
import { figures } from "../constants/Figures";
import { Cell, Figure } from "../models";

export const initBoard = (gameMode: "white" | "black") => {
	const xAxis = gameMode == "black" ? xAxisBlack : xAxisWhite;
	const yAxis = gameMode == "black" ? yAxisBlack : yAxisWhite;

	const cells: Cell[] = [];
	for (let i = 0; i < 8; i++) {
		for (let k = 0; k < 8; k++) {
			let color = "#F0DAB5";
			if (i % 2 == 0 && k % 2 == 0 || i % 2 !== 0 && k % 2 !== 0) {
				color = "#B58763";
			}
			const figureOnPosition = figures.find(figure => {
				const { x, y } = convertFromBoardIndex(figure.position, gameMode);
				if (x == k && y == i) return figure;
			});
			cells.push({
				position: xAxis[k] + yAxis[i],
				color: color,
				figure: figureOnPosition
			});
		}
	}
	return cells;
}

export const getInitKingPositions = () => {
	const kings = {
		white: {},
		black: {}
	};

	figures.map(figure => {
		if (figure.name === "king")
			if (figure.color === "white")
				kings.white = figure;
			else kings.black = figure;
	})

	return kings as { white: Figure; black: Figure };
}