import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import Auth from '../utils/auth';
import Search from '../components/Search';
import SearchedGame from '../components/SearchedGame';
import { FiHeart } from 'react-icons/fi';

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
	const [searchedGames, setSearchedGames] = useState<Games[]>([]);
	const [IDs, setIDs] = useState(getSavedGameIds());

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	useEffect(() => {
		return () => saveGameIds(IDs);
	});

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

	const handleSaveGame = async (gameId: number) => {
		const gameToSave = searchedGames.find((game: Games) => game.id === gameId);

		try {
			if (gameToSave === undefined) {
				return;
			}
			await saveGame({
				variables: {
					gameId: `${gameToSave.id}`,
					creator: gameToSave.developer,
					title: gameToSave.title,
					description: gameToSave.short_description,
					image: gameToSave.thumbnail,
				},
			});
			setIDs([...IDs, gameId]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Search data={searchGames} />
			<div className='browse'>
				{searchedGames.map((game: Games) => {
					return (
						<div className='browse-option' key={game.id}>
							<img
								className='browse-option-background'
								src={game.thumbnail}
								alt={game.title}
							/>

							<div className='label-btn'>
								<h1>{game.title}</h1>
								<button className='btn' onClick={() => handleSaveGame(game.id)}>
									<FiHeart />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default SearchGame;
