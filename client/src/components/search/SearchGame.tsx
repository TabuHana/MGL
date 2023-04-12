import { useState, useContext } from 'react';

import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../../utils/localStorage';
import Search from './Search';
import { FiHeart } from 'react-icons/fi';

import { Game, GamesContext } from '../../context/GamesContext';

const SearchGame = () => {
	const [searchedGames, setSearchedGames] = useState<Game[]>([]);
	const [IDs, setIDs] = useState(getSavedGameIds());

	const [saveGame, { error }] = useMutation(SAVE_GAME);

	const { games } = useContext(GamesContext);

	// useEffect(() => {
	// 	return () => saveGameIds(IDs);
	// });

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
			<Search />
			<div className='browse'>
				{games.map((game: Game) => {
					return (
						<div className='browse-option' key={game.id}>
							<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

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
