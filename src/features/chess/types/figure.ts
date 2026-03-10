import {
	convertFromBoardIndex,
	convertToBoardIndex,
	getListIndexByCoordinates,
	getPinnedAttackDirections
} from "../utils";
import {
	Cell,
	Direction,
	xAxis,
	yAxis,
} from ".";

export interface Figure {
	name: string,
	notation: string,
	x: xAxis,
	y: yAxis,
	position: string,
	moveMade: boolean,
	color: "black" | "white",
	getPossibleMoves(gameMode: "black" | "white", board: Cell[]): {
		possibleMoves: Set<string>,
		possibleAttackMoves: Set<string>
	},
	getPinnedLine(gameMode: "black" | "white", board: Cell[]): void,
	changePosition(x: xAxis, y: yAxis): void,
	moveWasMade(): void
}

export abstract class BaseFigure implements Figure {
	name: string;
	notation: string;
	x: xAxis;
	y: yAxis;
	position: string;
	moveMade: boolean;
	color: "black" | "white";
	moveDirections: Direction[];

	constructor(
		name: string,
		notation: string,
		x: xAxis,
		y: yAxis,
		color: "black" | "white",
		moveDirection: Direction[]
	) {
		this.name = name;
		this.notation = notation;
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

		const pinnedAttackLine = this.getPinnedLine(gameMode, board);

		const moveDirections = pinnedAttackLine 
			? this.moveDirections.filter(d => 
				pinnedAttackLine.some(pinnedDir => pinnedDir.dx === d.dx && pinnedDir.dy === d.dy)
			)
			: this.moveDirections;

		moveDirections.map(d => {
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

	getPinnedLine(
		gameMode: "black" | "white", 
		board: Cell[]) {
		const { x, y } = convertFromBoardIndex(this.position, gameMode);
		return getPinnedAttackDirections(
			x,
			y,
			this.color,
			board
		);
	}
}