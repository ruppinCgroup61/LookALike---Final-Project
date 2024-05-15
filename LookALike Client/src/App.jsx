import { Route, Routes } from 'react-router-dom'

import './App.css'
import FirstPage from '../Comps/FirstPage'
import LogIn from '../Comps/LogIn'
import Register from '../Comps/Register'
import HomePage from '../Comps/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/firstpage' element={<FirstPage />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/HomePage' element={<HomePage/>}></Route>

      </Routes>
    </>
  )
}

export default App
