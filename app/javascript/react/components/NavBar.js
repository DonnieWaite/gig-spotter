import React from 'react';
import { Link } from 'react-router'
import BackButton from './BackButton'

const NavBar = props => {
  return(
    <div>
      <div className="navbar">
        <BackButton />
        <Link to='/' className="back-button">Home</Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;
