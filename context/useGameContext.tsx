/* eslint-disable no-unused-vars */

import { createContext, useReducer, ReactNode } from 'react';

type GameState = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
	isGameOver: boolean;
	rowCleared: number;
};

type GameAction =
	| { type: 'ISGAME_STARTED' }
	| { type: 'ISGAME_PAUSED'; payload: boolean }
	| { type: 'ISGAME_OVER'; payload: boolean }
	| { type: 'ISROW_CLEARED'; payload: number };

const initialState: GameState = {
	isGamePlayed: false,
	isGamePaused: false,
	isGameOver: false,
	rowCleared: 0,
};

type GameContextType = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
	isGameOver: boolean;
	rowCleared: number;
	startTheGame: () => void;
	setGameStats: (payload: boolean) => void;
	setGameIsOver: (payload: boolean) => void;
	setIsRowCleared: (paylaod?: number) => void;
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case 'ISGAME_STARTED':
			return { ...state, isGamePlayed: true };
		case 'ISGAME_PAUSED':
			return { ...state, isGamePaused: action.payload };
		case 'ISGAME_OVER':
			return { ...state, isGameOver: action.payload };
		case 'ISROW_CLEARED':
			return { ...state, rowCleared: state.rowCleared + action.payload };
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

	const setGameIsOver = (payload: boolean) => dispatch({ type: 'ISGAME_OVER', payload });

	const setIsRowCleared = (paylaod?: number) =>
		dispatch({ type: 'ISROW_CLEARED', payload: paylaod ? paylaod : 1 });

	return (
		<GameContext.Provider
			value={{
				...state,
				startTheGame,
				setGameStats,
				setGameIsOver,
				setIsRowCleared,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
