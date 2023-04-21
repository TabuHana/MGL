import { useState, useContext } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { GameContext } from '../../context/GameContext';

const SearchBar = () => {
	const { search } = useContext(GameContext);

	const [text, setText] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (text === '') {
			window.alert('Please input a search');
		} else {
			search(text);
		}
	};

	return (
		<div className='center'>
			<form onSubmit={handleFormSubmit}>
				<div className='search'>
					<input className='search-input' type='search' placeholder='Search' onChange={handleChange} />
					<button className='search-btn' type='submit'>
						<HiMagnifyingGlass size={20} />
					</button>
				</div>
			</form>
		</div>
	);
};
export default SearchBar;
