import React from 'react'
import './home.css'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className='home-container'>
            <div className='home-text'>
                <h1>Save Your Memories</h1>
                <small>While</small>
                <small>Creating new ones</small>
            </div>
            <div className='home-events'>
                <h2>Gallery</h2>
                <Link to ="/Virasat" className='gallerys'>Virasat</Link>
                <Link to="/Anubhav" className='gallerys'>Anubhav</Link>
                <Link to ="/Uttarayan" className='gallerys'>Uttarayan</Link>
            </div>
        </div>
    </div>
  )
}

export default Home