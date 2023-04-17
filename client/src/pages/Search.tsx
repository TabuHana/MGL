import { useState, useContext } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import SearchItem from '../components/search/SearchItem';

import { Game, GamesContext } from '../context/GamesContext';
import GameItem from '../components/game/GameItem';
import Navbar from '../components/shared/Navbar';

const Search = () => {

	const [IDs, setIDs] = useState(getSavedGameIds());

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	const { games } = useContext(GamesContext);


	const handleSaveGame = async (game_id: number) => {
		const saved = games.find((game: Game) => game.id === game_id);

		try {
			if (saved === undefined) {
				return;
			}
			await saveGame({
				variables: {
					developer: saved.developer,
					freetogame_profile_url: saved.freetogame_profile_url,
					game_url: saved.game_url,
					genre: saved.genre,
					game_id: saved.id,
					platform: saved.platform,
					publisher: saved.publisher,
					short_description: saved.short_description,
					thumbnail: saved.thumbnail,
					title: saved.title,
				},
			});
			setIDs([...IDs, game_id]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Navbar />
			<SearchItem />
			<div className='browse'>
				{games.map((game: Game) => (
					<GameItem key={game.id} game={game} />
				))}
			</div>
		</>
	);
};

export default Search;
