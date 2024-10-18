import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { useGame } from '@/hooks/useGame';

const HeaderBox = ({
	title,
	Content,
	style,
}: {
	title: string;
	Content: string | (() => JSX.Element);
	style?: StyleProp<ViewStyle>;
}) => {
	return (
		<View style={[{ backgroundColor: '#161a58', marginBottom: 10, padding: 2 }, style]}>
			<ThemedText
				style={{
					textAlign: 'center',
					padding: 5,
					color: '#59c2f4',
					fontSize: 16,
				}}
			>
				{title}
			</ThemedText>
			{typeof Content === 'string' ? (
				<ThemedText
					style={{
						fontSize: 16,
						color: 'white',
						textAlign: 'center',
						backgroundColor: '#1f257e',
						padding: 5,
					}}
				>
					{Content}
				</ThemedText>
			) : (
				<Content />
			)}
		</View>
	);
};

export const GameHeader = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
	const { rowCleared, tetrosList } = useGame();
	const nextTetros = tetrosList[1];

	return (
		<View
			style={{
				height: 150,
				width: '100%',
				backgroundColor: '#252c93',
				position: 'absolute',
				top: -6,
				right: 0,
				zIndex: 1,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'flex-end',
				gap: 10,
				transform: [{ skewY: '-3deg' }],
			}}
		>
			<HeaderBox title={'TIME'} Content={`${minutes.toString()}:${seconds.toString()}`} />
			<HeaderBox
				title={'TARGET'}
				Content={() => (
					<View style={styles.container}>
						<ThemedText style={{ ...styles.clearText, marginLeft: 10 }}>ROW</ThemedText>
						<ThemedText style={styles.linesText}>{rowCleared}</ThemedText>
						<ThemedText style={{ ...styles.clearText, marginRight: 10 }}>
							CLEARED
						</ThemedText>
					</View>
				)}
			/>
			<HeaderBox
				title={'NEXT'}
				style={{
					borderWidth: 2,
					borderColor: 'white',
					transform: [{ translateY: 20 }],
					// padding: 20
				}}
				Content={() => {
					return (
						<>
							{nextTetros.shape.map((row, y) => (
								<View
									key={y}
									style={{
										flex: 1,
										borderColor: 'red',
										borderWidth: 1,
										flexDirection: 'row',
									}}
								>
									{row.map((cell, x) => (
										<View
											key={x}
											style={{
												flex: 1,
												backgroundColor:
													cell !== 0 ? nextTetros.color : 'transparent',
												borderWidth: 1,
											}}
										/>
									))}
								</View>
							))}
						</>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#1f257e',
		padding: 5,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
	},
	clearText: {
		fontSize: 13,
		color: 'white',
		textAlign: 'center',
	},
	linesText: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
});
