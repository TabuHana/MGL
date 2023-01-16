import Featured from '../components/Featured';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import SearchedGame from '../components/SearchedGame';
import SearchGame from './SearchGame';

const Home = () => {
	return (
		<>
			<Navbar />
			<Featured />
			<SearchGame />
		</>
	);
};
export default Home;
