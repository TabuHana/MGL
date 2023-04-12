import Featured from '../components/Featured';
import Navbar from '../components/Navbar';
import Search from '../components/search/Search';
import SearchedGame from '../components/saved/SearchedGame';
import SearchGame from '../components/search/SearchGame';

const Home = () => {
	return (
		<>
			<Navbar />
			<Featured />
			{/* Featured coming soon */}
			<SearchGame />
		</>
	);
};
export default Home;
