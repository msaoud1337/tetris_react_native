import { createStage, useStage } from '@/hooks/useStage';
import { TETROMINOS } from '@/utils/setup';
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { usePlayer } from '@/hooks/usePlayer';

const { width, height } = Dimensions.get('window');

const gridWidth = width * 0.95;
const gridHeight = height * 0.9;

const squareSize = Math.min(gridWidth / 12, gridHeight / 20);

const adjustedGridWidth = squareSize * 12;
const adjustedGridHeight = squareSize * 20;

export const GameStage = () => {
	const { player, resetPlayer, updatePlayerPos } = usePlayer();
	const { stage, setStage } = useStage(player);

	const onHandlerStateChange = (e: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (e.nativeEvent.translationX > 100) {
			updatePlayerPos({ x: 1, y: 0 });
		} else if (e.nativeEvent.translationX < -100) {
			updatePlayerPos({ x: -1, y: 0 });
		}
	};

	useEffect(() => {
		setStage(createStage());
		resetPlayer();
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
					{stage?.map((row) =>
						row.map((cell, index) => {
							const backgroundColor =
								TETROMINOS[cell.value as keyof typeof TETROMINOS]?.color;
							return (
								<View
									key={index}
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
		borderColor: '#000',
	},
	square: {
		backgroundColor: '#ccc',
		borderWidth: 1,
		borderColor: '#000',
	},
});
