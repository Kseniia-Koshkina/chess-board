export interface Game {
	color: "white" | "black";
	gameId: string;
}

export type ConnectionsStatus = "not connected" | "waiting" | "connected" | "reconnecting";