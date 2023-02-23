import React, { useContext } from 'react'
import {NavLink} from "react-router-dom";
import AuthContext from '../context/AuthContext';
 const Navbar = () => {
  const {isLoggedIn}=useContext(AuthContext)
  return (
    <nav>
       {isLoggedIn&& <NavLink to="/about">About</NavLink>}
        <NavLink to="/">Home</NavLink>
        {!isLoggedIn &&<NavLink to="/register">Register</NavLink>}
        {!isLoggedIn &&<NavLink to="/login">Login</NavLink>}
    </nav>
    )
}

export default Navbar