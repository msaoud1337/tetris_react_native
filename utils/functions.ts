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
