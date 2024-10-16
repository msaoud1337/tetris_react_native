/* eslint-disable no-unused-vars */

import { createContext, useReducer, ReactNode } from 'react';

type GameState = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
};

type GameAction = { type: 'ISGAME_STARTED' } | { type: 'ISGAME_PAUSED'; payload: boolean };

const initialState: GameState = {
	isGamePlayed: false,
	isGamePaused: false,
};

type GameContextType = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
	startTheGame: () => void;
	setGameStats: (payload: boolean) => void;
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case 'ISGAME_STARTED':
			return { ...state, isGamePlayed: true };
		case 'ISGAME_PAUSED':
			return { ...state, isGamePaused: true };
		default:
			return state;
	}
}

type GameProviderProps = {
	children: ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
	const [state, dispatch] = useReducer(gameReducer, initialState);

	const startTheGame = () => dispatch({ type: 'ISGAME_STARTED' });

	const setGameStats = (payload: boolean) => dispatch({ type: 'ISGAME_PAUSED', payload });

	return (
		<GameContext.Provider
			value={{
				...state,
				startTheGame,
				setGameStats,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
