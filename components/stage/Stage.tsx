import { STAGE, useStage } from '@/hooks/useStage';
import { TETROMINOS } from '@/utils/setup';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { PLAYER, usePlayer } from '@/hooks/usePlayer';
import { useInterval } from '@/hooks/useInterval';
import { ThemedText } from '../ThemedText';
import { checkMove } from '@/utils/functions';

const { width, height } = Dimensions.get('window');

const gridWidth = width * 0.95;
const gridHeight = height * 0.9;

const squareSize = Math.min(gridWidth / 12, gridHeight / 20);

const adjustedGridWidth = squareSize * 12;
const adjustedGridHeight = squareSize * 20;

export const GameStage = () => {
	const [dropInterval, setDropInterval] = useState<null | number>(null);
	const { player, resetPlayer, updatePlayerPos, setPlayer } = usePlayer();
	const { stage } = useStage(player, resetPlayer);

	const rotate = (matrix: PLAYER['tetromino']) => {
		// Make the rows to become cols (transpose)
		const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
		// Reverse each row to get a rotated matrix
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
			<PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
				<View
					style={[
						styles.container,
						{ width: adjustedGridWidth, height: adjustedGridHeight },
					]}
				>
					{stage?.map((row, y) =>
						row.map((cell, x) => {
							const backgroundColor =
								TETROMINOS[cell.value as keyof typeof TETROMINOS]?.color;
							return (
								<View
									key={`y${y}-x${x}-v${cell.value}}`}
									style={[
										styles.square,
										{
											width: squareSize - 0.2,
											height: squareSize,
											backgroundColor,
										},
									]}
								/>
							);
						}),
					)}
				</View>
			</PanGestureHandler>
			<View style={[{ width: adjustedGridWidth, height: squareSize, flexDirection: 'row' }]}>
				{Array.from({ length: 12 })?.map((_, index) => (
					<ThemedText
						key={`y${index}`}
						style={[
							{
								width: squareSize,
								height: squareSize,
								textAlign: 'center',
								textAlignVertical: 'center',
							},
						]}
					>
						{index}
					</ThemedText>
				))}
			</View>
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
		flexWrap: 'wrap',
		borderWidth: 1,
		borderColor: 'red',
	},
	square: {
		backgroundColor: '#ccc',
		borderWidth: 0.5,
		borderColor: '#000',
	},
});
