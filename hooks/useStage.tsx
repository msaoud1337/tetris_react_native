import { useEffect, useState } from 'react';
import { PLAYER } from './usePlayer';

export type STAGECELL = { value: number | string; isClear: boolean };
export type STAGE = STAGECELL[][];

export const createStage = () =>
	Array.from(Array(20), () => Array(12).fill({ value: 0, isClear: true }));

export const useStage = (player?: PLAYER) => {
	const [stage, setStage] = useState<STAGE>(createStage());

	useEffect(() => {
		if (!player?.pos?.x) return;
		const updatedStage = (prevStage: STAGE) => {
			const newStage = prevStage.map((line) =>
				line.map((cell) => (cell.isClear ? { value: 0, isClear: true } : cell)),
			);

			player?.tetromino.forEach((row, y) => {
				row.forEach((cell, x) => {
					if (cell !== 0)
						newStage[y + player?.pos.y][x + player?.pos.x] = {
							value: cell,
							isClear: player?.collided ? true : false,
						};
				});
			});
			return newStage;
		};

		setStage((prevState) => updatedStage(prevState));
	}, [player?.collided, player?.pos?.x, player?.pos?.y, player?.tetromino]);

	return { stage, setStage };
};
