import { createStage } from '@/components/stage/Stage';
import { useEffect, useState } from 'react';
import { PLAYER } from './usePlayer';

export type STAGECELL = { value: number | string; isClear: boolean };
export type STAGE = STAGECELL[][];

export const useStage = (player?: PLAYER) => {
	const [stage, setStage] = useState<STAGE>(createStage());

	useEffect(() => {
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
