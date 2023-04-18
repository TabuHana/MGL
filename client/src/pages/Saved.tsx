import Spinner from '../components/shared/Spinner';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

import Auth from '../utils/auth';
import SavedGames from '../components/saved/SavedGames';

import { Game } from '../context/GamesContext';
import Navbar from '../components/shared/Navbar';
import GameItem from '../components/game/GameItem';

const Saved = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const [removeGame, { error }] = useMutation(REMOVE_GAME);

	const userData = data?.me;
	const userGames = data?.me?.savedGames;

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div>
				<Navbar />
				<h1>Welcome to {userData.username}'s Library</h1>
			</div>
			{userGames.map((game: Game) => (
				<GameItem key={game.id} game={game} />
				// <SavedGames
				// 	key={game.id}
				// 	developer={game.developer}
				// 	freetogame_profile_url={game.freetogame_profile_url}
				// 	game_url={game.game_url}
				// 	genre={game.genre}
				// 	id={game.id}
				// 	platform={game.platform}
				// 	publisher={game.publisher}
				// 	short_description={game.short_description}
				// 	thumbnail={game.thumbnail}
				// 	title={game.title}
				// />
				// <div className='browse-option' key={game.id}>
				// 	<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

				// 	<div className='label-btn'>
				// 		<h1>{game.title}</h1>
				// 		{/* <button className='btn' onClick={() => handleSaveGame(game.id)}> */}
				// 		{/* <FiHeart /> */}
				// 		{/* </button> */}
				// 	</div>
				// </div>
			))}
		</>
	);
};

export default Saved;
