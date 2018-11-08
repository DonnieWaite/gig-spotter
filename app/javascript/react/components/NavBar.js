import React from 'react';
import { Link } from 'react-router'
import BackButton from './BackButton'

const NavBar = props => {
  return(
    <div>
      <div className="navbar">
        <Link to='/' className="back-button">Bands</Link>
        <Link to='/bookers'> Bookers</Link>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default NavBar;
