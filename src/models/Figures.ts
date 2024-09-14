/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Cell, Figure } from ".";
import { convertFromBoardIndex, convertToBoardIndex } from "../utils";

type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'
type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'

export class Pawn implements Figure {
  name = "pawn";
  x: xAxis;
  y: yAxis;
  color:  "black"|"white";
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    this.x = x;
    this.y = y;
    this.color = color;
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

  
  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }
}

export class Knight implements Figure {
  name = "knight";
  x: xAxis;
  y: yAxis;
  color:  "black"|"white";
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();
    
    const directions = [
      { dx: 1, dy: 2 },
      { dx: -1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: -2 },
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 }
    ];
  
    directions.map(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      if (!board?.find(cell=> cell.position == move)?.figure && move) possibleMoves.add(move);
    })
    return possibleMoves;
  }

  getAttackMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleAttackMoves = new Set<string>();
    
    const directions = [
      { dx: 1, dy: 2 },
      { dx: -1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: -2 },
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 }
    ];
  
    directions.map(d => {
      const move = convertToBoardIndex(x+d.dx, y+d.dy, gameMode);
      const figure = board?.find(cell=> cell.position == move)?.figure;
      if (figure && figure?.color !== this.color && move ) possibleAttackMoves.add(move);
    })
    return possibleAttackMoves;
  }

  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }
}

export class Bishop implements Figure {
  name = "bishop";
  x: xAxis;
  y: yAxis;
  color:  "black"|"white";

  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    const directions = [
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 }
    ];

    directions.map(d => {
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

    const directions = [
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 }
    ];

    directions.map(d => {
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

  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }
} 

export class Rook implements Figure {
  name = "rook";
  x: xAxis;
  y: yAxis;
  color:  "black"|"white";
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 }
    ];

    directions.map(d => {
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

    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 }
    ];

    directions.map(d => {
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

  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }
}

export class Queen implements Figure {
  name = "queen";
  x: xAxis;
  y: yAxis;
  color:  "black"|"white";
  constructor (x: xAxis, y: yAxis, color:  "black"|"white") {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  getPossibleMoves(gameMode:"white"|"black", board?: Cell[]) {
    const { x, y } = convertFromBoardIndex(this.x, this.y, gameMode);
    const possibleMoves = new Set<string>();

    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 }
    ];

    directions.map(d => {
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
    
    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
      { dx: 1, dy: -1 }
    ];

    directions.map(d => {
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

  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }
}


//export class King implements Figure {}