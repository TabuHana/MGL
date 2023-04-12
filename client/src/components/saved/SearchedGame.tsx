import SearchedGameItem from './SearchedGameItem';
import { useState } from 'react';

type Games = {
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
	_id?: string;
};

type SearchedGameProps = {
	gameItem: Games[];
	// data: (gameId: unknown) => Promise<false | undefined>;
};

const SearchedGame: React.FC<SearchedGameProps> = ({ gameItem }) => {
	return (
		<div className='browse'>
			{gameItem.map((game) => (
				<SearchedGameItem key={game._id} gameTitle={game.title} gameImg={game.thumbnail} gameDev={game.developer} />
			))}
		</div>
	);
};
export default SearchedGame;
