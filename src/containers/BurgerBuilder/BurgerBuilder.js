import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';


class BurgerBulider extends Component {

  state = {
    ingredients: {
      cheese: 2,
      bacon: 1,
      meat: 2,
      salad: 1,
    }
  }

  render() {
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBulider;