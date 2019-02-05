import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(res => {
        this.setState({ error: null })
        return res;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    erroConfirmedHandler = () => {
      this.setState({ error: null })
    }
    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.erroConfirmedHandler}>
            {this.state.error ? this.state.error.message: null}
        </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}


  export default withErrorHandler;