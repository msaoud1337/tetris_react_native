import { TETROMINOS } from '@/utils/setup';
import { useCallback, useState } from 'react';

export type PLAYER = {
	pos: {
		x: number;
		y: number;
	};
	tetromino: (string | number)[][];
	collided: boolean;
};

export const randomTetromino = () => {
	const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
	const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return TETROMINOS[randTetromino];
};

export const usePlayer = () => {
	const [player, setPlayer] = useState<PLAYER | undefined>(undefined);

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: 12 / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
		});
	}, []);

	return { player, setPlayer, resetPlayer };
};
