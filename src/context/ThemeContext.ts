import { Dispatch, SetStateAction, createContext } from 'react';

interface IThemeContext {
    darkTheme: boolean;
    setDarkTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<IThemeContext>({
  darkTheme: false,
  setDarkTheme: () => null,
});

export default ThemeContext;
