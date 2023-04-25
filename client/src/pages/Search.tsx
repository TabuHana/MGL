// React
import { useContext } from 'react';

// Context
import { Game, GameContext } from '../context/GameContext';

// Components
import SearchBar from '../components/search/SearchBar';
import SaveGame from '../components/game/SaveGame';
import Navbar from '../components/shared/Navbar';

const Search = () => {
	const { game } = useContext(GameContext);

	return (
		<>
			<Navbar />
			<SearchBar />
			<div className='browse'>
				{game.map((game: Game) => (
					<SaveGame key={game.id} game={game} />
				))}
			</div>
		</>
	);
};

export default Search;