import {
	convertFromBoardIndex,
	convertToBoardIndex,
	getListIndexByCoordinates
} from "../utils";

export type xAxis = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type yAxis = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface Figure {
	name: string,
	x: xAxis,
	y: yAxis,
	position: string,
	moveMade: boolean,
	color: "black" | "white",
	getPossibleMoves(gameMode: "black" | "white", board: Cell[]): {
		possibleMoves: Set<string>,
		possibleAttackMoves: Set<string>
	},
	changePosition(x: xAxis, y: yAxis): void,
	moveWasMade(): void
}

export abstract class BaseFigure implements Figure {
	name: string;
	x: xAxis;
	y: yAxis;
	position: string;
	moveMade: boolean;
	color: "black" | "white";
	moveDirections: Direction[];

	constructor(
		name: string,
		x: xAxis,
		y: yAxis,
		color: "black" | "white",
		moveDirection: Direction[]
	) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.color = color;
		this.moveMade = false;
		this.position = x + y;
		this.moveDirections = moveDirection
	}

	changePosition(x: xAxis, y: yAxis) {
		this.x = x;
		this.y = y;
		this.position = x + y;
	}

	moveWasMade() {
		this.moveMade = true;
	}

	getPossibleMoves(gameMode: "black" | "white", board: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.position, gameMode);
		const possibleMoves = new Set<string>();
		const possibleAttackMoves = new Set<string>();

		this.moveDirections.map(d => {
			let i = 1;
			while (true) {
				const index = getListIndexByCoordinates(x + d.dx * i, y + d.dy * i);
				const move = convertToBoardIndex(x + d.dx * i, y + d.dy * i, gameMode);

				if (index === -1) break;
				if (board[index].figure) {
					if (board[index].figure.color !== this.color)
						possibleAttackMoves.add(move);
					break;
				};
				possibleMoves.add(move);
				i++;
			}
		})

		return {
			possibleMoves,
			possibleAttackMoves
		};
	}
}

export interface Cell {
	position: string,
	color: string
	figure?: Figure
}

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
	king: Figure | undefined;
	attackLine: Set<string> | undefined;
}