// import { GameStage } from '@/components/stage/Stage';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const squareSize = width / 15;
const nbOfRow = Math.floor(height / squareSize);

export default function HomeScreen() {
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prevTime) => {
				const newSeconds = prevTime.seconds + 1;
				const newMinutes = newSeconds >= 60 ? prevTime.minutes + 1 : prevTime.minutes;
				return {
					minutes: newMinutes,
					seconds: newSeconds % 60,
				};
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const Row = ({ rowIndex }: { rowIndex: number }) => {
		return (
			<View style={{ flexDirection: 'row', width: '100%' }}>
				{Array.from({ length: 15 }).map((_, index) => {
					const isEvenRow = rowIndex % 2 === 0;
					const backgroundColor = (index % 2 === 0) === isEvenRow ? '#03042d' : '#0f0e37';

					return (
						<View
							key={index}
							style={{
								width: squareSize,
								height: squareSize,
								backgroundColor,
								borderColor: '#000',
							}}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<GestureHandlerRootView>
			<View style={{ flex: 1, position: 'relative' }}>
				<View
					style={{
						height: 150,
						width: '100%',
						backgroundColor: '#252c93',
						position: 'absolute',
						top: 0,
						right: 0,
						zIndex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'flex-end',
						gap: 10,
					}}
				>
					<View style={{ backgroundColor: '#161a58', marginBottom: 10, padding: 2 }}>
						<ThemedText
							style={{
								textAlign: 'center',
								padding: 5,
								color: '#59c2f4',
								fontSize: 18,
							}}
						>
							TIME
						</ThemedText>
						<ThemedText
							style={{
								fontSize: 18,
								color: 'white',
								textAlign: 'center',
								backgroundColor: '#1f257e',
								padding: 5,
							}}
						>{`${time.minutes.toString()}:${time.seconds.toString()}`}</ThemedText>
					</View>
					<View style={{ backgroundColor: '#161a58', marginBottom: 10, padding: 2 }}>
						<ThemedText
							style={{
								textAlign: 'center',
								padding: 5,
								color: '#59c2f4',
								fontSize: 18,
							}}
						>
							Target
						</ThemedText>
						<View style={styles.container}>
							<ThemedText style={{ ...styles.clearText, marginLeft: 10 }}>
								CLEAR
							</ThemedText>
							<ThemedText style={styles.linesText}>5</ThemedText>
							<ThemedText style={{ ...styles.clearText, marginRight: 10 }}>
								LINES
							</ThemedText>
						</View>
					</View>
				</View>
				<FlatList
					data={Array.from({ length: nbOfRow })}
					renderItem={({ index }) => <Row rowIndex={index} />}
					keyExtractor={(_, index) => index.toString()}
				/>
			</View>
			{/* <GameStage /> */}
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1f257e',
		padding: 5,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
	},
	clearText: {
		fontSize: 13, // Adjust this size as needed
		color: 'white',
		textAlign: 'center',
	},
	linesText: {
		fontSize: 18, // Smaller font size for "5 LINES"
		color: 'white',
		textAlign: 'center',
	},
});
