import { TETROMINOS } from '@/constants/setup';
import { PLAYER } from '@/hooks/usePlayer';
import { STAGE } from '@/hooks/useStage';

export const checkMove = (
	player: PLAYER,
	stage: STAGE,
	{ dirX, dirY }: { dirX: number; dirY: number },
) => {
	for (let y = 0; y < player.tetromino.length; y += 1) {
		for (let x = 0; x < player.tetromino[y].length; x += 1) {
			if (player.tetromino[y][x] !== 0) {
				if (
					!stage[y + player.pos.y + dirY] ||
					(stage[y + player.pos.y + dirY] &&
						!stage[y + player.pos.y + dirY][x + player.pos.x + dirX]) ||
					(stage[y + player.pos.y + dirY] &&
						stage[y + player.pos.y + dirY][x + player.pos.x + dirX]?.isMerged)
				) {
					return true;
				}
			}
		}
	}
	return false;
};

export const darkenColor = (hex: string, percentage: number): string => {
	// Convert hex to RGB
	const rgb = hex
		.replace(/^#/, '')
		.match(/.{2}/g)!
		.map((x) => parseInt(x, 16));

	// Reduce each RGB channel by the given percentage
	const darkenedRgb = rgb.map((channel) =>
		Math.max(0, Math.min(255, Math.floor(channel * (1 - percentage)))),
	);

	// Convert the RGB values back to hex
	const darkenedHex = darkenedRgb.map((x) => x.toString(16).padStart(2, '0')).join('');

	return `#${darkenedHex}`;
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
