import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Virasat from './galleries/Virasat'
import {BrowserRouter , Route , Routes , Navigate} from 'react-router-dom'
import Anubhav from './galleries/Anubhav'
import Uttarayan from './galleries/Uttarayan'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
            <Route index element = {<Home/>} />
            <Route path='/Virasat' element = {<Virasat/>} />
            <Route path='/Anubhav'element = {<Anubhav/>} />
            <Route path='/Uttarayan' element = {<Uttarayan/>} />
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App