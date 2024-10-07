export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const TETROMINOS = {
	'0': { shape: [[0]], color: '0, 0, 0' },
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
		],
		color: 'red',
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0],
		],
		color: 'red',
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L'],
		],
		color: 'red',
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O'],
		],
		color: 'red',
	},
	S: {
		shape: [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0],
		],
		color: 'red',
	},
	T: {
		shape: [
			[0, 0, 0],
			['T', 'T', 'T'],
			[0, 'T', 0],
		],
		color: 'red',
	},
	Z: {
		shape: [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0],
		],
		color: 'red',
	},
};
