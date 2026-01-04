import { Figure, Cell } from "../models";

interface Props {
	cell: Cell,
	possibleMoves: Set<string>,
	possibleAttackMoves: Set<string>,
	handleInteraction: (
		cellPosition: string,
		figure?: Figure
	) => void
}

const BoardCell = ({ cell, possibleMoves, possibleAttackMoves, handleInteraction }: Props) => {
	let color = cell.color;
	if (possibleMoves.has(cell.position))
		color = "blue";
	if (possibleAttackMoves.has(cell.position))
		color = "red";

	return (
		<div
			className="cell"
			style={{ backgroundColor: color }}
			onClick={() => handleInteraction(cell.position, cell.figure)}
		>
			{cell.position}
			{cell.figure
				? <img src={cell.figure.color + cell.figure.name + ".png"} />
				: <></>
			}
		</div>
	)
}

export default BoardCell;