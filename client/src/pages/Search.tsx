import { useContext } from 'react';

// Context
import { Game, GameContext } from '../context/GameContext';

// Components
import SearchBar from '../components/search/SearchBar';
import GameItem from '../components/game/GameItem';
import Navbar from '../components/shared/Navbar';

const Search = () => {
	const { game } = useContext(GameContext);

	return (
		<>
			<Navbar />
			<SearchBar />
			<div className='browse'>
				{game.map((game: Game) => (
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
