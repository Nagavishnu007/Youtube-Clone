import React, { useState } from 'react'
import Nav from './Components/NavBar/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

function App() {

   const[sidebar,setSidebar]=useState(true)

  return (
    <>
      <Nav setSidebar={setSidebar}/>

      <Routes>
          <Route path='/' element={<Home sidebar={sidebar}/>}/>
          <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </>
  )
}

export default App
