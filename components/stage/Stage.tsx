import { useStage } from '@/hooks/useStage';
import { TETROMINOS } from '@/utils/setup';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { usePlayer } from '@/hooks/usePlayer';
import { useInterval } from '@/hooks/useInterval';
import { checkMove } from '@/utils/functions';

export const GameStage = () => {
	const [dropInterval, setDropInterval] = useState<null | number>(null);
	const { player, resetPlayer, updatePlayerPos, playerRotate } = usePlayer();
	const { stage } = useStage(player, resetPlayer);

	const onHandlerStateChange = (e: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (e.nativeEvent.translationX > 30 && !checkMove(player!, stage, { dirX: 1, dirY: 0 }))
			updatePlayerPos({ x: 1, y: 0 });
		else if (
			e.nativeEvent.translationX < -30 &&
			!checkMove(player!, stage, { dirX: -1, dirY: 0 })
		)
			updatePlayerPos({ x: -1, y: 0 });
		else if (
			e.nativeEvent.translationY > 20 &&
			e.nativeEvent.translationY < 500 &&
			!checkMove(player!, stage, { dirX: 0, dirY: 2 })
		)
			updatePlayerPos({ x: 0, y: 2 });
		else if (
			e.nativeEvent.translationY > 20 &&
			e.nativeEvent.translationY < 200 &&
			!checkMove(player!, stage, { dirX: 0, dirY: 1 })
		)
			updatePlayerPos({ x: 0, y: 1 });
		else if (e.nativeEvent.translationY < -100) playerRotate(stage);
	};

	const drop = () => {
		if (!checkMove(player!, stage, { dirX: 0, dirY: 1 })) {
			updatePlayerPos({ x: 0, y: 1 });
		} else {
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};

	useInterval(() => {
		drop();
	}, dropInterval);

	useEffect(() => {
		resetPlayer();
		setDropInterval(1000);
	}, []);

	return (
		<PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
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
									key={`y${y}-x${x}-v${cell.value}}`}
									style={[
										styles.square,
										{
											flex: 1,
											borderWidth: !cell.isMerged ? 0.3 : 0,
											backgroundColor: !cell.isMerged
												? TETROMINOS[cell.value as keyof typeof TETROMINOS]
														?.color
												: 'red',
										},
									]}
								/>
							))}
						</View>
					);
				})}
			</View>
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
