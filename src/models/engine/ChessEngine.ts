import { 
	Cell, 
	Check, 
	Figure, 
	Move, 
	Promotion, 
	xAxis, 
	yAxis 
} from "..";
import { isKingSafeAtPosition } from "../../logic/kingLogic";
import { 
	convertFromBoardIndex, 
	getBoardListIndex, 
	stringSetIntersection 
} from "../../utils";
import { getAttack } from "../../utils/getLineAttack";
import { initBoard, getInitKingPositions } from "../../utils/initBoard";
import { Bishop } from "../figures/Bishop";
import { Knight } from "../figures/Knight";
import { Queen } from "../figures/Queen";
import { Rook } from "../figures/Rook";

export class ChessEngine {
	private gameMode: 'white' | 'black';
	private board: Cell[];
	private blackKing: Figure;
	private whiteKing: Figure;
	private check: Check | null = null;
	private promotion: Promotion | null = null;

	constructor(gameMode: 'white' | 'black') {
		const kings = getInitKingPositions();
		this.board = initBoard(gameMode);
		this.gameMode = gameMode;
		this.blackKing = kings.black;
		this.whiteKing = kings.white;
	}

	getPromotionStatus = () => {
		return this.promotion ? true : false;
	}

	getBoard = () => {
		return this.board;
	}

	getPossibleMoves = (figure: Figure) => {
		if (this.promotion) return {
			possibleMoves: new Set<string>(),
			possibleAttackMoves: new Set<string>()
		};

		if (this.check) {
			if (figure == this.check?.king)
				return this.check.king.getPossibleMoves(this.gameMode, this.board);

			if (figure.color !== this.check?.king?.color)
				return figure.getPossibleMoves(this.gameMode, this.board);

			const attackLine = this.check?.attackLine;

			const { possibleMoves, possibleAttackMoves } = figure.getPossibleMoves(
				this.gameMode,
				this.board
			);

			if (attackLine)
				return {
					possibleMoves: stringSetIntersection(
						attackLine,
						possibleMoves
					),
					possibleAttackMoves: stringSetIntersection(
						attackLine,
						possibleAttackMoves
					),
				}
		}

		return figure.getPossibleMoves(this.gameMode, this.board);
	}

	makeMove = (move: Move) => {
		if (this.isPromotion(move)) {
			this.promotion = {
				position: move.to,
				color: move.figure.color
			};
		}

		if (this.isCastle(move)) this.makeCastle(move);
		else this.makeStandartMove(move);
		this.trackKing(move);

		const king = move.figure.color === "white" 
			? this.blackKing 
			: this.whiteKing;
		this.trackCheck(king);
	}

	makePromotion = (figureName: string) => {
		if (!this.promotion) return;

		const cellIndex = getBoardListIndex(this.promotion.position, this.gameMode);
		const figure = this.createPromotionFigure(figureName);

		this.board[cellIndex].figure = figure;
		this.promotion = null;
	}

	private createPromotionFigure = (figureName: string) => {
		if (!this.promotion) return;
		switch (figureName) {
			case "queen": {
				return new Queen(
					this.promotion.position[0] as xAxis, 
					this.promotion.position[1] as yAxis, 
					this.promotion.color);
			}
			case "bishop": {
				return new Bishop(
					this.promotion.position[0] as xAxis, 
					this.promotion.position[1] as yAxis, 
					this.promotion.color);
			}
			case "rook": {
				return new Rook(
					this.promotion.position[0] as xAxis, 
					this.promotion.position[1] as yAxis, 
					this.promotion.color);
			}
			case "knight": {
				return new Knight(
					this.promotion.position[0] as xAxis, 
					this.promotion.position[1] as yAxis, 
					this.promotion.color);
			}
		}
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
			? new Set(["c1", "g1"])
			: new Set(["c8", "g8"]);
		if (castleTo.has(move.to)) return true;
		return false;
	}

	private isPromotion = (move: Move): boolean => {
		const endOfBoardRanks = move.figure.color === "white" ? "8" : "1";
		const isPawn = move.figure.name === "pawn";
		if (isPawn && move.to[1] === endOfBoardRanks) return true;
		return false;
	}

	private makeCastle = (kingMove: Move) => {
		const castleTo = kingMove.to;
		const whiteKing = kingMove.figure.color == "white";
		let rookMoveFrom = "";
		let rookMoveTo = "";
		if (whiteKing) {
			switch (castleTo) {
				case "c1": {
					rookMoveFrom = "a1";
					rookMoveTo = "d1";
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
				case "c8": {
					rookMoveFrom = "a8";
					rookMoveTo = "d8";
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
		const { figure } = move;
		figure.position = move.to;
		if (figure.name !== "king") return;
		if (figure.color === "white") this.whiteKing = figure;

		else this.blackKing = figure;
	}

	private trackCheck = (king: Figure) => {
		const { x, y } = convertFromBoardIndex(this.blackKing.position, this.gameMode);

		const kingUnderAttack = !isKingSafeAtPosition(
			this.gameMode,
			king.color,
			x,
			y,
			this.board
		);

		if (kingUnderAttack)
			this.check = {
				king: this.blackKing,
				attackLine: getAttack(
					this.blackKing.position,
					this.blackKing.color,
					this.board,
					this.gameMode
				)
			};

		else this.check = null;
	}
}