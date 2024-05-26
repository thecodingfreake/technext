import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

export default function NavBar() {
    return (
        <nav className='navBar'>
            <img src={Logo} alt="" />
            <div className="navMid">
                <h5><a href='/'>Home</a></h5>
                <h5><a href="#prevquest">Prev-Quest</a></h5>
                <h5><a href="#mockexams">Mock-Exam</a></h5>
                <h5><a href="#resources">Resources</a></h5>
            </div>
            <div className='navRight'>
                <button><Link to='/signup'>Signup</Link></button>
                <Link to='/login'>Login</Link>
            </div>
        </nav>
    )
}