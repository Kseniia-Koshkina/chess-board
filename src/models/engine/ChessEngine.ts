import { Cell, Figure, Move, xAxis, yAxis } from "..";
import { getBoardListIndex, initBoard } from "../../utils";

export class ChessEngine {
	private gameMode: 'white' | 'black';
	private board: Cell[];

	constructor(gameMode: 'white' | 'black') {
    this.board = initBoard(gameMode);
		this.gameMode = gameMode;
  }

	getBoard = () => {
		return this.board;
	}

	printBoard = () => {
		console.log(this.board);
	}

	getPossibleMoves = (figure: Figure) => {
		return figure.getPossibleMoves(this.gameMode, this.board);
	}

	getPossibleAttackMoves = (figure: Figure) => {
		return figure.getAttackMoves(this.gameMode, this.board);
	}

	makeMove = (move: Move) => {
		if (this.isCastle(move)) this.makeCastle(move);
		else this.makeStandartMove(move);
	}

	private makeStandartMove = (move: Move) => {
		const cellIndexFrom = getBoardListIndex(move.from, this.gameMode);
		const cellIndexTo = getBoardListIndex(move.to, this.gameMode);

		move.figure.moveWasMade();
		move.figure.changePosition(move.to[0] as xAxis, move.to[1] as yAxis);

		this.board[cellIndexTo].figure = move.figure;
    this.board[cellIndexFrom].figure = undefined;
	}

	isCastle = (move: Move): boolean => {
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
}