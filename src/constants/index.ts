export const xAxisBlack = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const xAxisWhite = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];

export const yAxisBlack = [1, 2, 3, 4, 5, 6, 7, 8];
export const yAxisWhite = [8, 7, 6, 5, 4, 3, 2, 1];

export const xAxisBlackConvert = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
export const xAxisWhiteConvert = { 'h': 0, 'g': 1, 'f': 2, 'e': 3, 'd': 4, 'c': 5, 'b': 6, 'a': 7 };

export const yAxisBlackConvert = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };
export const yAxisWhiteConvert = { '8': 0, '7': 1, '6': 2, '5': 3, '4': 4, '3': 5, '2': 6, '1': 7 };

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