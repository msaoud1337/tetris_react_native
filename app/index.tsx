import { GameBackground } from '@/components/GameBackground';
import { GameHeader } from '@/components/GameHeader';
import { GameStage } from '@/components/stage/Stage';
import { useGame } from '@/hooks/useGame';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const GamePauseStats = ({
	isGamePaused,
	isGameOver,
	setGameStats,
}: {
	isGamePaused: boolean;
	isGameOver: boolean;
	setGameStats: () => void;
}) => {
	const translateX = useRef(new Animated.Value(-90)).current;

	Animated.timing(translateX, {
		toValue: 0,
		duration: 500,
		useNativeDriver: true,
		delay: 200,
	}).start();

	if (isGameOver) return;
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

	return (
		<SafeAreaView style={{ flex: 1 }}>
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
	);
}
