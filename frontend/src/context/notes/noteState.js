import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const noteInitial = [{
        "_id": {
            "$oid": "6626aa791a75cb49a9bf1cdc"
        },
        "title": "First Note",
        "description": "This is a demo note",
        "tag": "Science",
        "date": {
            "$date": "2024-04-22T18:20:41.994Z"
        },
        "__v": 0

    },
    {
        "_id": {
          "$oid": "6626aa891a75cb49a9bf1cde"
        },
        "title": "First Note",
        "description": "This is a demo note",
        "tag": "Science",
        "date": {
          "$date": "2024-04-22T18:20:57.982Z"
        },
        "__v": 0
      },
      {
          "_id": {
            "$oid": "6626aa891a75cb49a9bf1cde"
          },
          "title": "First Note",
          "description": "This is a demo note",
          "tag": "Science",
          "date": {
            "$date": "2024-04-22T18:20:57.982Z"
          },
          "__v": 0
        },
        {
            "_id": {
              "$oid": "6626aa891a75cb49a9bf1cde"
            },
            "title": "First Note",
            "description": "This is a demo note",
            "tag": "Science",
            "date": {
              "$date": "2024-04-22T18:20:57.982Z"
            },
            "__v": 0
          },
          {
              "_id": {
                "$oid": "6626aa891a75cb49a9bf1cde"
              },
              "title": "First Note",
              "description": "This is a demo note",
              "tag": "Science",
              "date": {
                "$date": "2024-04-22T18:20:57.982Z"
              },
              "__v": 0
            }]

    //Add a Note
    const addNote=(note)=>{
        setNotes(notes.push(note))
    }

    //Delete a Note
    const deleteNote=()=>{

    }

    //Edit a Note
    const editNote=()=>{

    }

    const [notes, setNotes] = useState(noteInitial);
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;