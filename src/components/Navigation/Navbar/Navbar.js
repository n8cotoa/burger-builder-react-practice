import React from 'react';
import classes from './Navbar.module.css';

const navbar = ( props ) => (
  <header className={classes.Navbar}>
    <div>Menu</div>
    <div>Logo</div>
    <nav>
      nav items....
    </nav>
  </header>
);

export default navbar;