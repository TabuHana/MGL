import { gql } from '@apollo/client';

export const QUERY_ME = gql`
	{
		me {
			_id
			username
			email
			savedGames {
				developer
				freetogame_profile_url
				game_url
				genre
				id
				platform
				publisher
				short_description
				thumbnail
				title
			}
		}
	}
`;
