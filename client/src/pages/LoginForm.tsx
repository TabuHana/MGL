// React
import { useState } from 'react';

// GQL
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

// Icon
import { IoGameController } from 'react-icons/io5';

const LoginForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });

	const { email, password } = formData;

	const [login, { error }] = useMutation(LOGIN_USER);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { data } = await login({
				variables: { ...formData },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormData({
			email: '',
			password: '',
		});
	};

	return (
		<div className='container'>
			<div className='form-container'>
				<div className='logo'>
					<IoGameController size={80} />
					<h1 className='logo-title'>MGL</h1>
				</div>
				<form className='form-helper' onSubmit={handleSubmit}>
					<div className='form'>
						<input
							className='form-input'
							type='email'
							id='email'
							name='email'
							value={email}
							placeholder='Email'
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form'>
						<input
							className='form-input'
							type='password'
							id='password'
							name='password'
							value={password}
							placeholder='Password'
							onChange={handleChange}
							required
						/>
					</div>
					<div className='form-btn-helper'>
						<button className='form-btn' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default LoginForm;
