import React from 'react';
import classes from './Navbar.module.css';
import Logo from '../../Logo/Logo';

const navbar = ( props ) => (
  <header className={classes.Navbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      nav items....
    </nav>
  </header>
);

export default navbar;