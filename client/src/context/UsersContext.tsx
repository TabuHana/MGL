import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Game } from './GamesContext';
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

export interface UsersContextInterface {
	favorites: Game[];
	setFavorites: Dispatch<SetStateAction<Game[]>>;
	save: (game: Game) => void;
	remove: (game_id: number) => void;
}

const defaultState = {
	favorites: [],
	setFavorites: (favorites: Game[]) => {},
	save: (game: Game) => {},
	remove: (game_id: number) => {},
} as UsersContextInterface;

export const UsersContext = createContext(defaultState);

type UsersProviderProps = {
	children: ReactNode;
};

const UsersProvider = ({ children }: UsersProviderProps) => {
	const [favorites, setFavorites] = useState<Game[]>([]);

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
		console.log(game_id);
		console.log('to do -- remove game from db');
	};

	return <UsersContext.Provider value={{ favorites, setFavorites, save, remove }}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
