import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import ClickCounter from './ClickCounter';

function ToggleTheme() { 
    const [currentTheme, setCurrentTheme] = useState(themes.light); 

    const toggleTheme = () => { 
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light); 
    }; 

    return ( 
        <ThemeContext.Provider value={currentTheme}> 
            <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>Toggle Theme</button> 
            <ClickCounter /> 
        </ThemeContext.Provider>
    ); 
}

export default ToggleTheme;
