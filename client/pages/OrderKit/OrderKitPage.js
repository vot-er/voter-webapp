import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {EmptyNavbar} from 'Components';
import './order-kit-page.scss';
import {create as createKit} from '../../actions/kitActions';
import {goTo} from '../../actions/routerActions';
import OrderKitForm from './components/OrderKitForm';

export class OrderKitPage extends React.Component {
  constructor() {
    super();
    this.state = {
      addressLine1: '',
      addressLine2: '',
      zipcode: '',
      city: '',
      state: ''
    };
  }
  onFormChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  async handleSubmit() {
    try {
      const {
        addressLine1, addressLine2, zipcode, city, state
      } = this.state;
      await this.props.createKit({
        shippingAddress: {
          addressLine1, addressLine2, zipcode, city, state
        }
      });
      this.props.goTo('/signup/order/success');
    } catch(err) {
      console.error(err);
    }
  }
  render() {
    return (
      <div className="fill fill-height flex-column order-kit-page">
        <EmptyNavbar />
        <div className="fill order-kit-page__content">
          <div className="order-kit__form-container">
            <div>
              <OrderKitForm form={this.state} onChange={this.onFormChange.bind(this)} onSubmit={this.handleSubmit.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderKitPage.propTypes = {
  createKit: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};


function mapDispatchToProps(dispatch) {
  return {
    createKit: bindActionCreators(createKit, dispatch),
    goTo: bindActionCreators(goTo, dispatch)
  };
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(OrderKitPage));
