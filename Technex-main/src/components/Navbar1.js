import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Navbar1 = () => {
  return (
    <nav className='navBar'>
            <img src={Logo} alt="" />
            <div className="navMid">
            </div>
            <div className='navRight'>
                <button><Link to='/signup'>Signup</Link></button>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
  )
}

export default Navbar1