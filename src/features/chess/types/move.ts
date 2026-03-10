import { Figure } from ".";

export interface Move {
	from: string,
	to: string,
	figure: Figure
}

export interface Direction {
	dx: number;
	dy: number;
}

export interface Check {
	king: Figure;
	attackLine: Set<string>;
}

export interface Promotion {
	position: string;
	color: "white" | "black";
}