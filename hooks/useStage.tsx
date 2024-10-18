import { useEffect, useState } from 'react';
import { PLAYER } from './usePlayer';
import { useGame } from './useGame';

export type STAGECELL = { value: number | string; isMerged: boolean };
export type STAGE = STAGECELL[][];

export const createStage = () =>
	Array.from(Array(20), () => Array(10).fill({ value: 0, isMerged: false }));

export const useStage = (
	player: PLAYER | undefined,
	resetPlayer: () => void,
	isGameOver: boolean,
) => {
	const [stage, setStage] = useState<STAGE>(createStage());
	const { setIsRowCleared, tetrosList } = useGame();
	const [rowsCleared, setRowsCleared] = useState(0);

	const checkRows = (newStage: STAGE) => {
		let numberOfRowCleared = 0;
		newStage.forEach((row) => {
			if (row.every((cell) => cell.isMerged)) {
				const fulledRow = newStage.indexOf(row);
				newStage.splice(fulledRow, 1);
				numberOfRowCleared++;
				newStage.unshift(Array(10).fill({ value: 0, isMerged: false }));
			}
			return row;
		});
		return numberOfRowCleared;
	};

	useEffect(() => {
		setIsRowCleared(rowsCleared);
	}, [rowsCleared]);

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
				setRowsCleared((prev) => prev + checkRows(newStage));
				if (!isGameOver) {
					resetPlayer();
				}
			}
			return newStage;
		};

		setStage((prevState) => updatedStage(prevState));
	}, [
		player?.collided,
		player?.pos?.x,
		player?.pos?.y,
		player?.tetromino,
		isGameOver,
		tetrosList,
	]);

	return { stage };
};
