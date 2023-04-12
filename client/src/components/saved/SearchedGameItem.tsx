import Auth from '../../utils/auth';
import { FiX, FiHeart } from 'react-icons/fi';
import { useState } from 'react';

interface Props {
	// gameId: number;
	gameTitle: string;
	gameImg: string;
	gameDev: string;
	// handleClick: (id: number | undefined | null) => void;
}

const SearchedGameItem: React.FC<Props> = ({
	// gameId,
	gameTitle,
	gameImg,
	gameDev,
	// handleClick,
}) => {
	const [clicked, setClicked] = useState<number | null>();

	// handleClick(clicked);

	return (
		<div className='browse-option'>
			<img className='browse-option-background' src={gameImg} alt={gameTitle} />
			{Auth.loggedIn() ? (
				<div className='label-btn'>
					<h1>{gameTitle}</h1>
					{/* <button className='btn' onClick={() => setClicked(gameId)}>
						<FiHeart />
					</button> */}
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
