import { STAGE } from '@/hooks/useStage';
import { TETROMINOS } from '@/utils/setup';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const createStage = () =>
	Array.from(Array(20), () => Array(12).fill({ value: 0, isClear: true }));

export const GameStage = ({ stage }: { stage: STAGE }) => {
	const { width, height } = Dimensions.get('window');

	const gridWidth = width * 0.95;
	const gridHeight = height * 0.9;

	const squareSize = Math.min(gridWidth / 12, gridHeight / 20);

	const adjustedGridWidth = squareSize * 12;
	const adjustedGridHeight = squareSize * 20;

	return (
		<SafeAreaView style={styles.safeEreaContainer}>
			<View
				style={[styles.container, { width: adjustedGridWidth, height: adjustedGridHeight }]}
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
