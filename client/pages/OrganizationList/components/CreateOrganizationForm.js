import React from "react";
import PropTypes from "prop-types";
import { SubmitButton } from "../../../components";

export class CreateOrganizationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  isReadyToSubmit() {
    const { name } = this.props.form;
    return name.length > 2;
  }
  onInputChange(e) {
    this.props.onChange(e.target.name, e.target.value);
  }
  async handleNativeSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      this.setState({
        isSubmitting: true,
      });
      await this.props.onSubmit();
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        isSubmitting: false,
      });
    }
  }
  render() {
    const { name } = this.props.form;
    const { isSubmitting } = this.state;
    return (
      <div>
        <form onSubmit={this.handleNativeSubmit.bind(this)}>
          <label className="form__label">Name</label>
          <input
            onChange={this.onInputChange.bind(this)}
            className="form__control"
            name="name"
            value={name}
          />

          <SubmitButton
            className="btn btn-primary signup-button"
            disabled={!this.isReadyToSubmit()}
            isSubmitting={isSubmitting}
            value="Create Organization"
          />
        </form>
      </div>
    );
  }
}

CreateOrganizationForm.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateOrganizationForm;
