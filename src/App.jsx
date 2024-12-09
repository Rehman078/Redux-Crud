import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components/Index'
import AddBook from './components/AddBook'
import Update from './components/Update'
function App() {


  return (
 <BrowserRouter>
<Routes>
  <Route path='/' element={<Index/>}/>
 <Route path='/addbook' element={<AddBook/>}/>
 <Route path='/edit/:id' element={<Update/>}/>

</Routes>
 </BrowserRouter>
  )
}

export default App
