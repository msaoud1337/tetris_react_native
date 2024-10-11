import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

const HeaderBox = ({
	title,
	content,
	style,
}: {
	title: string;
	content: JSX.Element | string;
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
			{typeof content === 'string' ? (
				<ThemedText
					style={{
						fontSize: 16,
						color: 'white',
						textAlign: 'center',
						backgroundColor: '#1f257e',
						padding: 5,
					}}
				>
					{content}
				</ThemedText>
			) : (
				content
			)}
		</View>
	);
};

export const GameHeader = ({ minutes, seconds }: { minutes: number; seconds: number }) => {
	return (
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
			<HeaderBox title={'TIME'} content={`${minutes.toString()}:${seconds.toString()}`} />
			<HeaderBox
				title={'TARGET'}
				content={
					<View style={styles.container}>
						<ThemedText style={{ ...styles.clearText, marginLeft: 10 }}>
							CLEAR
						</ThemedText>
						<ThemedText style={styles.linesText}>5</ThemedText>
						<ThemedText style={{ ...styles.clearText, marginRight: 10 }}>
							LINES
						</ThemedText>
					</View>
				}
			/>
			<HeaderBox
				title={'SCORE'}
				content={`${minutes.toString()}:${seconds.toString()}`}
				style={{
					borderWidth: 2,
					borderColor: 'white',
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
