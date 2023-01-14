import { HiMagnifyingGlass } from 'react-icons/hi2';

const Search = () => {
	return (
		<div className='search'>
			<input className='search-input' type='search' placeholder='Search' />
			<button className='search-button' type='button'>
				<HiMagnifyingGlass size={20} />
			</button>
		</div>
	);
};
export default Search;
