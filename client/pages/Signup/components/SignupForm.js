import React from "react";
import PropTypes, { func, bool, array } from "prop-types";
import Select from "react-select";
import { SubmitButton } from "Components";
import AlertCard from "../../../components/Alerts/AlertCard";
import passwordValidation from "../../../../shared/validation/password";
import { states } from "../../../../shared/utils";

export class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      organization: null,
      jobTitle: "",
      newOrganizationName: "",
      stateOfWork: null,
      passwordIsValid: false,
      passwordValidationMessage: "",
      error: "",
      isSubmitting: false,
      createNewOrganization: false,
    };
  }

  getStateOptions() {
    return states.map((state) => ({
      value: state.abbreviation,
      label: state.name,
    }));
  }

  getOrganizationOptions() {
    return this.props.organizations.map((organization) => ({
      value: organization.id,
      label: organization.name,
    }));
  }

  getJobTitleOptions() {
    return [
      {
        label: "Medical Student",
        value: "medicalStudent",
      },
      {
        label: "Resident",
        value: "resident",
      },
      {
        label: "Attending/Physician",
        value: "attending/physician",
      },
      {
        label: "Nurse",
        value: "nurse",
      },
      {
        label: "Nursing Student",
        value: "nursingStudent",
      },
      {
        label: "Physician Assistant",
        value: "physicianAssistant",
      },
      {
        label: "PA Student",
        value: "paStudent",
      },
      {
        label: "Social Worker",
        value: "socialWorker",
      },
      {
        label: "Social Work/MSW Student",
        value: "socialWorkStudent",
      },
      {
        label: "Pharmacist",
        value: "pharmacist",
      },
      {
        label: "Other",
        value: "other",
      },
    ];
  }

  toggleOrganizationCreate() {
    this.setState({
      createNewOrganization: !this.state.createNewOrganization,
    });
  }

  isReadyToSubmit() {
    return (
      this.state.email.length > 0 &&
      this.state.passwordIsValid &&
      this.state.firstName.length > 0 &&
      this.state.firstName.length > 0
    );
  }

  onChange = async (field, value) => {
    if (field === "password") {
      const { isValid: passwordIsValid, message: passwordValidationMessage } =
        passwordValidation(value);
      this.setState({
        passwordIsValid,
        passwordValidationMessage,
        password: value,
      });
    }

    return this.setState({ [field]: value });
  };

  onSubmit = async (e) => {
    const {
      email,
      password,
      firstName,
      lastName,
      stateOfWork,
      createNewOrganization,
      newOrganizationName,
      organization,
      isSubmitting,
      jobTitle,
    } = this.state;
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if (isSubmitting) return;
    const isReadyToSubmit = this.isReadyToSubmit();
    if (!isReadyToSubmit) {
      return this.setState({
        error:
          "Looks like something's missing. Fill out all required fields to continue.",
      });
    }
    try {
      this.setState({ isSubmitting: true });
      const signupBody = {
        email,
        password,
        firstName,
        lastName,
        stateOfWork,
        jobTitle: jobTitle ? jobTitle.value : "",
      };
      if (createNewOrganization) {
        signupBody.newOrganizationName = newOrganizationName;
      } else {
        signupBody.organization = organization ? organization.value : null;
      }
      await this.props.signup(signupBody);
    } catch (err) {
      console.error(err);
      this.setState({ isSubmitting: false });
      let errorMessage = "Something went wrong, please try again.";
      if (err.response && typeof err.response.data === "string") {
        errorMessage = err.response.data;
      }
      this.setState({
        error: errorMessage,
      });
    }
    return false;
  };

  renderOrganizationInput() {
    const { createNewOrganization, organization, newOrganizationName } =
      this.state;

    if (createNewOrganization) {
      return (
        <div style={{ marginBottom: 6 }}>
          <label className="form__label">Organization Name</label>
          <input
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
            name="newOrganizationName"
            className="form__control"
            style={{ marginBottom: 0 }}
            value={newOrganizationName}
            disabled={this.props.isAuthenticating}
            placeholder="Hospital, clinic, group name"
          />
          <a
            className="signup-card__helper-link"
            onClick={this.toggleOrganizationCreate.bind(this)}
          >
            Joining an existing organization?
          </a>
        </div>
      );
    }
    return (
      <div style={{ marginBottom: 6 }}>
        <label className="form__label">Organization</label>
        <Select
          options={this.getOrganizationOptions()}
          onChange={(e) => this.onChange("organization", e)}
          className="form__control"
          name="organization"
          value={organization}
        />
        <a
          id="create-new-org-link"
          className="signup-card__helper-link"
          onClick={this.toggleOrganizationCreate.bind(this)}
        >
          Organization not listed?
        </a>
      </div>
    );
  }

  render() {
    const isReadyToSubmit = this.isReadyToSubmit();
    const { isSubmitting, name, email, password, stateOfWork, jobTitle } =
      this.state;
    return (
      <div className="signup-card">
        <h1>{"Let's get you a healthy democracy kit."}</h1>
        <p className="helper-text">
          Placing an order takes less than 60 seconds.
        </p>
        <AlertCard type="error" message={this.state.error} />
        <form onSubmit={this.onSubmit}>
          <label className="form__label">First Name</label>
          <input
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
            name="firstName"
            className="form__control"
            value={name}
            disabled={this.props.isAuthenticating}
            placeholder="Elizabeth"
          />
          <label className="form__label">Last Name</label>
          <input
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
            name="lastName"
            className="form__control"
            value={name}
            disabled={this.props.isAuthenticating}
            placeholder="Blackwell"
          />
          <label className="form__label">Email</label>
          <input
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
            name="email"
            className="form__control"
            value={email}
            disabled={this.props.isAuthenticating}
            placeholder="your@workemail.com"
          />
          {this.renderOrganizationInput()}
          <div style={{ marginBottom: 8 }}>
            <label className="form__label">State Where You Work</label>
            <Select
              options={this.getStateOptions()}
              onChange={(e) => this.onChange("stateOfWork", e)}
              className="form__control"
              name="stateOfWork"
              id="state-of-work-select"
              value={stateOfWork}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label className="form__label">Job Title</label>
            <Select
              options={this.getJobTitleOptions()}
              onChange={(e) => this.onChange("jobTitle", e)}
              className="form__control"
              name="jobTitle"
              id="job-title-select"
              value={jobTitle}
            />
          </div>
          <label className="form__label">Create a Password</label>
          <input
            onChange={(e) => this.onChange(e.target.name, e.target.value)}
            className="form__control"
            type="password"
            name="password"
            value={password}
            disabled={this.props.isAuthenticating}
            placeholder="This will help you access information about your kit."
          />
          <AlertCard
            type="error"
            message={this.state.passwordValidationMessage}
          />
          <SubmitButton
            className="btn btn-primary signup-button"
            disabled={!isReadyToSubmit}
            isSubmitting={isSubmitting}
            value="Next: Shipping Address"
          />
        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: func.isRequired,
  organizations: array.isRequired,
  isAuthenticating: bool.isRequired,
  error: PropTypes.string,
};

export default SignupForm;
