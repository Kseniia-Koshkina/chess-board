import useChessEngine from "../hooks/ChessEngineHook";
import { Cell } from "../models";
import BoardCell from "./BoardCell";

const gameMode = "white";

const Board = () => {
	const {
		board,
		possibleMoves,
		possibleAttackMoves,
		isPromotion,
		handleInteraction,
		makePromotion
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
			{isPromotion && 
				<div>
					<button onClick={() => makePromotion("queen")}>Queen</button>
					<button onClick={() => makePromotion("bishop")}>Bishop</button>
					<button onClick={() => makePromotion("rook")}>Rook</button>
					<button onClick={() => makePromotion("knight")}>Knight</button>
				</div>
			}
		</>
	)
}

export default Board;