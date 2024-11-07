export const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080', '#00FFFF'];

export const TETROMINOS = {
	'0': { shape: [[0]], color: '0, 0, 0' },
	'.': {
		shape: [
			[0, '.'],
			[0, 0],
		],
		color: '#FF0000',
	},
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
		],
		color: '#00FF00',
	},
	U: {
		shape: [
			['U', 0, 'U'],
			['U', 'U', 'U'],
			[0, 0, 0],
		],
		color: '#60d1ef',
	},
	'7': {
		shape: [
			[0, '7', '7'],
			[0, 0, '7'],
			[0, 0, 0],
		],
		color: '#FFFF00',
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0],
		],
		color: '#FFA500',
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L'],
		],
		color: '#3763f4',
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O'],
		],
		color: '#f9e24c',
	},
	S: {
		shape: [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0],
		],
		color: '#FFA500',
	},
	T: {
		shape: [
			['T', 'T', 'T'],
			[0, 'T', 0],
			[0, 0, 0],
		],
		color: '#A020F0',
	},
	Z: {
		shape: [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0],
		],
		color: '#ea4c6c',
	},
};
