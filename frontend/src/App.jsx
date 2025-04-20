import React from 'react'
import { Routes, Route, useLocation} from 'react-router-dom'
import Customer from './pages/Customer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Owner from './pages/Owner'
import Privateroute from './components/Privateroute'
import PublicRoute from './components/Publicroute'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import AboutUPCST from './components/AboutUPCST'
import AboutGrant from './components/AboutGrant'
import AboutTeam from './components/AboutTeam'
import AboutShield from './components/AboutShield'

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<PublicRoute><Home/></PublicRoute>} />
        <Route path="/about" element={<About/>} />
        <Route path="/about/upcst" element={<AboutUPCST/>} />
        <Route path="/about/grant" element={<AboutGrant/>} />
        <Route path="/about/team" element={<AboutTeam/>} />
        <Route path="/about/shield" element={<AboutShield/>} />
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route path="/customer" element={<Privateroute><Customer/></Privateroute>}/>
        <Route path="/owner" element={<Privateroute><Owner/></Privateroute>}/>
      </Routes>
    </>
  )
}

export default App
