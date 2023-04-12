import Auth from '../../utils/auth';

export type SavedGamesProps = {
	developer: string;
	freetogame_profile_url: string;
	game_url: string;
	genre: string;
	id: number;
	platform: string;
	publisher: string;
	short_description: string;
	thumbnail: string;
	title: string;
};

const SavedGames: React.FC<SavedGamesProps> = ({ thumbnail, title }) => {
	return (
		<div className='browse-option'>
			<img className='browse-option-background' src={thumbnail} alt={title} />

			<div className='label-btn'>
				<h1>{title}</h1>
				{/* <button className='btn' onClick={() => handleSaveGame(game.id)}> */}
					{/* <FiHeart /> */}
				{/* </button> */}
			</div>
		</div>
	);
};
export default SavedGames;
