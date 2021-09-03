import React from 'react';
import {TopNav} from 'Components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import './scoreboard-page.scss';

export class ScoreboardPage extends React.Component {
  render() {
    const {userId, organizationId} = this.props;
    return (
      <div className="fill">
        <TopNav title="Scoreboard"/>
        <div className="fill scoreboard-page">
          {userId ? <iframe src={`${process.env.USER_SCOREBOARD_URL}#hide_parameters=user,organization,relative_date&relative_date=thisyear&user=${userId}&organization=${organizationId}`} frameBorder="0" width="100%" height="800" allowtransparency="true"></iframe> : null}
        </div>
      </div>
    );
  }
}

ScoreboardPage.propTypes = {
  userId: PropTypes.string,
  organizationId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    userId: state.auth.user ? state.auth.user.id : null,
    organizationId: state.auth.user ? state.auth.user.organization : null
  };
}


export default connect(
  mapStateToProps,
  null
)(ScoreboardPage);
