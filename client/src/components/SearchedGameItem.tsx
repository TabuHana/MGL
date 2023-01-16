import Auth from '../utils/auth';
import { FiX, FiHeart } from 'react-icons/fi';

interface Props {
	gameTitle: string;
	gameImg: string;
	gameDev: string;
}

const SearchedGameItem: React.FC<Props> = ({ gameTitle, gameImg, gameDev }) => {
	return (
		<div className='browse-option'>
			<img className='browse-option-background' src={gameImg} alt={gameTitle} />
			{Auth.loggedIn() ? (
				<div className='label-btn'>
					<h1>{gameTitle}</h1>
					<button>
						<FiX />
					</button>
				</div>
			) : (
				<div className='label'>
					<h1>{gameTitle}</h1>
				</div>
			)}
		</div>
	);
};
export default SearchedGameItem;
