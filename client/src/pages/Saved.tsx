import Spinner from '../components/Spinner';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { removeGameId } from '../utils/localStorage';

import Auth from '../utils/auth';
import SavedGames from '../components/saved/SavedGames';

import { Game } from '../context/GamesContext';

const SavedGame = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const [removeGame, { error }] = useMutation(REMOVE_GAME);

	const userData = data?.me;
	const userGames = data?.me?.savedGames;

	// create function that accepts the book's mongo _id value as param and deletes the book from the database
	// const handleDeleteGame = async (gameId: string) => {
	// 	// get token
	// 	const token = Auth.loggedIn() ? Auth.getToken() : null;

	// 	if (!token) {
	// 		return false;
	// 	}

	// 	try {
	// 		const data = await removeGame({
	// 			variables: { gameId },
	// 		});

	// 		// upon success, remove game's id from localStorage
	// 		removeGameId(gameId);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div>
				<h1>Welcome to {userData.username}'s Library</h1>
			</div>
			{userGames.map((game: Game) => (
				<SavedGames
					key={game.id}
					developer={game.developer}
					freetogame_profile_url={game.freetogame_profile_url}
					game_url={game.game_url}
					genre={game.genre}
					id={game.id}
					platform={game.platform}
					publisher={game.publisher}
					short_description={game.short_description}
					thumbnail={game.thumbnail}
					title={game.title}
				/>
			))}
		</>
	);
};

export default SavedGame;
