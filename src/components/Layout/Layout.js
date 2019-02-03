import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Navbar from '../Navigation/Navbar/Navbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
  <Aux>
    <Navbar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;