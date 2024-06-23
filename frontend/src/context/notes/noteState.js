import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host="http://localhost:8000"
    const noteInitial = []

    //Add a Note
    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/v1/notes/addNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNjI3NWMzNGU1ZjU2MGQ2M2UwZTdlIn0sImlhdCI6MTcxMzgwMzkwM30.Lzl0yG3XlAp8FRz6FUXuNxqsF_1XIHS6-CfsJKjdfqg"
        },
        body: JSON.stringify({title, description, tag})
      });
  
  
      console.log("Adding a new note")
      const note = {
        "_id": "61322f119553781a8ca8d0e08",
        "user": "6131dc5e3e4037cd4734a0664",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2021-09-03T14:20:09.668Z",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    
    //Get all Note
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/v1/notes//fetchNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNjI3NWMzNGU1ZjU2MGQ2M2UwZTdlIn0sImlhdCI6MTcxMzgwMzkwM30.Lzl0yG3XlAp8FRz6FUXuNxqsF_1XIHS6-CfsJKjdfqg"
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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNjI3NWMzNGU1ZjU2MGQ2M2UwZTdlIn0sImlhdCI6MTcxMzgwMzkwM30.Lzl0yG3XlAp8FRz6FUXuNxqsF_1XIHS6-CfsJKjdfqg"
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyNjI3NWMzNGU1ZjU2MGQ2M2UwZTdlIn0sImlhdCI6MTcxMzgwMzkwM30.Lzl0yG3XlAp8FRz6FUXuNxqsF_1XIHS6-CfsJKjdfqg"
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = response.json();
  
      // Logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }}}

    const [notes, setNotes] = useState(noteInitial);
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;