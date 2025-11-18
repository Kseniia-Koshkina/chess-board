import { Cell, Figure, Move, xAxis, yAxis } from "..";
import { isKingSafeAtPosition } from "../../logic/kingLogic";
import { convertFromBoardIndex, getBoardListIndex} from "../../utils";
import { initBoard, getInitKingPositions } from "../../utils/initBoard";
import { King } from "../figures/King";

export class ChessEngine {
	private gameMode: 'white' | 'black';
	private board: Cell[];
	private blackKing: Figure;
	private whiteKing: Figure;

	constructor(gameMode: 'white' | 'black') {
		const kings = getInitKingPositions();
    this.board = initBoard(gameMode);
		this.gameMode = gameMode;
		this.blackKing = kings.black;
		this.whiteKing = kings.white;
  }

	getBoard = () => {
		return this.board;
	}

	printBoard = () => {
		console.log(this.board);
	}

	getPossibleMoves = (figure: Figure) => {
		if (this.isCheck())
			if (figure.name === "king") figure = figure.color === "white" ? this.whiteKing : this.blackKing;
		return figure.getPossibleMoves(this.gameMode, this.board);
	}

	makeMove = (move: Move) => {
		if (this.isCastle(move)) this.makeCastle(move);
		else this.makeStandartMove(move);
		this.trackKing(move);
	}

	private makeStandartMove = (move: Move) => {
		const cellIndexFrom = getBoardListIndex(move.from, this.gameMode);
		const cellIndexTo = getBoardListIndex(move.to, this.gameMode);

		move.figure.moveWasMade();
		move.figure.changePosition(move.to[0] as xAxis, move.to[1] as yAxis);

		this.board[cellIndexTo].figure = move.figure;
    this.board[cellIndexFrom].figure = undefined;
	}

	private isCastle = (move: Move): boolean => {
		if (move.figure.name !== 'king') return false;
		const castleTo = move.figure.color == "white" 
			? new Set(["b1", "g1"]) 
			: new Set(["b8", "g8"]);
		if (castleTo.has(move.to)) return true;
		return false;
	}

	private makeCastle = (kingMove: Move) => {
		const castleTo = kingMove.to;
		const whiteKing = kingMove.figure.color == "white";
		let rookMoveFrom = "";
		let rookMoveTo = "";
		if (whiteKing) {
			switch (castleTo) {
				case "b1": {
					rookMoveFrom = "a1";
					rookMoveTo = "c1";
					break
				}
				case "g1": {
					rookMoveFrom = "h1";
					rookMoveTo = "f1";
					break
				}
			}
		}
		else {
			switch (castleTo) {
				case "b8": {
					rookMoveFrom = "a8";
					rookMoveTo = "c8";
					break
				}
				case "g8": {
					rookMoveFrom = "h8";
					rookMoveTo = "f8";
					break
				}
			}
		}

		const cellIndexFrom = getBoardListIndex(rookMoveFrom, this.gameMode);
		const rook = this.board[cellIndexFrom].figure;

		if (!rook) return;

		const rookMove = {
			figure: rook,
			from: rookMoveFrom,
			to: rookMoveTo
		}

		this.makeStandartMove(kingMove);
		this.makeStandartMove(rookMove);
	}

	private trackKing = (move: Move) => {
		const {figure} = move;
		if (figure.name !== "king") return;
		if (figure.color === "white") this.whiteKing = {...figure, position: move.to};
		else this.blackKing = {...figure, position: move.to};
	}

	private isCheck = () => {
		const { x: blackX, y: blackY } = convertFromBoardIndex(this.blackKing.position, this.gameMode);
		const { x: whiteX, y: whiteY } = convertFromBoardIndex(this.whiteKing.position, this.gameMode);

		const blackKingSafe = isKingSafeAtPosition(
			this.gameMode,
			"black",
			blackX,
			blackY,
			this.board
		);

		const whiteKingSafe = isKingSafeAtPosition(
			this.gameMode,
			"white",
			whiteX,
			whiteY,
			this.board
		);

		if (!whiteKingSafe) (this.whiteKing as King).wasCheck();
		if (!blackKingSafe) (this.blackKing as King).wasCheck();

		return !whiteKingSafe && blackKingSafe;
	}
}