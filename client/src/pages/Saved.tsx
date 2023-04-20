import { useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// Context
import { Game, GameContext } from '../context/GameContext';

// Components
import Navbar from '../components/shared/Navbar';
import GameItem from '../components/game/GameItem';
import Spinner from '../components/shared/Spinner';

const Saved = () => {
	const { loading, data } = useQuery(QUERY_ME);

	const userData = data?.me;
	const userGames = data?.me?.savedGames;
	const { favorite, setFavorite } = useContext(GameContext);

	useEffect(() => {
		setFavorite(userGames);
	}, [favorite]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div>
				<Navbar />
				<h1>Welcome to {userData.username}'s Library</h1>
			</div>
			<div className='browse'>
				{favorite.map((game: Game) => (
					<GameItem key={game.id} game={game} />
				))}
			</div>
		</>
	);
};

export default Saved;

/*
	Saved needs to be able to only remove games
	there is no search function, so no need to be able to save from
	favorites
*/
