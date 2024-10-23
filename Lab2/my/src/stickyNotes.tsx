import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { FavoriteList, toggleFavorite, ToggleTheme, ClickCounter} from './hooksExcercises'; 
import { FaHeart } from 'react-icons/fa';
import { NewLineKind } from 'typescript';

export const StickyNotes = () => {
    const [notes, setNotes] = useState<Note[]>(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        favorite: false, 
    };

    const [createNote, setCreateNote] = useState(initialNote);
    const [editedNote, setEditedNote] = useState<Note | null>(null);

    const createNoteHandler = (event: React.FormEvent) => { 
    event?.preventDefault(); 

    
    const newNote = { 
        ...createNote, id: notes.length, favorite: false  
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
    setCreateNote(initialNote);
    }; 

    const deleteNote = (id: number) => {
    setNotes((prevNotes) =>
        prevNotes.filter(note => note.id != id)
    );
    };

    const updateNote = (id: number, field: keyof Note, value: string) => {
        setNotes(prevNotes => 
            prevNotes.map(note =>
                note.id === id ? { ...note, [field]: value } : note
            )
        );
    };

    
    return (
    <div className='app-container'>
    <form className="note-form" onSubmit={createNoteHandler}>
        <div>
        <input
            placeholder="Note Title"
            onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })}
            required>
        </input>
        </div>

        <div>
        <textarea
            placeholder='Note Content'
            onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })}
            required>
        </textarea>
        </div>

    <div>
        <select
        onChange={(event) =>
            setCreateNote({ ...createNote, label: event.target.value as Label})}
        required>
        <option value={Label.personal}>Personal</option>
        <option value={Label.study}>Study</option>
        <option value={Label.work}>Work</option>
        <option value={Label.other}>Other</option>
        </select>
    </div>

        <div><button type="submit">Create Note</button></div>
    </form>

        <div className="notes-grid">
        {notes.map((note) => (
            <div
            key={note.id}
            className="note-item"
            data-testid={`note-${note.id}`}
            >
            <div className="notes-header">
                <button 
                    data-testid={`delete-note-${note.id}`} 
                    onClick = {() => deleteNote(note.id)}>x</button>
                <button onClick = { () => toggleFavorite(notes, note.id, setNotes)}>
                {note.favorite ? <FaHeart color = "red" /> : <FaHeart/>}
                </button> 
            </div>
            <blockquote 
                contentEditable={true} 
                data-testid={`editable-title-${note.id}`}
                onBlur={(e) => updateNote(note.id, 'title', e.currentTarget.innerText)}
            >
                <h2>{note.title}</h2>
            </blockquote>
            <blockquote 
                contentEditable={true} 
                data-testid={`editable-content-${note.id}`}
                onBlur={(e) => updateNote(note.id, 'content', e.currentTarget.innerText)}
            >
                <p>{note.content}</p>
            </blockquote>
            <blockquote 
            contentEditable={true} 
            data-testid={`editable-label-${note.id}`}
                onBlur={(e) => updateNote(note.id, 'label', e.currentTarget.innerText)}
            >
                <p>{note.label}</p>
            </blockquote>
            </div>
        ))}

        </div>
        <ToggleTheme></ToggleTheme>
        <FavoriteList notes = {notes }/>
    </div>

    );
}