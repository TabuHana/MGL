// React
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

// GQL
import { useMutation } from '@apollo/client';
import { REMOVE_GAME, SAVE_GAME } from '../utils/mutations';
import Auth from '../utils/auth';

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
	save: (id: number) => void;
	remove: (id: number) => void;
}

const defaultState = {
	game: [],
	setGame: (games: Game[]) => {},
	favorite: [],
	setFavorite: (favorites: Game[]) => {},
	search: (searchInput: string) => {},
	save: (id: number) => {},
	remove: (id: number) => {},
} as GameContextInterface;

export const GameContext = createContext(defaultState);

type GameProviderProps = {
	children: ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
	// From GQL
	const [saveGame] = useMutation(SAVE_GAME);
	const [removeGame] = useMutation(REMOVE_GAME);

	// State
	const [game, setGame] = useState<Game[]>([]);
	const [favorite, setFavorite] = useState<Game[]>([]);

	// Constant for search
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
			'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
		},
	};

	// Functions
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

	const save = async (id: number) => {
		const saving = game.find((gameItem: Game) => gameItem.id === id);

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		if (saving === undefined) {
			return false;
		}

		try {
			if (game === undefined) return;
			await saveGame({
				variables: {
					developer: saving.developer,
					freetogame_profile_url: saving.freetogame_profile_url,
					game_url: saving.game_url,
					genre: saving.genre,
					game_id: saving.id,
					platform: saving.platform,
					publisher: saving.publisher,
					short_description: saving.short_description,
					thumbnail: saving.thumbnail,
					title: saving.title,
				},
			});

			setFavorite([...favorite, saving]);
		} catch (err) {
			console.error(err);
		}
	};

	const remove = async (id: number) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			await removeGame({
				variables: {
					game_id: id,
				},
			});

			setFavorite((current) => current.filter((game) => game.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return <GameContext.Provider value={{ game, setGame, favorite, setFavorite, save, remove, search }}>{children}</GameContext.Provider>;
};

export default GameProvider;
