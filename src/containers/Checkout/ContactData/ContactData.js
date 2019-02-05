import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  onOrderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      customer: {
        name: 'Nate C',
        address: {
          street: 'fake street',
          zipCode: '334234',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      delivery: true
    }
    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false});
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({ loading: false});
      })
  }

  render(){
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
        <input className={classes.Input} type='email' name='email' placeholder='Your Email' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postal' placeholder='ZIP code' />
        <Button btnType='Success' clicked={this.onOrderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data:</h4>
          {form}
      </div>
    )
  }
}

export default ContactData;