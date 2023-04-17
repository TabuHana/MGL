import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Saved from './pages/Saved';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import GamesProvider from './context/GamesContext';
import Search from './pages/Search';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: 'http://localhost:5000/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<GamesProvider>
				<Router>
					<>
						<Routes>
							<Route path='/' element={<Search />} />
							<Route path='/saved' element={<Saved />} />
							<Route path='/login' element={<LoginForm />} />
							<Route path='/signup' element={<SignupForm />} />
						</Routes>
					</>
				</Router>
			</GamesProvider>
		</ApolloProvider>
	);
}

export default App;
