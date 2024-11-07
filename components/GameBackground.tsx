import { Dimensions, FlatList, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const squareSize = width / 15;
const nbOfRow = Math.floor(height / squareSize);

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
						}}
					/>
				);
			})}
		</View>
	);
};

export const GameBackground = () => {
	return (
		<FlatList
			data={Array.from({ length: nbOfRow })}
			renderItem={({ index }) => <Row rowIndex={index} />}
			keyExtractor={(_, index) => index.toString()}
		/>
	);
};
