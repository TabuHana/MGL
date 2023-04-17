import { FiHeart } from 'react-icons/fi';
import { Game, GamesContext } from '../../context/GamesContext';
import { useContext } from 'react';

type GameProps = {
	game: Game;
};

const GameItem: React.FC<GameProps> = ({ game }) => {
	const { save } = useContext(GamesContext);

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
