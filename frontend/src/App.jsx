import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Seeker from './pages/Seeker'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Owner from './pages/Owner'
import Privateroute from './components/Privateroute'
function App() {
  
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/seeker" element={<Privateroute><Seeker/></Privateroute>}/>
        <Route path="/owner" element={<Privateroute><Owner/></Privateroute>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
