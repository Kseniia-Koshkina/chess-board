import { useEffect, useState } from "react"
import "./styles/ChessBoardStyles.css"
import { Cell, Move, Figure } from "./models"
import { initBoard } from "./logic";
import { isCastleMove, makeCastle } from "./logic/kingLogic";
import { processMove } from "./logic/moveLogic";

const gameMode  = "white";

const ChessBoard = () => {
  const [board, setBoard] = useState<Cell[]>(initBoard(gameMode));
  const [move, setMove] = useState<Move>();
  const [moveFigure, setMoveFigure] = useState<Figure>(); 

  useEffect(()=>{
    updateBoard();
  }, [move]);

  const updateBoard = () => {
    if (move && move.to && move.from && moveFigure) {
      // needs to be moved to own function
      const copyBoard = isCastleMove(move, moveFigure) ? makeCastle(board, move, moveFigure, gameMode) : processMove(board, move, gameMode);
      setBoard(copyBoard);
      setMove({});
      setMoveFigure(undefined);
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
    <div className="board">
      {board.map(cell => {
        return (
          <ChessCell key={cell.position} cell={cell} makeMove={makeMove} move={move} moveFigure={moveFigure} board={board}/>
        )
      })}
    </div>
  )
}


const ChessCell = (props: {cell: Cell, makeMove: (cell: Cell) => void, move?: Move, moveFigure?: Figure, board: Cell[]}) => {
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