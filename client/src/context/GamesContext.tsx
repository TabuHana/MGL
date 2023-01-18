// to-do
import { createContext, useState } from 'react';

const mglContext = createContext({});

export const mglProvider: React.FC = ({ children }) => {
	const [list, setList] = useState([]);

	return (
		<mglContext.Provider
			value={{
				list,
				setList
			}}
		>
			{children}
		</mglContext.Provider>
	);
};

export default mglContext;
