import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Game } from './GamesContext';
// import { useMutation } from '@apollo/client';
// import { SAVE_GAME } from '../utils/mutations';

export interface UsersContextInterface {
	favorites: Game[];
	setFavorites: Dispatch<SetStateAction<Game[]>>;
}

const defaultState = {
	favorites: [],
	setFavorites: (favorites: Game[]) => {},
} as UsersContextInterface;

export const UsersContext = createContext(defaultState);

type UsersProviderProps = {
	children: ReactNode;
};

const UsersProvider = ({ children }: UsersProviderProps) => {
	const [favorites, setFavorites] = useState<Game[]>([]);

	

	return <UsersContext.Provider value={{ favorites, setFavorites }}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
