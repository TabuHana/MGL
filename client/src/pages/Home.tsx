import Featured from '../components/Featured';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import SearchedGame from '../components/SearchedGame';

const Home = () => {
	return (
		<>
			<Navbar />
			<Featured />
			<Search />
			<SearchedGame />
		</>
	);
};
export default Home;
