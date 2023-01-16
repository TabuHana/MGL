import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

import Auth from '../utils/auth';
import Search from '../components/Search';
import SearchedGame from '../components/SearchedGame';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
	},
};

const SearchGame: React.FC = () => {
	// create state for holding returned api data
	const [searchedGames, setSearchedGames] = useState([]);

	// create state to hold saved game id values
	const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	// set up useEffect hook to save `gameIDs` list to localStorage on component unmount
	useEffect(() => {
		return () => saveGameIds(savedGameIds);
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

	// create function to handle saving a game to our database
	const handleSaveGame = async (gameId) => {
		console.log(gameId);
		console.log(searchedGames);
		// find the book in `searchedGames` state by the matching id
		const gameToSave = searchedGames.find((game) => game.gameId === gameId);

		// get token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			console.log(gameToSave);

			const { data } = await saveGame({
				variables: {
					gameId: `${gameToSave.gameId}`,
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
			<SearchedGame gameItem={searchedGames} />

			{/* <Container>
				<h2>
					{searchedGames.length
						? `Viewing ${searchedGames.length} results:`
						: ''}
				</h2>
				<CardColumns>
					{searchedGames.map((game) => {
						return (
							<Card key={game.gameId} border='dark'>
								{game.image ? (
									<Card.Img
										src={game.image}
										alt={`The cover for ${game.title}`}
										variant='top'
									/>
								) : null}
								<Card.Body>
									<Card.Title>{game.title}</Card.Title>
									<p className='small'>Creators: {game.creator}</p>
									<Card.Text>{game.description}</Card.Text>
									{Auth.loggedIn() && (
										<Button
											disabled={savedGameIds?.some(
												(savedId) => savedId === game.gameId
											)}
											className='btn-block btn-info'
											onClick={() => handleSaveGame(game.gameId)}
										>
											{savedGameIds?.some((savedId) => savedId === game.gameId)
												? 'Game Already Saved!'
												: 'Save This Game!'}
										</Button>
									)}
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container> */}
		</>
	);
};

export default SearchGame;
