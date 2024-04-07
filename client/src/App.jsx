import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Profile from './pages/profile/Profile'
import Signin from './pages/signin/Signin'
import Signout from './pages/signout/Signout'
import Header from './components/Header/Header'
import Privateroute from './components/Header/privateroute'


export default function App() {
  return (
  <BrowserRouter>
  <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign-out' element={<Signout/>}/>
    <Route path='/sign-in' element={<Signin/>}/>
    <Route path='/about' element={<About/>}/>
    <Route element={<Privateroute/>}>
    <Route path='/profile' element={<Profile/>}/>

    </Route>

   

  </Routes>
  
  </BrowserRouter>
  )
  
}
