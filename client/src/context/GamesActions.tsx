import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;
// const API_HOST = process.env.REACT_APP_API_HOST;
// const API_TOKEN = process.env.REACT_APP_API_TOKEN;

// const gameData = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'X-RapidAPI-Host': API_HOST,
// 		'X-RapidAPI-Key': API_TOKEN,
// 	},
// });

// export const searchGames = async (text: string) => {
// 	const response = await gameData.get(`/games?category=${text}`);

// 	console.log(response.data);
// 	return response.data;
// };

// export const getUserAndRepos = async (login) => {
// 	const [user, repos] = await Promise.all([
// 		github.get(`/users/${login}`),
// 		github.get(`/users/${login}/repos`),
// 	]);

// 	return { user: user.data, repos: repos.data };
// };
