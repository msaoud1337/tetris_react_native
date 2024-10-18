/* eslint-disable no-unused-vars */

import { randomTetromino } from '@/utils/functions';
import { createContext, useReducer, ReactNode } from 'react';

type TetrosType = {
	shape: number[][] | string[][] | (string | number)[][];
	color: string;
};

type GameState = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
	isGameOver: boolean;
	rowCleared: number;
	tetrosList: TetrosType[];
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
	tetrosList: Array.from({ length: 2 }).map(() => {
		const tetros = randomTetromino();
		return {
			shape: tetros.shape,
			color: tetros.color,
		};
	}),
};

type GameContextType = {
	isGamePlayed: boolean;
	isGamePaused: boolean;
	isGameOver: boolean;
	rowCleared: number;
	tetrosList: TetrosType[];
	startTheGame: () => void;
	setGameStats: (payload: boolean) => void;
	setGameIsOver: (payload: boolean) => void;
	setIsRowCleared: (payload: number) => void;
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
			return { ...state, rowCleared: action.payload };
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

	const setIsRowCleared = (payload: number) => dispatch({ type: 'ISROW_CLEARED', payload });

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
