import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBulider extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchaseMode: false,
    loading: false
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(res => {
        this.setState({ ingredients: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] <= 0 ) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] - 1
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchaseMode: true});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
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
        this.setState({ loading: false, purchaseMode: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchaseMode: false });
      })
  }

  purchaseCancelHandler = () => {
    this.setState({purchaseMode: false});
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice} />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        continue={this.purchaseContinueHandler}
        cancel={this.purchaseCancelHandler} />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return(
      <Aux>
        <Modal show={this.state.purchaseMode} modalClosed={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBulider, axios);