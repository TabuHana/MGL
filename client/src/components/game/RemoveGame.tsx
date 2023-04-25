// React
import { useContext } from 'react';

// Context
import { Game, GameContext } from '../../context/GameContext';

// Icon
import { FiHeart } from 'react-icons/fi';

type GameProps = {
	game: Game;
};

// () => check if saved if yes -> savegame btn if no delete game btn

const RemoveGame: React.FC<GameProps> = ({ game }) => {
	const { remove } = useContext(GameContext);

	return (
		<div className='browse-option'>
			<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

			<div className='label-btn'>
				<h1>{game.title}</h1>
				<button className='btn-red' onClick={() => remove(game.id)}>
					<FiHeart />
				</button>
			</div>
		</div>
	);
};
export default RemoveGame;
