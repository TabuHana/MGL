// React
import { useContext } from 'react';

// Context
import { Game, GameContext } from '../../context/GameContext';

// Icon
import { FiHeart } from 'react-icons/fi';

type GameProps = {
	game: Game;
};

const GameItem: React.FC<GameProps> = ({ game }) => {
	const { save } = useContext(GameContext);

	return (
		<div className='browse-option' key={game.id}>
			<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

			<div className='label-btn'>
				<h1>{game.title}</h1>
				<button className='btn-green' onClick={() => save(game.id)}>
					<FiHeart />
				</button>
			</div>
		</div>
	);
};
export default GameItem;
