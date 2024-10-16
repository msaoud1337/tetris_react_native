import { useCallback, useState } from 'react';
import { STAGE } from './useStage';
import { checkMove } from '@/utils/functions';
import { TETROMINOS } from '@/constants/setup';

export type PLAYER = {
	pos: {
		x: number;
		y: number;
	};
	tetromino: (string | number)[][];
	collided: boolean;
};

export const randomTetromino = () => {
	const tetrominos = [
		'I',
		'J',
		'L',
		'O',
		'S',
		'T',
		'Z',
		'U',
		'.',
		'7',
	] as (keyof typeof TETROMINOS)[];
	const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return TETROMINOS[randTetromino];
};

export const usePlayer = () => {
	const [player, setPlayer] = useState<PLAYER | undefined>(undefined);

	const updatePlayerPos = ({
		x,
		y,
		collided,
	}: {
		x: number;
		y: number;
		collided?: boolean;
	}): void => {
		setPlayer(
			(prev) =>
				prev && {
					...prev,
					pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
					collided: collided ? collided : prev.collided,
				},
		);
	};

	const rotate = (matrix: PLAYER['tetromino']) => {
		const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
		return mtrx.map((row) => row.reverse());
	};

	const playerRotate = (stage: STAGE): void => {
		if (!player) return;
		const clonedPlayer = { ...player };

		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino!);

		const posX = clonedPlayer.pos.x;
		let offset = 1;
		while (checkMove(clonedPlayer, stage, { dirX: 0, dirY: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if (offset > clonedPlayer.tetromino[0].length) {
				clonedPlayer.pos.x = posX;
				return;
			}
		}

		setPlayer(clonedPlayer);
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: 10 / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false,
		});
	}, []);

	return { player, setPlayer, resetPlayer, updatePlayerPos, playerRotate };
};
