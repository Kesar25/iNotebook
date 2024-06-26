import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host="http://localhost:8000"
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial);

    //Add a Note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/v1/notes/addNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const note = await response.json();    
      setNotes(notes.concat(note))
    }

    
    //Get all Note
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/v1/notes/fetchNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }


    const deleteNote =async (id) => {
      const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json =await response.json();
      console.log(json);
  
      console.log("Deleting the note with id" + id);
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
      // API Call 
      const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json =await response.json();
      console.log(json)
  
      // Logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
        }}
        setNotes(newNotes);}

  
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;