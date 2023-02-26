import React from 'react'
import {Link} from 'react-router-dom'
import {GoTriangleDown} from 'react-icons/go'
import './navbar.css' 
import {AiOutlineInstagram , AiFillLinkedin , AiFillFacebook} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'
const Navbar = () => {
  const [drop , setDrop] = React.useState(false)
  const dropMenu = ()=>{
    return (
     <div className='menu' style={drop?{transform:" translateY(46%)"}:""}>
      <div className='drop-list'>
        <div>
          <span><Link to="/Virasat" className='links'>Virasat</Link></span>
          <span><Link to="/Anubhav" className='links'>Anubhav</Link></span>
          <span><Link to="/Uttarayan" className='links'>Uttarayan</Link></span>
        </div>
      </div>
     </div>
    )
  }
  return (
    <div className='navbar'>
      {drop && dropMenu()}
        <div className='navbar-container'>
            <div className='nav-links'>
               <Link to ="/" style={{textDecoration:"none" , color:"white"}}><span>Home</span></Link>
               <span>Contact</span>
               <button onClick={() => setDrop(prev => !prev)}>Gallery <GoTriangleDown className='drop-icon'/></button>
            </div>
            <div className='nav-icons'>
              <AiOutlineInstagram/>
              <BsFacebook/>
              <AiFillLinkedin/>
            </div>
        </div>
    </div>
  )
}

export default Navbar