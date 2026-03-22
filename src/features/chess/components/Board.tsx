import useChessEngine from "../hooks/useChessEngine";
import { Cell } from "../types";
import BoardCell from "./BoardCell";

const Board = (
	{
		sendMove,
		gameMode
	}: {
		sendMove: (move: string) => void
		gameMode: "white" | "black"
	}
) => {
	const {
		board,
		possibleMoves,
		possibleAttackMoves,
		isPromotion,
		handleInteraction,
		makePromotion
	} = useChessEngine(gameMode, sendMove);

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