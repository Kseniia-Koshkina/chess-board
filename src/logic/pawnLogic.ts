import { Figure, Move } from "../models";


export const isPawnPromotion = (move: Move, moveFigure: Figure) => {
  if (moveFigure.name !== "pawn") return false;
  const opponentBackRank = moveFigure.color === "white" ? 
    new Set<string>(["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"]): 
    new Set<string>(["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]);
  if (move.to && opponentBackRank.has(move.to)) return true;
}

