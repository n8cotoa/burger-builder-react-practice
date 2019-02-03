import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Navbar from '../Navigation/Navbar/Navbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }
 
  render() {
    return (
      <Aux>
        <Navbar openDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }

}

export default Layout;