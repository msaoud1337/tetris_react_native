// import { GameStage } from '@/components/stage/Stage';
import { Dimensions, FlatList, View } from 'react-native';
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
						width: 1000,
						backgroundColor: 'red',
						transform: [{ rotate: '5deg' }],
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 1,
					}}
				></View>
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
