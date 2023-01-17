//@ts-ignore
import {
	Jumbotron,
	Container,
	CardColumns,
	Card,
	Button,
} from 'react-bootstrap';
import Spinner from '../components/Spinner';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { removeGameId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedGame = () => {
	const { loading, data } = useQuery(QUERY_ME);
	const [removeGame, { error }] = useMutation(REMOVE_GAME);

	const userData = data?.me || {};

	// create function that accepts the book's mongo _id value as param and deletes the book from the database
	const handleDeleteGame = async (gameId: string) => {
		// get token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const data = await removeGame({
				variables: { gameId },
			});

			// upon success, remove game's id from localStorage
			removeGameId(gameId);
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div>Hello</div>
		</>
	);
};

export default SavedGame;
