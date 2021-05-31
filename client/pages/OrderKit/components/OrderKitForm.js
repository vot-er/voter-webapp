import React from 'react';
import PropTypes from 'prop-types';

export class OrderForm extends React.Component {
  render() {
    const {
      addressLine1,
      addressLine2,
      zipcode,
      city,
      state
    } = this.props.form;
    return (
      <div>
        <h1>Shipping Address</h1>
        <div>{'We\'ll send your kit here.'}</div>
        <label className="form__label">Address Line 1</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="addressLine1" value={addressLine1} placeholder="Street Address or P.O. Box"/>
        <label className="form__label">Address Line 2</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="addressLine2" value={addressLine2} placeholder="Apartment/suite number, unit etc. (optional) "/>
        <div className="form__row">
          <div className="form__row__col">
            <label className="form__label">City</label>
            <input onChange={e => this.props.onChange(e)} className="form__control" name="city" value={city}/>
          </div>
          <div className="form__row__col">
            <label className="form__label">State</label>
            <input onChange={e => this.props.onChange(e)} className="form__control" name="state" value={state}/>
          </div>
        </div>
        <label className="form__label">Zipcode</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="zipcode" value={zipcode}/>

        <button type="submit" className="btn btn-primary signup-button">Complete Order</button>
      </div>
    );
  }
}

OrderForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderForm;
