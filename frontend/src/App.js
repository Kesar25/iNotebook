import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import About from './components/About'
import Alert from './components/Alert'
import NoteState from './context/notes/noteState'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="this is an alert"/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App

