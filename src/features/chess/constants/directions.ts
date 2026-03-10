export const lineDirections = [
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 }
];

export const diagonalDirections = [
	{ dx: 1, dy: 1 },
	{ dx: -1, dy: 1 },
	{ dx: -1, dy: -1 },
	{ dx: 1, dy: -1 }
];

export const lineAndDiagonalDirections = [
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
	{ dx: 1, dy: 1 },
	{ dx: -1, dy: 1 },
	{ dx: -1, dy: -1 },
	{ dx: 1, dy: -1 }
];

export const knightDirections = [
	{ dx: 1, dy: 2 },
	{ dx: -1, dy: 2 },
	{ dx: 1, dy: -2 },
	{ dx: -1, dy: -2 },
	{ dx: 2, dy: 1 },
	{ dx: 2, dy: -1 },
	{ dx: -2, dy: 1 },
	{ dx: -2, dy: -1 }
];

export const yourPawnAttackDirections = [
	{ dx: -1, dy: -1 },
	{ dx: 1, dy: -1 }
];

export const opponentPawnAttackDirections = [
	{ dx: 1, dy: 1 },
	{ dx: -1, dy: 1 }
];

export const yourPawnDirection = { dx: 0, dy: -1 };
export const opponentPawnDirection = { dx: 0, dy: 1 };