import { useState } from 'react'
import './App.css'
import NewGameModal from './NewGameModal';
import GameList from './GameList';
import Home from './Home';
import Login from './Login';
import GamePage from './GamePage';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/newgame" element={<NewGameModal/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/game/:gameName" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
