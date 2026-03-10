import { Figure } from ".";

export type xAxis = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type yAxis = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

export interface Cell {
	position: string,
	color: string
	figure?: Figure
}