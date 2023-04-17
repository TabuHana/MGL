import { FiHeart } from 'react-icons/fi';
import { Game } from '../../context/GamesContext';

type GameProps = {
	game: Game;
};

const GameItem: React.FC<GameProps> = ({ game }) => {
	return (
			<div className='browse-option' key={game.id}>
				<img className='browse-option-background' src={game.thumbnail} alt={game.title} />

				<div className='label-btn'>
					<h1>{game.title}</h1>
					{/* <button className='btn' onClick={() => handleSaveGame(game.id)}>
						<FiHeart />
					</button> */}
				</div>
			</div>
	);
};
export default GameItem;
