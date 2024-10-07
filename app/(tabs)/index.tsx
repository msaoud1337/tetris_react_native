import { GameStage } from '@/components/stage/Stage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function HomeScreen() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<GameStage />
		</GestureHandlerRootView>
	);
}
