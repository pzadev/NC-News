import { useState } from 'react'
import './App.css'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import Header from './Components/Header'
import Nav from './Components/Nav'
import Articles from './Components/Articles'

function App() {
 

  return (
    <>
    <Header/>
    <Nav/>
    <Routes>
    <Route path="/articles" element={<Articles />} />
    </Routes>
    </>
  )
}

export default App
