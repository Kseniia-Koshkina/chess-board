import { useEffect, useState } from "react"
import "./styles/ChessBoardStyles.css"
import { convertFromBoardIndex } from "./utils"
import { Bishop, Knight, Pawn, Queen, Rook } from "./models/Figures"
import { xAxisBlack, xAxisWhite, yAxisBlack, yAxisWhite } from "./constants"
import { Cell, Move, Figure } from "./models"

const gameMode  = "white";
const xAxis = gameMode=="black" ? xAxisBlack : xAxisWhite;
const yAxis = gameMode=="black"? yAxisBlack : yAxisWhite;

const figure: Figure[] = [
  new Pawn("h", "2", "white"), 
  new Pawn("a", "7", "black"), 
  new Pawn("b", "7", "black"), 
  new Pawn("c", "7", "black"),
  new Pawn("d", "7", "black"),
  new Pawn("d", "7", "black"),
  new Pawn("e", "7", "black"),
  new Pawn("f", "7", "black"),
  new Pawn("g", "7", "black"),
  new Pawn("h", "7", "black"),
  new Knight("g", "1", "white"),
  new Bishop("e", "3", "white"),
  new Queen("d", "4", "white"),
  new Rook("c", "5", "white")
];



const ChessBoard = () => {
  const [board, setBoard] = useState<Cell[]>([]);
  const [move, setMove] = useState<Move>();
  const [moveFigure, setMoveFigure] = useState<Figure>();
  const [initState, setInitState] = useState(true); 


  useEffect(()=>{
    if (initState) setInitBoard()
    else if (move && move.to && move.from) updateBoard();
  }, [move]);

  const updateBoard = () => {
    const cellIndexFrom = board?.findIndex(cell => cell.position == move.from)||0;
    const cellIndexTo = board?.findIndex(cell => cell.position == move.to)||0;
    const figureToMove = board[cellIndexFrom].figure;
    const figureOnTheChosenCell = board[cellIndexTo].figure;
    const copyBoard = board;
    if (figureOnTheChosenCell && figureToMove) {
      if (figureOnTheChosenCell.color !== figureToMove?.color) {
        if(figureToMove?.getAttackMoves(gameMode, board).has(move.to)) {
          figureToMove?.changePosition(move.to[0], move.to[1]);
          copyBoard[cellIndexTo].figure = figureToMove;
          copyBoard[cellIndexFrom].figure = undefined;
        }
      }
    }

    if (!figureOnTheChosenCell && copyBoard && moveFigure?.getPossibleMoves(gameMode, board).has(move?.to) ) {
      figureToMove?.changePosition(move.to[0], move.to[1]);
      copyBoard[cellIndexTo].figure = figureToMove;
      copyBoard[cellIndexFrom].figure = undefined;
    }
    setBoard(copyBoard);
    setMove({})
  }

  const setInitBoard = () => {
    const cells: Cell[] = [];
    for (let i = 0; i < 8; i++){
      for (let k = 0; k < 8; k++){
        let color = "#EEEED2";
        if (i%2==0 && k%2==0 || i%2!==0 && k%2!==0) {
          color = "#769656";
        }
        const figureOnPosition = figure.find(figure => {
          const {x, y} = convertFromBoardIndex(figure.x, figure.y, gameMode);
          if (x == k && y == i) return figure;
        })
        cells.push({
          position: xAxis[k]+yAxis[i], 
          color: color,
          figure: figureOnPosition
        });
      }
    }
    setBoard(cells)
  }

  const makeMove = (cell: Cell) => {
    if (cell.figure && cell.figure?.color == moveFigure?.color || cell.figure && !move?.from) {
      setMove({from: cell.position});
      setMoveFigure(cell.figure);
    }
    else if (move?.from) {
      setMove((prevMove) => ({ ...prevMove, to: cell.position }));
      setInitState(false);
    }
  }

  return (
    <div className="board">
      {board.map(cell=>{
        return (
          <ChessCell cell={cell} makeMove={makeMove} move={move} moveFigure={moveFigure} board={board}/>
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