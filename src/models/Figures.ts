/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BaseFigure, Cell, xAxis, yAxis } from ".";
import { diagonalDirections, knightDirections, lineAndDiagonalDirections, lineDirections } from "../constants";
import { castleMoves, isKingSafeAtPosition } from "../logic/kingLogic";
import { convertFromBoardIndex, convertToBoardIndex } from "../utils";

// needs to be updated
export class Pawn extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("pawn", x, y, color)
  }
  
  getPossibleMoves(gameMode:"white"|"black") {
    if (gameMode == this.color) {
      const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
      const possibleMoves = new Set<string>()
      possibleMoves.add(convertToBoardIndex(x, y-1, gameMode));
      if (y == 6) possibleMoves.add(convertToBoardIndex(x, y-2, gameMode));
      return possibleMoves;
    }
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>()
    possibleMoves.add(convertToBoardIndex(x, y+1, gameMode));
    if (y == 1) possibleMoves.add(convertToBoardIndex(x, y+2, gameMode));
    return possibleMoves;
  }

  getAttackMoves(gameMode:"white"|"black") {
    if (gameMode == this.color) {
      const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
      const possibleMoves = new Set<string>()
      possibleMoves.add(convertToBoardIndex(x-1, y-1, gameMode));
      possibleMoves.add(convertToBoardIndex(x+1, y-1, gameMode));
      return possibleMoves;
    }
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>()
    possibleMoves.add(convertToBoardIndex(x+1, y+1, gameMode));
    possibleMoves.add(convertToBoardIndex(x-1, y+1, gameMode));
    return possibleMoves;
  }
}

export class Knight extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("knight", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();
  
    knightDirections.map(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      if (!board?.find(cell=> cell.position == move)?.figure && move) possibleMoves.add(move);
    })
    return possibleMoves;
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();
  
    knightDirections.map(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      const figure = board?.find(cell=> cell.position == move)?.figure;
      if (figure && figure?.color !== this.color && move ) possibleAttackMoves.add(move);
    })
    return possibleAttackMoves;
  }
}

export class Bishop extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("bishop", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    diagonalDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode) && board && !board.find(cell=>cell.position == convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode))?.figure ) {
        const diagonalMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        if (diagonalMove) possibleMoves.add(diagonalMove);
        i++;
      }
    })
    return possibleMoves
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();

    diagonalDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
        const diagonalMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        const figure = board?.find(cell=> cell.position == diagonalMove)?.figure;
        if (figure && diagonalMove) {
          if (figure?.color !== this.color) possibleAttackMoves.add(diagonalMove);
          break
        }
        i++;
      }
    })
    return possibleAttackMoves;
  }
} 

export class Rook extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("rook", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    lineDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode) && board && !board.find(cell=>cell.position == convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode))?.figure ) {
        const diagonalMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        if (diagonalMove) possibleMoves.add(diagonalMove);
        i++;
      }
    })
    return possibleMoves
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();

    lineDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
        const lineMove = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        const figure = board?.find(cell=> cell.position == lineMove)?.figure;
        if (figure && lineMove) {
          if (figure?.color !== this.color) possibleAttackMoves.add(lineMove);
          break
        }
        i++;
      }
    })
    return possibleAttackMoves;
  }
}

export class Queen extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("queen", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    lineAndDiagonalDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode) && board && !board.find(cell=>cell.position == convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode))?.figure ) {
        const move = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        if (move) possibleMoves.add(move);
        i++;
      }
    })

    return possibleMoves;
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();

    lineAndDiagonalDirections.map(d => {
      let i = 1;
      while (convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode)) {
        const move = convertToBoardIndex(x+d.dx*i, y+d.dy*i, gameMode);
        const figure = board?.find(cell=> cell.position == move)?.figure;
        if (figure && move) {
          if (figure?.color !== this.color) possibleAttackMoves.add(move);
          break
        }
        i++;
      }
    })

    return possibleAttackMoves;
  }
}

export class King extends BaseFigure {
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    super("king", x, y, color)
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMovesAndCatles = castleMoves(gameMode, this.moveMade, x, y, board)

    lineAndDiagonalDirections.map(d => {
      if (convertToBoardIndex(x+d.dx, y+d.dy, gameMode) && board && !board.find(cell => cell.position == convertToBoardIndex(x+d.dx, y+d.dy, gameMode))?.figure ) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
        if (move) {
          if (isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board)) {
            possibleMovesAndCatles.add(move);
          }
        }
      }
    });

    return possibleMovesAndCatles;
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const {x, y} = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();
    lineAndDiagonalDirections.map(d => {
      if (convertToBoardIndex(x+d.dx, y+d.dy, gameMode)) {
        const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
        const figure = board?.find(cell=> cell.position == move)?.figure;
        if (figure && move) {
          if (figure?.color !== this.color && 
            isKingSafeAtPosition(gameMode, this.color, x+d.dx, y+d.dy, board)) {
            possibleAttackMoves.add(move);
          }
        }
      }
    })

    return possibleAttackMoves;
  }
}