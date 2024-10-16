import { GameContext } from '@/context/useGameContext';
import { useContext } from 'react';

export const useGame = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGameContext must be used within a GameProvider');
	}
	return context;
};
