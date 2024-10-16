import { GameBackground } from '@/components/GameBackground';
import { GameHeader } from '@/components/GameHeader';
import { GameStage } from '@/components/stage/Stage';
import { useGame } from '@/hooks/useGame';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });
	const { isGamePlayed, startTheGame, setGameStats } = useGame();

	useEffect(() => {
		if (!isGamePlayed) {
			startTheGame();
			return;
		}
		const timer =
			isGamePlayed &&
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

		return () => clearInterval(timer);
	}, [isGamePlayed]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, position: 'absolute' }}>
				<GameHeader minutes={time.minutes} seconds={time.seconds} />
				<GameBackground />
			</View>
			<GestureHandlerRootView>
				<Pressable
					onPress={() => setGameStats(true)}
					style={{
						backgroundColor: '#252c93',
						width: 70,
						alignItems: 'flex-end',
						paddingRight: 3,
						height: 45,
						justifyContent: 'center',
						zIndex: 20,
						position: 'absolute',
						top: 100,
					}}
				>
					<MaterialIcons name='pause-presentation' size={45} color='white' />
				</Pressable>
				<GameStage />
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}
