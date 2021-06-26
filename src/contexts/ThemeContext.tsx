import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
	children: ReactNode;
};

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
		const storagedTheme = localStorage.getItem('theme');

		return (storagedTheme ?? 'light') as Theme;
	});

	function toggleTheme() {
		setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
	}

	useEffect(() => {
		localStorage.setItem('theme', currentTheme);
	}, [currentTheme]);

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
