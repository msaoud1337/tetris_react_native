import { useStage } from '@/hooks/useStage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
	TapGestureHandler,
} from 'react-native-gesture-handler';
import { usePlayer } from '@/hooks/usePlayer';
import { useInterval } from '@/hooks/useInterval';
import { checkMove } from '@/utils/functions';
import { TETROMINOS } from '@/constants/setup';
import { useGame } from '@/hooks/useGame';

export const GameStage = () => {
	const { isGamePaused, isGameOver, setGameIsOver } = useGame();

	const [dropInterval, setDropInterval] = useState<null | number>(null);
	const { player, resetPlayer, updatePlayerPos, playerRotate } = usePlayer();

	const { stage } = useStage(player, resetPlayer, isGameOver);

	const onHandlerStateChange = (e: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (e.nativeEvent.translationX > 30 && !checkMove(player!, stage, { dirX: 1, dirY: 0 }))
			updatePlayerPos({ x: 1, y: 0 });
		else if (
			e.nativeEvent.translationX < -30 &&
			!checkMove(player!, stage, { dirX: -1, dirY: 0 })
		)
			updatePlayerPos({ x: -1, y: 0 });
		else if (e.nativeEvent.translationY > 20) {
			let lenght = 0;
			while (!checkMove(player!, stage, { dirX: 0, dirY: lenght })) lenght++;
			updatePlayerPos({ x: 0, y: lenght - 1 });
		}
	};

	const drop = () => {
		if (!checkMove(player!, stage, { dirX: 0, dirY: 1 })) {
			updatePlayerPos({ x: 0, y: 1 });
		} else {
			if (!player?.pos.y) setGameIsOver(true);
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};

	useInterval(() => {
		if (!isGamePaused && !isGameOver) drop();
	}, dropInterval);

	useEffect(() => {
		resetPlayer();
		setDropInterval(1000);
	}, []);

	return (
		<PanGestureHandler onHandlerStateChange={(e) => !isGamePaused && onHandlerStateChange(e)}>
			<TapGestureHandler
				numberOfTaps={2}
				onActivated={() => !isGamePaused && playerRotate(stage)}
			>
				<View
					style={[
						{
							marginTop: 100,
							borderWidth: 2,
							borderColor: '#252c93',
							marginBottom: 10,
							marginHorizontal: 20,
							flex: 1,
						},
					]}
				>
					{stage?.map((row, y) => {
						return (
							<View key={`row-${y}`} style={[styles.container, { flex: 1 }]}>
								{row.map((cell, x) => (
									<View
										key={`${y}${x}-v${cell.value}`}
										style={[
											styles.square,
											{
												flex: 1,
												borderWidth: !cell.isMerged ? 0.3 : 0,
												backgroundColor: !cell.isMerged
													? TETROMINOS[
															cell.value as keyof typeof TETROMINOS
														]?.color
													: 'red',
											},
										]}
									/>
								))}
							</View>
						);
					})}
				</View>
			</TapGestureHandler>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	safeEreaContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flexDirection: 'row',
		borderColor: 'red',
	},
	square: {
		backgroundColor: '#ccc',
		borderColor: '#000',
	},
});
