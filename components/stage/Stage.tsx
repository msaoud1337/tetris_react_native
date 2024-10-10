import { useStage } from '@/hooks/useStage';
import { TETROMINOS } from '@/utils/setup';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { usePlayer } from '@/hooks/usePlayer';
import { useInterval } from '@/hooks/useInterval';
import { checkMove } from '@/utils/functions';

const { width, height } = Dimensions.get('window');

const gridWidth = width * 0.95;
const gridHeight = (height - 50) * 0.9;

const squareSize = Math.min(gridWidth / 10, gridHeight / 20);

const adjustedGridWidth = squareSize * 10 + 1;
const adjustedGridHeight = squareSize * 20;

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
		<SafeAreaView style={styles.safeEreaContainer}>
			<Text>Hello world</Text>
			<PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
				<View
					style={[
						{
							display: 'flex',
							flexDirection: 'column',
							width: adjustedGridWidth,
							height: adjustedGridHeight,
						},
					]}
				>
					{stage?.map((row, y) => {
						return (
							<View key={`row-${y}`} style={styles.container}>
								{row.map((cell, x) => (
									<View
										key={`y${y}-x${x}-v${cell.value}}`}
										style={[
											styles.square,
											{
												width: squareSize,
												height: squareSize,
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
			</PanGestureHandler>
		</SafeAreaView>
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
