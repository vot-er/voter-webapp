import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { hideError } from "../actions/alertActions";
import ErrorCard from "../components/Alerts/ErrorCard";
import LoginPage from "./Login/LoginPage";
import SignupPage from "./Signup/SignupPage";
import EmailVerificationPage from "./EmailVerification/EmailVerificationPage";
import PasswordResetRequestPage from "./PasswordResetRequest/PasswordResetRequestPage";
import PasswordResetSuccessPage from "./PasswordResetSuccess/PasswordResetSuccessPage";
import PasswordResetPage from "./PasswordReset/PasswordResetPage";
import KitListPage from "./KitList/KitListPage";
import KitShowPage from "./KitShow/KitShowPage";
import KitShowAdminPage from "./KitShowAdmin/KitShowAdminPage";
import AccountPage from "./Account/AccountPage";
import ScoreboardPage from "./Scoreboard/ScoreboardPage";
import OrderKitPage from "./OrderKit/OrderKitPage";
import OrderKitSuccessPage from "./OrderKitSuccess/OrderKitSuccessPage";
import OrganizationListPage from "./OrganizationList/OrganizationListPage";
import BulkUpdatePage from "./BulkUpdate/BulkUpdatePage";
import BulkShipPage from "./BulkShip/BulkShipPage";
import UserShowAdminPage from "./UserShowAdmin/UserShowAdminPage";
import NotFoundPage from "./NotFoundPage";
import {
  ErrorBoundary,
  PrivateRoute,
  PrivateRouteContainer,
  SideNav,
} from "Components";
import EditOrganizationPage from "./OrganizationEdit/EditOrganizationPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const { isAuthenticated, isLoaded, user } = this.props;
    const isAdmin = user && user.role == "admin";
    return isLoaded ? (
      <ErrorBoundary>
        <ErrorCard />
        <Switch>
          <PrivateRoute
            path="/login"
            component={LoginPage}
            isAuthorized={!isAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute
            path="/signup"
            exact
            component={SignupPage}
            isAuthorized={!isAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute
            path="/signup/verify"
            exact
            component={EmailVerificationPage}
            isAuthorized={!isAuthenticated}
            redirectTo="/"
          />
          <PrivateRoute
            exact
            path="/password/request"
            component={PasswordResetRequestPage}
            isAuthorized={!isAuthenticated}
            redirectTo="/"
          />
          <Route exact path="/password/reset" component={PasswordResetPage} />
          <Route
            exact
            path="/password/reset/success"
            component={PasswordResetSuccessPage}
          />
          <PrivateRoute
            path="/signup/order"
            isAuthorized={isAuthenticated}
            redirectTo="/login"
            exact
            component={OrderKitPage}
          />
          <PrivateRoute
            path="/signup/order/success"
            isAuthorized={isAuthenticated}
            redirectTo="/login"
            exact
            component={OrderKitSuccessPage}
          />
          <PrivateRouteContainer
            isAuthorized={isAuthenticated}
            redirectTo="/signup"
            withParams
          >
            <div className="fill flex-row app__row">
              <SideNav />
              <div className="fill flex-column">
                <div className="fill flex-row">
                  <Switch>
                    <Route path="/account" exact component={AccountPage} />
                    <Route path="/kits" exact component={KitListPage} />
                    <Route path="/kits/:kitId" exact component={KitShowPage} />
                    <Route path="/scores" component={ScoreboardPage} />
                    <PrivateRoute
                      path="/"
                      exact
                      redirectTo="/scores"
                      isAuthenticated={false}
                    />
                    <PrivateRoute
                      path="/organizations"
                      exact
                      component={OrganizationListPage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <PrivateRoute
                      path="/organizations/:organizationId"
                      exact
                      component={EditOrganizationPage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <PrivateRoute
                      path="/admin/kits/:kitId"
                      exact
                      component={KitShowAdminPage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <PrivateRoute
                      path="/admin/users/:userId"
                      exact
                      component={UserShowAdminPage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <PrivateRoute
                      path="/admin/bulk-update"
                      exact
                      component={BulkUpdatePage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <PrivateRoute
                      path="/admin/bulk-ship"
                      exact
                      component={BulkShipPage}
                      isAuthorized={isAdmin}
                      redirectTo="/404"
                    />
                    <Route path="/" component={NotFoundPage} />
                  </Switch>
                </div>
              </div>
            </div>
          </PrivateRouteContainer>
        </Switch>
      </ErrorBoundary>
    ) : null;
  }
}

App.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
  hideError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  message: state.alert.err,
  type: "error",
});

const mapDispatchToProps = (dispatch) => ({
  hideError: () => dispatch(hideError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
