import { createContext } from 'react';
import { games } from './games';

type GamesProviderProps = {
	children: React.ReactNode;
};

const GamesContext = createContext(games);

export const GamesProvider = ({ children }: GamesProviderProps) => {
	return (
		<GamesContext.Provider value={games}>{children}</GamesContext.Provider>
	);
};
