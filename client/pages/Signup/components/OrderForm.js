import React from 'react';
import PropTypes from 'prop-types';

export class OrderForm extends React.Component {
  render() {
    const {
      name,
      addressLine1,
      addressLine2,
      zipcode,
      city,
      state
    } = this.props.form;
    return (
      <div>
        <h1>Get A Healthy Democracy Kit</h1>
        <label className="form__label">Full Name</label>
        <input onChange={e => this.props.onChange(e)} name="name" className="form__control" value={name} placeholder="Jane Smith"/>
        <label className="form__label">Address Line 1</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="addressLine1" value={addressLine1} placeholder="Street Address or P.O. Box"/>
        <label className="form__label">Address Line 2</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="addressLine2" value={addressLine2} placeholder="Apartment/suite number, unit etc. (optional) "/>
        <label className="form__label">Zipcode</label>
        <input onChange={e => this.props.onChange(e)} className="form__control" name="zipcode" value={zipcode}/>
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
        <button type="submit" className="btn btn-primary signup-button">Next</button>

      </div>
    );
  }
}

OrderForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OrderForm;
