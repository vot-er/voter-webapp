import React from "react";
import { EmptyNavbar } from "Components";
import "./order-kit-success-page.scss";
import check from "../../assets/check.png";

export class OrderKitSuccessPage extends React.Component {
  render() {
    return (
      <div className="fill fill-height flex-column order-kit-success-page">
        <EmptyNavbar />
        <div className="fill order-kit-success-page__content">
          <div className="order-kit-success-page__text-container">
            <img src={check} className="order-kit-success-page__check" />
            <p className="order-kit-success-page__text--congratulations">
              Congratulations!
            </p>
            <p>{"You've ordered your healthy democracy kit."}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderKitSuccessPage;
