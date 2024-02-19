
import { useContext } from 'react'
import './App.css'
import Public from './Apps/Public/Public'
import { TokenContext } from './Context/TokenContext'
import Private_home from './Apps/Private/Private.home'
import { Routes, Route, useParams } from 'react-router-dom'
import Settings from './Apps/Private/Settings/Settings'
import Profiles from './Pages/Profiles/Profiles'
import AddAuthor from './Pages/AddAuthor/AddAuthor'
import AddBook from './Pages/AddBook/AddBook'

function App() {
  const { name } = useParams();
  const { token, setToken } = useContext(TokenContext)
  if (token) {
    return (
      <Routes>
        <Route path='/*' element={<Private_home />} >
        </Route>
        <Route path='/profile/*' element={<Settings />}>
        </Route>
        <Route path='/add_author' element={<AddAuthor />} />
        <Route path='/add_book' element={<AddBook />} />
        <Route path="*" element={<h1>Not Page</h1>} />
      </Routes>

    )
  }
  return (
    <Public />
  )
}

export default App
