import React from 'react';
import OrderKitForm from './components/OrderKitForm';
import {EmptyNavbar} from 'Components';
import './order-kit-page.scss';

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
  render() {
    return (
      <div className="fill fill-height flex-column order-kit-page">
        <EmptyNavbar />
        <div className="fill order-kit-page__content">
          <div className="order-kit__form-container">
            <div>
              <OrderKitForm form={this.state} onChange={this.onFormChange.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default OrderKitPage;
