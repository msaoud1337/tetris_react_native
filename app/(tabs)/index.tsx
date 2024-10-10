// import { GameStage } from '@/components/stage/Stage';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const squareSize = width / 15;
const nbOfRow = Math.floor(height / squareSize);

export default function HomeScreen() {
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
					}}
				>
					<View style={{ width: '20%', backgroundColor: '#161a58', marginBottom: 10 }}>
						<Text
							style={{
								textAlign: 'center',
								paddingTop: 4,
								color: '#59c2f4',
								fontSize: 20,
								fontWeight: 600,
								fontFamily: 'PressStart2P',
							}}
						>
							TIME
						</Text>
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
