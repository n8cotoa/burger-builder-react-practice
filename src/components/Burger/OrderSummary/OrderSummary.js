import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: "capitalize"}}>{igKey}:</span> {this.props.ingredients[igKey]}
          </li>);
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total Price: <strong>${this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button 
          btnType={'Success'}
          clicked={this.props.continue}>Continue</Button>
        <Button 
          btnType={'Danger'}
          clicked={this.props.cancel}>Cancel</Button>
      </Aux>
    )
  };
}

export default OrderSummary;