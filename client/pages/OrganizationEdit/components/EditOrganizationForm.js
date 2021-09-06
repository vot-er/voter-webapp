import React from 'react';
import PropTypes from 'prop-types';
import {SubmitButton} from '../../../components';

class EditOrganizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false
    };
  }
  isReadyToSubmit() {
    const {
      name, public: isPublic, orgName, orgPublic
    } = this.props.form;
    const nameChanged = name && name !== orgName;
    const publicChanged = isPublic !== null && isPublic !== orgPublic;
    return nameChanged || publicChanged;
  }
  onInputChange(e) {
    this.props.onChange(e.target.name, e.target.value);
  }
  async handleNativeSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      this.setState({
        isSubmitting: true
      });
      await this.props.onSubmit();
    } catch(err) {
      console.error(err);
    } finally {
      this.setState({
        isSubmitting: false
      });
    }
  }
  render() {
    const {
      name, public: isPublic, orgName, orgPublic
    } = this.props.form;
    const { isSubmitting } = this.state;
    return (
      <div>
        <form onSubmit={this.handleNativeSubmit.bind(this)}>
          <label className="form__label">Name</label>
          <input onChange={this.onInputChange.bind(this)} className="form__control" name="name" value={name ?? orgName}/>
          <label className="form__label">Public</label>
          <input type="checkbox" onChange={this.onInputChange.bind(this)} className="form__control" name="public" checked={isPublic ?? orgPublic} />
          <SubmitButton className="btn btn-primary signup-button" disabled={!this.isReadyToSubmit()} isSubmitting={isSubmitting} value="Edit Organization"/>
        </form>
      </div>
    );
  }
}

EditOrganizationForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EditOrganizationForm;
