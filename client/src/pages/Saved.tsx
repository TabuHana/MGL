import { useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// Context
import { Game } from '../context/GamesContext';
import { UsersContext } from '../context/UsersContext';

// Components
import Navbar from '../components/shared/Navbar';
import GameItem from '../components/game/GameItem';
import Spinner from '../components/shared/Spinner';

const Saved = () => {
	const { loading, data } = useQuery(QUERY_ME);

	const userData = data?.me;
	const userGames = data?.me?.savedGames;
	const { favorites, setFavorites } = useContext(UsersContext);

	useEffect(() => {
		setFavorites(userGames);
	}, [favorites]);

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
				{favorites.map((game: Game) => (
					<GameItem key={game.id} game={game} />
				))}
			</div>
		</>
	);
};

export default Saved;
