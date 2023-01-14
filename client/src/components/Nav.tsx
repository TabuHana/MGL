import { Link } from 'react-router-dom';
import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import { IoGameController } from 'react-icons/io5';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const Navbar = () => {
	return (
		<nav className='nav'>
			<Link to='/' className='nav-brand'>
				<IoGameController size={30} />
				<h3>MyGamesList</h3>
			</Link>
			<div className='nav-menu'>
				{/* Other sizes */}
				{Auth.loggedIn() ? (
					<ul className='nav-menu-items'>
						<li>News</li>
						<li>Categories</li>
						<li>Your Games</li>
						<li>Logout</li>
					</ul>
				) : (
					<ul className='nav-menu-items'>
						<li>
							<Link to='/news'>News</Link>
						</li>
						<li>
							<Link to='/categories'>Categories</Link>
						</li>
						<li>
							<Link to='/signup'>Sign Up</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
					</ul>
				)}

				{/* Moble sizes */}
				<button className='nav-menu-toggle-mobile'>
					<HiOutlineBars3BottomRight size={30} />
				</button>
			</div>
		</nav>
	);
};

export default Navbar;