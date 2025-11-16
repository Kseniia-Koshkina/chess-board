import { useEffect, useState } from "react"
import "./styles/ChessBoardStyles.css"
import { Cell, Move, Figure, Promotion, xAxis, yAxis } from "./models"
import { initBoard } from "./utils";
import { isCastleMove, makeCastle } from "./logic/kingLogic";
import { isPawnPromotion } from "./logic/pawnLogic";
import { getBoardListIndex } from "./utils";
import { Queen } from "./models/figures/Queen";

const gameMode  = "white";

const ChessBoard = () => {
  const [board, setBoard] = useState<Cell[]>(initBoard(gameMode));
  const [move, setMove] = useState<Move>();
  const [moveFigure, setMoveFigure] = useState<Figure>(); 
  const [pawnPromotion, setPawnPromotion] = useState<Promotion>();

  useEffect(()=> {
    updateBoard();
  }, [move, pawnPromotion?.figure]);

  const updateBoard = () => {
    if (move && move.to && move.from && moveFigure && !pawnPromotion?.figure) {
      // needs to be moved to own function
      if (isPawnPromotion(move, moveFigure)) {
        setPawnPromotion({position: move.to});
      }
      const copyBoard = isCastleMove(move, moveFigure) ? makeCastle(board, move, moveFigure, gameMode) : processMove(board, move, gameMode);
      setBoard(copyBoard);
      setMove({});
      setMoveFigure(undefined);
    }

    if (pawnPromotion?.figure && pawnPromotion.position) {
      //make promotion
      const copyBoard = board;
      copyBoard[getBoardListIndex(pawnPromotion.position, gameMode)].figure = pawnPromotion?.figure;
      setBoard(copyBoard);
      setPawnPromotion({})
    }
  }

  const makeMove = (cell: Cell) => {
    const sameColorFigureOrInitFigure = cell.figure?.color == moveFigure?.color || cell.figure && !move?.from
    if (sameColorFigureOrInitFigure) {
      setMove({from: cell.position});
      setMoveFigure(cell.figure);
    }

    else if (move?.from) {
      const emptyCell = !cell.figure;
      const figureDifferentColor = cell.figure?.color !== moveFigure?.color;
      const moveExists = moveFigure?.getPossibleMoves(gameMode, board).has(cell.position);
      const attackMoveExists = moveFigure?.getAttackMoves(gameMode, board).has(cell.position);

      if (emptyCell && moveExists) {
        setMove((prevMove) => ({ ...prevMove, to: cell.position }));
        return;
      }

      if (figureDifferentColor && attackMoveExists) {
        setMove((prevMove) => ({ ...prevMove, to: cell.position }));
        return;
      }

      if (emptyCell) {
        setMove({});
        setMoveFigure(undefined);
        return;
      }

      setMove({from: cell.position});
      setMoveFigure(cell.figure);
    }
  }

  return (
    <>
      <div className="board">
        {board.map(cell => {
          return (
            <ChessCell 
							key={cell.position} 
							cell={cell} 
							makeMove={makeMove} 
							move={move} 
							moveFigure={moveFigure} 
							board={board}
						/>
          )
        })}
      </div>
      <div>
        {/* {pawnPromotion?.position && <button onClick={()=> {
          const newP: Promotion = {
						position: pawnPromotion.position, 
						figure: new Queen(
							pawnPromotion?.position[0] as xAxis, 
							pawnPromotion?.position[1] as yAxis, 
							"white")
						}
          setPawnPromotion(newP)
        }}>{pawnPromotion?.position}</button>} */}
      </div>
    </>
  )
}


const ChessCell = (props: {
	cell: Cell, 
	makeMove: (cell: Cell) => void, 
	move?: Move, 
	moveFigure?: Figure, 
	board: Cell[]
}) => {
  let color = props.cell.color;
  if (props.move && props.moveFigure) {
    if (props.moveFigure?.getPossibleMoves(gameMode, props.board).has(props.cell.position)) color = "blue";
    if (props.moveFigure?.getAttackMoves(gameMode, props.board).has(props.cell.position) && props.cell.figure) color = "red"
  }

  return (
    <div className="cell" style={{backgroundColor: color}} onClick={()=>props.makeMove(props.cell)}> 
      {props.cell.position}
      {props.cell.figure ? <img src={props.cell.figure.color+props.cell.figure.name+".png"}></img> : <></>}
    </div>
  )
}

export default ChessBoard;