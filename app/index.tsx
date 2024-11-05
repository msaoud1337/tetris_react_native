import { GameBackground } from '@/components/GameBackground';
import { GameHeader } from '@/components/GameHeader';
import { GameStage } from '@/components/stage/Stage';
import { ThemedText } from '@/components/ThemedText';
import { useGame } from '@/hooks/useGame';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;

const GamePauseStats = ({
	isGamePaused,
	isGameOver,
	setGameStats,
}: {
	isGamePaused: boolean;
	isGameOver: boolean;
	setGameStats: () => void;
}) => {
	if (isGameOver) return;

	const translateX = useRef(new Animated.Value(-90)).current;

	Animated.timing(translateX, {
		toValue: 0,
		duration: 500,
		useNativeDriver: true,
		delay: 200,
	}).start();

	return (
		<Animated.View
			style={{
				transform: [{ translateX }, { skewY: '-3deg' }],
				backgroundColor: '#252c93',
				width: 70,
				alignItems: 'flex-end',
				padding: 3,
				justifyContent: 'center',
				zIndex: 20,
				position: 'absolute',
				top: 100,
			}}
		>
			<Pressable onPress={() => setGameStats()}>
				{isGamePaused ? (
					<Feather name='play-circle' size={40} color='white' />
				) : (
					<Feather name='pause-circle' size={40} color='white' />
				)}
			</Pressable>
		</Animated.View>
	);
};

export default function HomeScreen() {
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });
	const { isGamePlayed, startTheGame, isGamePaused, isGameOver, setGameStats } = useGame();
	const translateY = useRef(new Animated.Value(windowHeight)).current;

	if (isGamePaused)
		Animated.timing(translateY, {
			toValue: (windowHeight / 100) * 40,
			duration: 500,
			useNativeDriver: true,
			delay: 200,
		}).start();

	useEffect(() => {
		if (!isGamePlayed) {
			startTheGame();
			return;
		}

		const timer =
			isGamePlayed &&
			!isGamePaused &&
			!isGameOver &&
			setInterval(() => {
				setTime((prevTime) => {
					const newSeconds = prevTime.seconds + 1;
					const newMinutes = newSeconds >= 60 ? prevTime.minutes + 1 : prevTime.minutes;
					return {
						minutes: newMinutes,
						seconds: newSeconds % 60,
					};
				});
			}, 1000);

		return () => clearInterval(Number(timer));
	}, [isGamePlayed, isGamePaused, isGameOver]);

	const GameStatsBox = isGamePaused && (
		<View style={styles.gameBoxModalWrapper}>
			<Animated.View
				style={{
					transform: [{ translateY }],
					width: '100%',
					height: '20%',
					position: 'absolute',
					backgroundColor: '#252c93',
					top: 0,
					left: 0,
					zIndex: 1337,
					justifyContent: 'center',
					alignItems: 'center',
					gap: 10,
				}}
			>
				<View
					style={{
						width: '80%',
						shadowColor: 'black',
						shadowOffset: { width: 5, height: 5 },
						shadowOpacity: 1,
						shadowRadius: 1,
					}}
				>
					<LinearGradient
						colors={['#439648', '#89e46d']}
						style={{
							width: '100%',
							shadowColor: 'black',
							shadowOffset: { width: 5, height: 5 },
							shadowOpacity: 1,
							shadowRadius: 1,
						}}
					>
						<Pressable
							style={styles.button}
							onPress={() => {
								Animated.timing(translateY, {
									toValue: windowHeight,
									duration: 500,
									useNativeDriver: true,
									delay: 200,
								}).start(() => setGameStats(false));
							}}
						>
							<ThemedText style={styles.text}>CONTINUE</ThemedText>
						</Pressable>
					</LinearGradient>
				</View>
				<View
					style={{
						width: '80%',
						shadowColor: 'black',
						shadowOffset: { width: 5, height: 5 },
						shadowOpacity: 1,
						shadowRadius: 1,
					}}
				>
					<LinearGradient colors={['#ee8833', '#e9bb67']} style={{ width: '100%' }}>
						<Pressable
							style={styles.button}
							onPress={() => {
								Animated.timing(translateY, {
									toValue: windowHeight,
									duration: 500,
									useNativeDriver: true,
									delay: 200,
								}).start(() => setGameStats(false));
							}}
						>
							<ThemedText style={styles.text}>QUIT GAME</ThemedText>
						</Pressable>
					</LinearGradient>
				</View>
			</Animated.View>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			{GameStatsBox}
			<SafeAreaView style={{ flex: 1, position: 'relative' }}>
				<View style={{ flex: 1, position: 'absolute' }}>
					<GameHeader minutes={time.minutes} seconds={time.seconds} />
					<GameBackground />
				</View>
				<GestureHandlerRootView>
					<GamePauseStats
						isGameOver={isGameOver}
						isGamePaused={isGamePaused}
						setGameStats={() => setGameStats(!isGamePaused)}
					/>
					<GameStage />
				</GestureHandlerRootView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		elevation: 3,
		borderWidth: 3,
		borderColor: 'white',
		width: '100%',
	},
	text: {
		fontSize: 19,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
		borderColor: 'red',
		textShadowColor: 'black',
		textShadowOffset: { width: 3, height: 3 },
		textShadowRadius: 2,
	},
	gameBoxModalWrapper: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		zIndex: 1337,
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)',
	},
});
