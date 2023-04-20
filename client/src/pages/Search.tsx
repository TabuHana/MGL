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

/* 
	Search needs to be able to 
		- save and remove games from user favorites
		- user clicks button, and the game is saved
		- user clicks button again, and the game is removed

		2 different buttons 
*/
