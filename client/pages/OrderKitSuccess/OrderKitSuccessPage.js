import React from 'react';
import {EmptyNavbar} from 'Components';
import './order-kit-success-page.scss';

export class OrderKitPage extends React.Component {
  render() {
    return (
      <div className="fill fill-height flex-column order-kit-page">
        <EmptyNavbar />
        <div className="fill order-kit-page__content">
          <div className="order-kit__form-container">
            <div>
              {'Congratulations! You\'ve ordered your healthy democracy kit.'}
            </div>
            <div>
              {'Our dashboard is still under construction. We\'ll contact you when it\'s ready..'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default OrderKitPage;
