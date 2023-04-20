import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

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

export interface GameContextInterface {
	game: Game[];
	setGame: Dispatch<SetStateAction<Game[]>>;
	favorite: Game[];
	setFavorite: Dispatch<SetStateAction<Game[]>>;
	search: (searchInput: string) => void;
	save: (game: Game) => void;
	remove: (game_id: number) => void;
}

const defaultState = {
	game: [],
	setGame: (games: Game[]) => {},
	favorite: [],
	setFavorite: (favorites: Game[]) => {},
	search: (searchInput: string) => {},
	save: (game: Game) => {},
	remove: (game_id: number) => {},
} as GameContextInterface;

export const GameContext = createContext(defaultState);

type GameProviderProps = {
	children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
	const [game, setGame] = useState<Game[]>([]);
	const [favorite, setFavorite] = useState<Game[]>([]);

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
			setGame(items);
		} catch (err) {
			console.error(err);
		}
	};

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	const save = async (game: Game) => {
		try {
			if (game === undefined) return;
			await saveGame({
				variables: {
					developer: game.developer,
					freetogame_profile_url: game.freetogame_profile_url,
					game_url: game.game_url,
					genre: game.genre,
					game_id: game.id,
					platform: game.platform,
					publisher: game.publisher,
					short_description: game.short_description,
					thumbnail: game.thumbnail,
					title: game.title,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const remove = async (game_id: number) => {
		console.log('to do -- remove game from db');
	};

	return <GameContext.Provider value={{ game, setGame, favorite, setFavorite, save, remove, search }}>{children}</GameContext.Provider>;
};

export default GameProvider;
