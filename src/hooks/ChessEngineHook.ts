import { useMemo, useState } from "react";
import { ChessEngine } from "../models/engine/ChessEngine";
import { Cell, Figure, Move } from "../models";

const useChessEngine = (gameMode: "white"|"black") => {
	const engine = useMemo(() => new ChessEngine(gameMode), [gameMode]);
	const defaultSet = new Set<string>;

	const [board, setBoard] = useState<Cell[]>(engine.getBoard());
	const [move, setMove] = useState<Move>();
	const [possibleMoves, setPossibleMoves] = useState<Set<string>>(defaultSet);
	const [possibleAttackMoves, setPossibleAttackMoves] = useState<Set<string>>(defaultSet);

	const handleInteraction = (cellPosition: string, figure?: Figure) => {
		if (!move?.selectedFigure) {
			selectFigureToMove(figure);
			return;
		}

		if (figure) {
			if (possibleAttackMoves.has(figure.x + figure.y)) 
				makeMove(move, cellPosition)
			else 
				selectFigureToMove(figure);
			return;
		}

		if (possibleMoves.has(cellPosition)) {
			makeMove(move, cellPosition);
			return;
		}

		cleanMoveData();
	}

	const selectFigureToMove = (figure?: Figure) => {
		if (!figure) return;
		setMove({
			selectedFigure: figure, 
			from: figure.x + figure.y
		});
		setPossibleMoves(engine.getPossibleMoves(figure));
		setPossibleAttackMoves(engine.getPossibleAttackMoves(figure));
	}

	const cleanMoveData = () => {
		setPossibleMoves(defaultSet);
		setPossibleAttackMoves(defaultSet);
		setMove({});
	}

	const makeMove = (move: Move, cellPosition: string) => {
		engine.makeMove({
			...move, 
			to: cellPosition
		})
		setBoard(engine.getBoard())
		cleanMoveData();
	}

	return {
		board,
		possibleMoves,
		possibleAttackMoves,
		handleInteraction
	};
}

export default useChessEngine;