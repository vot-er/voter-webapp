import React from 'react';
import PropTypes, {func, bool} from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import AlertCard from '../../../components/Alerts/AlertCard';
import passwordValidation from '../../../../shared/validation/password';
import {states} from '../../../../shared/utils';

export class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      organization: '',
      stateOfWork: null,
      passwordIsValid: false,
      passwordValidationMessage: '',
      error: '',
      isSubmitting: false
    };
  }

  getStateOptions() {
    return states.map(state => ({
      value: state.abbreviation,
      label: state.name
    }));
  }

  isReadyToSubmit() {
    return this.state.email.length > 0
      && this.state.passwordIsValid
      && this.state.firstName.length > 0 && this.state.lastName.length > 0;
  }

  onChange = async(field, value) => {
    switch (field) {
    case 'password':
      const {isValid: passwordIsValid, message: passwordValidationMessage} = passwordValidation(value);
      this.setState({
        passwordIsValid,
        passwordValidationMessage
      });
      return this.setState({password: value});
    default:
      return this.setState({[field]: value});
    }
  }

  onSubmit = async e => {
    const {
      email, password, name, isSubmitting
    } = this.state;
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if (isSubmitting) return;
    const isReadyToSubmit = this.isReadyToSubmit();
    if (!isReadyToSubmit) {
      return this.setState({
        error: 'Looks like something\'s missing. Fill out all required fields to continue.'
      });
    }
    try {
      this.setState({isSubmitting: true});
      await this.props.signup({email, password, name});
    } catch(err) {
      console.error(err);
      this.setState({isSubmitting: false});
      let errorMessage = 'Something went wrong, please try again.';
      if (err.response && typeof err.response.data === 'string') {
        errorMessage = err.response.data;
      }
      this.setState({
        error: errorMessage
      });
    }
    return false;
  }

  render() {
    const isReadyToSubmit = this.isReadyToSubmit();
    const {isSubmitting, stateOfWork} = this.state;
    return (
      <div className="signup-card">
        <h1>{'Let\'s get you a healthy democracy kit.'}</h1>
        <AlertCard type="error" message={this.state.error} />
        <form onSubmit={this.onSubmit}>
          <div className="form__row">
            <div className="form__row__col form__row__col--left">
              <label className="form__label">First Name</label>
              <input onChange={e => this.onChange(e.target.name, e.target.value)} name="firstName" className="form__control" value={this.state.name} disabled={this.props.isAuthenticating} placeholder="Jane"/>
            </div>
            <div className="form__row__col form__row__col--right">
              <label className="form__label">Last Name</label>
              <input onChange={e => this.onChange(e.target.name, e.target.value)} name="lastName" className="form__control" value={this.state.name} disabled={this.props.isAuthenticating} placeholder="Smith"/>
            </div>
          </div>
          <label className="form__label">Email</label>
          <input onChange={e => this.onChange(e.target.name, e.target.value)} name="email" className="form__control" value={this.state.email} disabled={this.props.isAuthenticating} placeholder="e.g. your@workemail.com"/>
          <label className="form__label">Organization Name</label>
          <input onChange={e => this.onChange(e.target.name, e.target.value)} className="form__control" name="organization" value={this.state.organization} disabled={this.props.isAuthenticating} placeholder="Your hospital, clinic, practice, etc."/>
          <div style={{marginBottom: 8}}>
            <label className="form__label">State Where You Work</label>
            <Select options={this.getStateOptions()} onChange={e => this.onChange('stateOfWork', e)} className="form__control" name="stateOfWork" value={stateOfWork}/>
          </div>
          <label className="form__label">Password</label>
          <input onChange={e => this.onChange(e.target.name, e.target.value)} className="form__control" type="password" name="password" value={this.state.password} disabled={this.props.isAuthenticating} placeholder="This helps us secure your kit data."/>
          <AlertCard type="error" message={this.state.passwordValidationMessage} />
          <button type="submit" className="btn btn-primary signup-button" disabled={!isReadyToSubmit || isSubmitting}>Next: Add Shipping Address</button>
          Already registered? <Link to="/login">Login.</Link>
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: func.isRequired,
  isAuthenticating: bool.isRequired,
  error: PropTypes.string
};

export default SignupForm;
