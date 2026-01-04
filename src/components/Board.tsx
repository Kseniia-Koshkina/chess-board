import useChessEngine from "../hooks/ChessEngineHook";
import { Cell } from "../models";
import BoardCell from "./BoardCell";

const gameMode = "white";

const Board = () => {
	const {
		board,
		possibleMoves,
		possibleAttackMoves,
		handleInteraction
	} = useChessEngine(gameMode);

	return (
		<>
			<div className="board">
				{board.map((cell: Cell) => {
					return (
						<BoardCell
							key={cell.position}
							cell={cell}
							possibleMoves={possibleMoves}
							possibleAttackMoves={possibleAttackMoves}
							handleInteraction={handleInteraction}
						/>
					)
				})}
			</div>
		</>
	)
}

export default Board;