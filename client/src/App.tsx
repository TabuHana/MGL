import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Context
import GameProvider from './context/GameContext';

// Pages
import Search from './pages/Search';
import Saved from './pages/Saved';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';

// Construct GraphQL API endpoint
const httpLink = createHttpLink({
	uri: 'http://localhost:5000/graphql',
});

// Construct request middleware & attach JWT token to every request
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
	// Set up client to execute `authLink` middleware prior to request API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<GameProvider>
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
			</GameProvider>
		</ApolloProvider>
	);
}

export default App;
