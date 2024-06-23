import React, { useContext } from 'react'
import { useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note, setNote]=useState({title:"", description:"", tag:""});

    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note);
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    

  return (
    <div>
      <div className='container my-3'>
      <h2>Create a Note</h2>
      <form className='my-3'>
  <div className="form-group mb-3">
    <label htmlFor="Title">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
    
  </div>
  <div className="form-group mb-3">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
  
    
    </div>
    </div>
  )
}

export default AddNote
