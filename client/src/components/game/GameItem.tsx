import { FiHeart } from 'react-icons/fi';
import { Game } from '../../context/GamesContext';
import { useContext } from 'react';
import { UsersContext } from '../../context/UsersContext';

type GameProps = {
	game: Game;
};


// () => check if saved if yes -> savegame btn if no delete game btn

const GameItem: React.FC<GameProps> = ({ game }) => {
	const { save } = useContext(UsersContext);

	return (
		<div className='browse-option' key={game.id}>
			<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

			<div className='label-btn'>
				<h1>{game.title}</h1>
				<button className='btn' onClick={() => save(game)}>
					<FiHeart />
				</button>
			</div>
		</div>
	);
};
export default GameItem;
