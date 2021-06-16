import React from 'react';
import PropTypes, {func, bool} from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {SubmitButton} from 'Components';
import AlertCard from '../../../components/Alerts/AlertCard';
import passwordValidation from '../../../../shared/validation/password';
import {states} from '../../../../shared/utils';

export class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      organizationName: '',
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
      && this.state.name.length > 0;
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
      email, password, name, stateOfWork, organizationName, isSubmitting
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
      await this.props.signup({email, password, name, stateOfWork, organizationName});
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
    const {
      isSubmitting, name, email, password, stateOfWork, organizationName
    } = this.state;
    return (
      <div className="signup-card">
        <h1>{'Let\'s get you a healthy democracy kit.'}</h1>
        <AlertCard type="error" message={this.state.error} />
        <form onSubmit={this.onSubmit}>
          <label className="form__label">Name</label>
          <input
            onChange={e => this.onChange(e.target.name, e.target.value)}
            name="name"
            className="form__control" value={name} disabled={this.props.isAuthenticating} placeholder="Elizabeth Blackwell"/>
          <label className="form__label">Email</label>
          <input
            onChange={e => this.onChange(e.target.name, e.target.value)}
            name="email"
            className="form__control" value={email} disabled={this.props.isAuthenticating} placeholder="your@workemail.com"/>
          <label className="form__label">Organization Name</label>
          <input
            onChange={e => this.onChange(e.target.name, e.target.value)}
            className="form__control"
            name="organizationName" value={organizationName} disabled={this.props.isAuthenticating} placeholder="Your hospital, clinic, practice, etc."/>
          <div style={{marginBottom: 8}}>
            <label className="form__label">State Where You Work</label>
            <Select options={this.getStateOptions()} onChange={e => this.onChange('stateOfWork', e)} className="form__control" name="stateOfWork" value={stateOfWork}/>
          </div>
          <label className="form__label">Password</label>
          <input
            onChange={e => this.onChange(e.target.name, e.target.value)}
            className="form__control"
            type="password"
            name="password"
            value={password}
            disabled={this.props.isAuthenticating}
            placeholder="This helps us secure your kit data."/>
          <AlertCard type="error" message={this.state.passwordValidationMessage} />
          <SubmitButton className="btn btn-primary signup-button" disabled={!isReadyToSubmit} isSubmitting={isSubmitting} value="Next: Shipping Address"/>
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
