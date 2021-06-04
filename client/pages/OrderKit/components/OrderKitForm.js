import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {states} from '../../../../shared/utils';

export class OrderForm extends React.Component {
  isReadyToSubmit() {
    const {
      addressLine1, city, state, zipcode
    } = this.props.form;
    return addressLine1.length > 2 && city.length > 1 && state && zipcode.length >= 5;
  }
  onInputChange(e) {
    this.props.onChange(e.target.name, e.target.value);
  }
  onStateSelectChange({value}) {
    this.props.onChange('state', value);
  }
  getStateOptionFromValue(value) {
    return this.getStateOptions().filter(option => option.value == value)[0];
  }
  getStateOptions() {
    return states.map(state => ({
      value: state.abbreviation,
      label: state.name
    }));
  }
  handleNativeSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSubmit();
  }
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
        <form onSubmit={this.handleNativeSubmit.bind(this)}>
          <h1>Shipping Address</h1>
          <div style={{marginBottom: 18}}>{'We\'ll send your kit here.'}</div>
          <label className="form__label">Address Line 1</label>
          <input onChange={this.onInputChange.bind(this)} className="form__control" name="addressLine1" value={addressLine1} placeholder="Street Address or P.O. Box"/>
          <label className="form__label">Address Line 2</label>
          <input onChange={this.onInputChange.bind(this)} className="form__control" name="addressLine2" value={addressLine2} placeholder="Apartment/suite number, unit etc. (optional) "/>
          <div className="form__row">
            <div className="form__row__col form__row__col--left" style={{paddingRight: 8}}>
              <label className="form__label">City</label>
              <input onChange={this.onInputChange.bind(this)} className="form__control" name="city" value={city}/>
            </div>
            <div className="form__row__col form__row__col--right" style={{paddingLeft: 8}}>
              <label className="form__label">State</label>
              <Select options={this.getStateOptions()} onChange={e => this.onStateSelectChange(e)} className="form__control" name="state" value={this.getStateOptionFromValue(state)}/>
            </div>
          </div>
          <label className="form__label">Zipcode</label>
          <input onChange={this.onInputChange.bind(this)} className="form__control" name="zipcode" value={zipcode}/>

          <button type="submit" onClick={this.props.onSubmit.bind(this)} className="btn btn-primary signup-button" disabled={!this.isReadyToSubmit()}>Complete Order</button>
        </form>
      </div>
    );
  }
}

OrderForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default OrderForm;
