import React from 'react'
import{BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './components/Home'
import Card from './components/Card'
import Error from './components/Error'
import SearchDemo from './components/SearchDemo'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='anime/:id' element={<Card/>}/>
     

      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App