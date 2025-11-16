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
		if (!move.from || !move.to || !move.selectedFigure) return;

		const cellIndexFrom = getBoardListIndex(move.from, this.gameMode);
		const cellIndexTo = getBoardListIndex(move.to, this.gameMode);

		move.selectedFigure.moveWasMade();
		move.selectedFigure.changePosition(move.to[0] as xAxis, move.to[1] as yAxis);
		
		this.board[cellIndexTo].figure = move.selectedFigure;
    this.board[cellIndexFrom].figure = undefined;
	}
}