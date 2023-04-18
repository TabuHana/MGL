import { useContext } from 'react';

// Context
import { Game, GamesContext } from '../context/GamesContext';

// Components
import SearchBar from '../components/search/SearchBar';
import GameItem from '../components/game/GameItem';
import Navbar from '../components/shared/Navbar';

const Search = () => {
	const { games } = useContext(GamesContext);

	return (
		<>
			<Navbar />
			<SearchBar />
			<div className='browse'>
				{games.map((game: Game) => (
					<GameItem key={game.id} game={game} />
				))}
			</div>
		</>
	);
};

export default Search;
