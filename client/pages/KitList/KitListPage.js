import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TopNav} from 'Components';
import {selectKits} from '../../selectors';
import {getAll as getKits} from '../../actions/kitActions';
import {goTo} from '../../actions/routerActions';
import './kit-list-page.scss';

export class KitsListPage extends React.Component {
  async componentDidMount() {
    const {kits} = this.props;
    await this.props.getKits();
    if (kits.length == 1) {
      this.props.goTo(`/kits/${kits[0].id}`);
    }
  }
  renderKitItem(kit) {
    return <div key={kit.id}>{kit.code}</div>;
  }
  renderNoKits() {
    return <div><div>{'It looks like you haven\'t ordered any kits yet.'}</div></div>;
  }
  render() {
    const {kits} = this.props;
    return (
      <div className="fill">
        <TopNav title="Kits"/>
        <div className="fill task-page">
          {kits.length == 0 ? this.renderNoKits() : null}
          <div>{kits.map(kit => this.renderKitItem(kit))}</div>
        </div>
      </div>
    );
  }
}

KitsListPage.propTypes = {
  kits: PropTypes.array.isRequired,
  getKits: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    kits: selectKits(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getKits: bindActionCreators(getKits, dispatch),
    goTo: bindActionCreators(goTo, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(KitsListPage));
