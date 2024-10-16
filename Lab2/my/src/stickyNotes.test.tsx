import { render, screen, fireEvent, } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("reads a note", () => {
  render(<StickyNotes />);
  const createNoteTitleInput = screen.getByPlaceholderText("Note Title"); 
  const createNoteContentTextarea = screen.getByPlaceholderText("Note Content"); 
  const createNoteButton = screen.getByText("Create Note"); 


  const notes = [ 
    {title: "Note 1", content: "Content for Note 1", label: "Personal "}, 
    {title: "Note 2", content: "Content for Note 2", label: "Work "}, 
    {title: "Note 3", content: "Content for Note 3", label: "Study "}, 
  ]

  notes.forEach(note => {
    fireEvent.change(createNoteTitleInput, { target: { value: note.title } });
    fireEvent.change(createNoteContentTextarea, { target: { value: note.content } });
    fireEvent.click(createNoteButton);
  });

  notes.forEach(note => {
    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(note.content)).toBeInTheDocument();
  }); 
});

  test("update a note", () => { 
    render(<StickyNotes />);  
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title"); 
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content"); 
    const createNoteButton = screen.getByText("Create Note"); 

    fireEvent.change(createNoteTitleInput, { target: { value: "Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content" } });
    fireEvent.click(createNoteButton);

    // expect(screen.getByTestId("Note")).toBeInTheDocument();
    // expect(screen.getByText("Content")).toBeInTheDocument();

    const editableNote = screen.getByTestId("editable-title-1")
    const editableContent = screen.getByTestId("editable-content-1");
        
    fireEvent.focus(editableNote); 
    fireEvent.input(editableNote, {target: {innerText: "Updated Title"}}); 
    fireEvent.blur(editableNote); 

    fireEvent.focus(editableContent); 
    fireEvent.input(editableContent, {target: {innerText: "Updated Content"}}); 
    fireEvent.blur(editableContent); 
    
    // const labelSelect = screen.getByRole("combobox");
    // fireEvent.change(labelSelect, { target: { value: "Work" } }); 

    expect(editableNote.innerHTML).toContain("Updated Title");
    expect(editableContent.innerHTML).toContain("Updated Content");
   // expect(screen.getByText("Work")).toBeInTheDocument();
  });
  
  test("delete a note", () => { 
    render(<StickyNotes />)
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title"); 
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content"); 
    const createNoteButton = screen.getByText("Create Note"); 

    const deleteNote = screen.getByTestId("delete-note-1");
    const Note = screen.getByTestId("note-1"); 

    expect(deleteNote).toBeInTheDocument(); 


    fireEvent.change(createNoteTitleInput, { target: { value: "Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content" } });
    fireEvent.click(createNoteButton);

    fireEvent.click(deleteNote);
    expect(screen.queryByTestId("note-1")).not.toBeInTheDocument();  }); 
}); 

