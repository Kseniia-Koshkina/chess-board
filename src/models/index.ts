type xAxis = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'
type yAxis = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'

export interface Figure {
  name: string,
  x: xAxis,
  y: yAxis,
  color: "black"|"white",
  getPossibleMoves(gameMode: "black"|"white", board: Cell[]): Set<string>,
  getAttackMoves(gameMode: "black"|"white", board?: Cell[]): Set<string>,
  changePosition(x: xAxis, y: yAxis): void
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