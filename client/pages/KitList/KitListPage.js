import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TopNav} from 'Components';
import {selectKits} from '../../selectors';
import {getAll as getKits} from '../../actions/kitActions';
import './kit-list-page.scss';

export class KitsListPage extends React.Component {
  componentDidMount() {
    this.props.getKits();
  }
  renderKitItem(kit) {
    return <div key={kit._id}>{kit.code}</div>;
  }
  render() {
    const {kits} = this.props;
    return (
      <div className="fill">
        <TopNav title="Kits"/>
        <div className="fill task-page">
          <div>{kits.map(kit => this.renderKitItem(kit))}</div>
        </div>
      </div>
    );
  }
}

KitsListPage.propTypes = {
  kits: PropTypes.array.isRequired,
  getKits: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    kits: selectKits(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getKits: bindActionCreators(getKits, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(KitsListPage));
