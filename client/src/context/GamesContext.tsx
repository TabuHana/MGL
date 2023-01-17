// to-do
import { createContext, useState } from 'react';

const mglContext = createContext();

export const mglProvider = ({ children }) => {
	const [list, setList] = useState([]);

	return (
		<mglContext.Provider
			value={{
				list,
			}}
		>
			{children}
		</mglContext.Provider>
	);
};

export default mglContext;
