import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import { dummyNotesList } from './constants';
import {Label, Note} from './types'
import { notEqual } from 'assert';

export function ClickCounter() {
 const [count, setCount] = useState(0);

 const handleClick = () => {
   setCount(count + 1);
 };

 useEffect(() => {
   document.title = `You clicked ${count} times`;
 }, [count]);

 const theme = useContext(ThemeContext);
 return (
   <div
     style={{
       background: theme.background,
       color: theme.foreground,
       padding: "20px",
     }}
   >
     <p>You clicked {count} times </p>
     <button
       onClick={() => setCount(count + 1)}
       style={{ background: theme.foreground, color: theme.background }}
     >
       Click me
     </button>
   </div>
 );
}
export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        <ClickCounter />
      </ThemeContext.Provider>
    );
}
//export default ToggleTheme;

// export function toggleFavorite() { 
//      const [liked, setLiked] = useState(false); 

//      const toggleLike = () => { 
//          setLiked(!liked); 

// //     }; 
// //     return ( 
// //         <div> 
// //             <FaHeart
// //                 onClick = {toggleLike}
// //                 className = {'heart'}
// //     )
// // }

export const toggleFavorite = (
    notes: Note[],
    id: number,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
  ) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

export function FavoriteList({notes}: {notes: Note[]} ) { 
    //const [notes, setNotes] = useState<Note[]>(dummyNotesList);
    const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]); // State for favorite titles

    // useEffect to update favoriteTitles whenever notes change
    useEffect(() => {
        const updatedFavorites = notes.filter(note => note.favorite).map(note => note.title);
        setFavoriteTitles(updatedFavorites);
        console.log('Favorite titles updated:', updatedFavorites); 
    }, [notes]); 
    
    return ( 
        <div> 
            <h2> List of Favorites </h2> 
            <ul>
                {favoriteTitles.map((title, index) => (
                    <li key={index}>{title}</li> 
                ))}
            </ul>
        </div>
    ); 
}
//export default favorites;
