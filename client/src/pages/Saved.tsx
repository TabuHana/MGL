// React
import { useContext } from 'react';

// GQL
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// Context
import { Game, GameContext } from '../context/GameContext';

// Components
import Navbar from '../components/shared/Navbar';
import RemoveGame from '../components/game/RemoveGame';
import Spinner from '../components/shared/Spinner';

const Saved = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const { favorite, setFavorite } = useContext(GameContext);

	const userData = data?.me;
	const userFav = data?.me?.savedGames;

	// setFavorite(userFav);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div>
				<Navbar />
				<hr />
				<h1>Welcome to {userData.username}'s Library</h1>
			</div>
			<div className='browse'>
				{userFav.map((game: Game) => (
					<RemoveGame game={game} />
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
