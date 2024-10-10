export type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'
export type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'

export interface Figure {
  name: string,
  x: xAxis,
  y: yAxis,
  moveMade: boolean,
  color: "black"|"white",
  getPossibleMoves(gameMode: "black"|"white", board: Cell[]): Set<string>,
  getAttackMoves(gameMode: "black"|"white", board?: Cell[]): Set<string>,
  changePosition(x: xAxis, y: yAxis): void,
  moveWasMade(): void
}

export abstract class BaseFigure implements Figure {
  name: string
  x: xAxis
  y: yAxis
  moveMade: boolean
  color: "black"|"white"

  constructor (name: string, x: xAxis, y: yAxis, color:  "black"|"white") {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.moveMade = false;
  }

  changePosition(x: xAxis, y: yAxis) {
    this.x = x;
    this.y = y;
  }

  moveWasMade() {
    this.moveMade = true;
  }

  abstract getPossibleMoves(gameMode: "black"|"white", board: Cell[]): Set<string>
  abstract getAttackMoves(gameMode: "black"|"white", board?: Cell[]): Set<string>
}

export interface Cell {
  position: string,
  color: string
  figure?: Figure
}

export interface Move {
  from?: string,
  to?: string
}

export interface Promotion {
  position?: string,
  figure?: Figure
}