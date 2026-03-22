export type GameStartMessage = {
  type: "game_start";
  gameId: string;
  payload: {
    color: "white" | "black";
		type: "online"
  };
};

export type MoveMessage = {
  type: "move";
  gameId: string;
  payload: {
		move: string;
  };
};

export type WaitingMessage = {
	type: "waiting"
}

export type WSMessage = MoveMessage | GameStartMessage | WaitingMessage;

export const messageMapper = (raw: any)
: WSMessage => {
  switch (raw.type) {
    case "game_start":
      return mapGameStartMessage(raw);
    case "move":
      return mapMoveMessage(raw);
		case "waiting":
			return {
				type: "waiting"
			}
    default:
      throw new Error("Unknown message type: " + raw.type);
  }
}


const mapGameStartMessage = (raw: any)
: GameStartMessage => {
  return {
    type: "game_start",
    gameId: raw.game_id,
    payload: { 
			color: raw.payload.color, 
			type: "online" 
		}
  }
}

const mapMoveMessage = (raw: any)
: MoveMessage => {
  return {
    type: "move",
    gameId: raw.game_id,
    payload: { move: raw.payload.move },
  }
}