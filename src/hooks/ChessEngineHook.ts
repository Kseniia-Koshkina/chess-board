import { useMemo, useState } from "react";
import { ChessEngine } from "../models/engine/ChessEngine";
import { Cell, Figure } from "../models";

const useChessEngine = (gameMode: "white"|"black") => {
	const engine = useMemo(() => new ChessEngine(gameMode), [gameMode]);
	const defaultSet = new Set<string>;

	const [board, setBoard] = useState<Cell[]>(engine.getBoard());
	const [selectedFigure, setSelectedFigure] = useState<Figure | undefined>();
	const [possibleMoves, setPossibleMoves] = useState<Set<string>>(defaultSet);
	const [possibleAttackMoves, setPossibleAttackMoves] = useState<Set<string>>(defaultSet);

	const handleInteraction = (cellPosition: string, figure?: Figure) => {
		if (!selectedFigure) {
			selectFigureToMove(figure);
			return;
		}

		if (figure) {
			if (possibleAttackMoves.has(figure.position)) 
				makeMove(selectedFigure, cellPosition);
			else 
				selectFigureToMove(figure);
			return;
		}

		if (possibleMoves.has(cellPosition)) {
			makeMove(selectedFigure, cellPosition);
			return;
		}

		cleanSelectedFigure();
	}

	const selectFigureToMove = (figure?: Figure) => {
		if (!figure) return;
		setSelectedFigure(figure);
		setPossibleMoves(engine.getPossibleMoves(figure));
		setPossibleAttackMoves(engine.getPossibleAttackMoves(figure));
	}

	const cleanSelectedFigure = () => {
		setPossibleMoves(defaultSet);
		setPossibleAttackMoves(defaultSet);
		setSelectedFigure(undefined);
	}

	const makeMove = (figure: Figure, cellPosition: string) => {
		if (!figure) return;

		const move = {
			figure: figure,
			from: figure.position,
			to: cellPosition
		};

		engine.makeMove(move);
		setBoard(engine.getBoard());
		cleanSelectedFigure();
	}

	return {
		board,
		possibleMoves,
		possibleAttackMoves,
		handleInteraction
	};
}

export default useChessEngine;