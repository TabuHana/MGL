import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import Auth from '../utils/auth';
import Search from '../components/Search';
import SearchedGame from '../components/SearchedGame';

interface Games {
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
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
	},
};

const SearchGame: React.FC = () => {
	const [searchedGames, setSearchedGames] = useState([]);
	const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	// set up useEffect hook to save `gameIDs` list to localStorage on component unmount
	// useEffect(() => {
	// 	return () => saveGameIds(savedGameIds);
	// });

	const searchGames = async (searchInput: string) => {
		try {
			const games = await fetch(
				`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${searchInput}`,
				options
			);

			if (!games.ok) {
				throw new Error('something went wrong!');
			}

			const items = await games.json();

			setSearchedGames(items);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSaveGame = async (gameId: unknown) => {
		const gameToSave = searchedGames.find((game: Games) => game.id === gameId);

		// get token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			console.log(gameToSave);

			const { data } = await saveGame({
				variables: {
					gameId: `${gameToSave.id}`,
					creator: gameToSave.creator,
					title: gameToSave.title,
					description: gameToSave.description,
					image: gameToSave.image,
				},
			});
			console.log(savedGameIds);
			setSavedGameIds([...savedGameIds, gameToSave.gameId]);
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<Search data={searchGames} />
			<SearchedGame gameItem={searchedGames} data={handleSaveGame} />
		</>
	);
};

export default SearchGame;
