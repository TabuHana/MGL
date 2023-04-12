import axios from 'axios';

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GAMES_URL = `https://free-to-play-games-database.p.rapidapi.com/api`;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
		'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
	},
};

const options2 = {
	'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
	'X-RapidAPI-Key': 'dec105ee6bmshca936e1844266f4p195268jsn40a6cdad4497',
};

const games = axios.create({
	baseURL: GAMES_URL,
	headers: options2,
});

export const searchGames = async (text: string) => {
	const params = new URLSearchParams({
		q: text,
	});

	const response = await games.get(`/games?category=${params}`);

	return response.data.items;
};

// export const searchGames = async (searchInput: string) => {
// 	try {
// 		const games = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${searchInput}`, options);

// 		if (!games.ok) {
// 			throw new Error('something went wrong!');
// 		}

// 		const items = await games.json();

// 		// setSearchedGames(items);
// 		return items;
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
