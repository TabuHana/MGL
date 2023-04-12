import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export type Game = {
	developer: string;
	freetogame_profile_url: string;
	game_url: string;
	genre: string;
	id: number;
	platform: string;
	publisher: string;
	short_description: string;
	thumbnail: string;
	title: string;
};

export interface GamesContextInterface {
	games: Game[];
	setGames: Dispatch<SetStateAction<Game[]>>;
	search: (searchInput: string) => void;
}

const defaultState = {
	games: [],
	setGames: (games: Game[]) => {},
	search: (searchInput: string) => {},
} as GamesContextInterface;

export const GamesContext = createContext(defaultState);

type GamesProviderProps = {
	children: ReactNode;
};

const GamesProvider = ({ children }: GamesProviderProps) => {
	const [games, setGames] = useState<Game[]>([]);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
			'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
		},
	};

	const search = async (searchInput: string) => {
		try {
			const gameFetch = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${searchInput}`, options);

			if (!gameFetch.ok) {
				throw new Error('something went wrong!');
			}
			const items = await gameFetch.json();
			setGames(items);
		} catch (err) {
			console.error(err);
		}
	};

	return <GamesContext.Provider value={{ games, setGames, search }}>{children}</GamesContext.Provider>;
};

export default GamesProvider;
