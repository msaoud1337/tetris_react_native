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
		<View style={[{ backgroundColor: '#161a58', padding: 2 }, style]}>
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

export const nextTetrosStage = () => Array.from(Array(3), () => Array(3).fill(true));

export const GameHeader = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
	const { rowCleared, tetrosList } = useGame();
	const nextTetris = tetrosList[1];

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
				paddingBottom: 5,
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
			<View
				style={{
					padding: 6,
					backgroundColor: '#252c93',
					transform: [{ translateY: 30 }],
					marginLeft: -5,
				}}
			>
				<HeaderBox
					title={'NEXT'}
					style={{
						borderWidth: 1,
						borderColor: 'white',
					}}
					Content={() => {
						return (
							<>
								{nextTetrosStage().map((row, y) => (
									<View
										key={y}
										style={{
											height: 15,
											flexDirection: 'row',
											gap: 0,
										}}
									>
										{row.map((_, x) => (
											<View
												key={x}
												style={{
													flex: 1,
													backgroundColor:
														nextTetris.shape[y] &&
														nextTetris.shape[y][x]
															? nextTetris.color
															: '#1f257e',
													borderWidth:
														nextTetris.shape[y] &&
														nextTetris.shape[y][x]
															? 0.3
															: 0,
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
