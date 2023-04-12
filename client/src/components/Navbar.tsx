import { Link } from 'react-router-dom';
import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import { IoGameController } from 'react-icons/io5';

import Auth from '../utils/auth';

const Navbar = () => {
	return (
		<nav className='nav'>
			<Link to='/' className='nav-brand'>
				<IoGameController size={30} />
				<h3>FreeGamesList</h3>
			</Link>
			<div className='nav-menu'>
				{/* Other sizes */}
				{Auth.loggedIn() ? (
					<ul className='nav-menu-items'>
						<li>
							<Link to='/saved'>Your Games</Link>
						</li>
						<li>
							<Link to='/' onClick={Auth.logout}>
								Logout
							</Link>
						</li>
					</ul>
				) : (
					<ul className='nav-menu-items'>
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
