import { useEffect, useState } from 'react';
import { PLAYER } from './usePlayer';

export type STAGECELL = { value: number | string; isMerged: boolean };
export type STAGE = STAGECELL[][];

export const createStage = () =>
	Array.from(Array(20), () => Array(12).fill({ value: 0, isMerged: false }));

export const useStage = (player: PLAYER | undefined, resetPlayer: () => void) => {
	const [stage, setStage] = useState<STAGE>(createStage());

	useEffect(() => {
		if (!player?.pos) return;
		const updatedStage = (prevStage: STAGE) => {
			const newStage = prevStage.map((line) =>
				line.map((cell) => (!cell.isMerged ? { value: 0, isMerged: false } : cell)),
			);

			player?.tetromino.forEach((row, y) => {
				row.forEach((cell, x) => {
					if (cell !== 0) {
						if (
							newStage[y + player?.pos.y] &&
							newStage[y + player?.pos.y][x + player?.pos.x]
						) {
							newStage[y + player?.pos.y][x + player?.pos.x] = {
								value: cell,
								isMerged: player?.collided ? true : false,
							};
						}
					}
				});
			});

			if (player.collided) {
				resetPlayer();
				return newStage;
			}
			return newStage;
		};

		setStage((prevState) => updatedStage(prevState));
	}, [player?.collided, player?.pos?.x, player?.pos?.y, player?.tetromino]);

	return { stage };
};
