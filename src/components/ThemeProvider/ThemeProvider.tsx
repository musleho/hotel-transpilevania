'use client';

import ThemeContext from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [renderComponent, setRenderComponent] = useState<boolean>(false);

  useEffect(() => {
    const themeFromStorage: boolean = JSON.parse(localStorage.getItem('hotel-theme')!) as boolean || false;
    setDarkTheme(themeFromStorage);
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return (<></>);

  return(
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? 'dark' : ''} min-h-screen`}>
        <div className='dark:text-white dark:bg-black text-[#1E1E1E]'>
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;