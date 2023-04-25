import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_GAME = gql`
	mutation saveGame(
		$developer: String!
		$freetogame_profile_url: String!
		$game_url: String!
		$genre: String!
		$id: Int!
		$platform: String!
		$publisher: String!
		$short_description: String!
		$thumbnail: String!
		$title: String!
	) {
		saveGame(
			developer: $developer
			freetogame_profile_url: $freetogame_profile_url
			game_url: $game_url
			genre: $genre
			id: $id
			platform: $platform
			publisher: $publisher
			short_description: $short_description
			thumbnail: $thumbnail
			title: $title
		) {
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

export const REMOVE_GAME = gql`
	mutation removeGame($id: Int!) {
		removeGame(id: $id) {
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
