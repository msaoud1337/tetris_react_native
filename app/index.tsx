import { GameBackground } from '@/components/GameBackground';
import { GameHeader } from '@/components/GameHeader';
import { GameStage } from '@/components/stage/Stage';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

type InitialStates = {
	time: {
		minutes: number;
		seconds: number;
	};
	isGamePlayed: boolean;
	isGamePaused: boolean;
	setIsGame: Dispatch<SetStateAction<{ isGamePlayed: boolean; isGamePaused: boolean }>>;
};

const initialStates: InitialStates = {
	time: {
		minutes: 0,
		seconds: 0,
	},
	isGamePlayed: false,
	isGamePaused: false,
	setIsGame: () => {},
};

const Context = createContext(initialStates);

export default function HomeScreen() {
	const [time, setTime] = useState({ minutes: 0, seconds: 0 });
	const [game, setIsGame] = useState({ isGamePlayed: false, isGamePaused: false });

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

	return (
		<Context.Provider value={{ time, ...game, setIsGame }}>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1, position: 'absolute' }}>
					<GameHeader minutes={time.minutes} seconds={time.seconds} />
					<GameBackground />
				</View>
				<GestureHandlerRootView>
					<GameStage />
				</GestureHandlerRootView>
			</SafeAreaView>
		</Context.Provider>
	);
}
