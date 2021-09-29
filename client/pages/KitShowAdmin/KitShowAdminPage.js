import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {getOne as getKit, patch as patchKit} from '../../actions/kitActions';
import {TopNav} from 'Components';
import './kit-show-admin-page.scss';

export class KitPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kit: null,
      showCodeEditor: false,
      formCodeValue: '',
      isSubmitting: false
    };
  }
  static getDerivedStateFromProps(props) {
    const kitId = props.match.params.kitId;
    const kit = props.kitsById[kitId];
    return {
      kit
    };
  }
  getKit() {
    this.props.getKit(this.props.match.params.kitId);
  }
  componentDidMount() {
    this.getKit();
  }
  render() {
    const {kit} = this.state;
    if (!kit) return null;
    return (
      <div className="fill">
        <TopNav title="Kit"/>
        <div className="fill task-page">
          <div>{kit.user.name}</div>
          {kit.shippingAddress ? this.renderAddress(kit.shippingAddress) : 'No address provided.'}
          <div>Code: {this.renderCode()}</div>
          <div>{this.renderOrderInfo()}</div>
        </div>
      </div>
    );
  }

  renderOrderInfo() {
    return (
      <div>
        <label>
          <input data-test-id="orderInfo" type="checkbox" name="shipped" checked={this.state.kit.shipped} onChange={this.toggleShipped.bind(this)} />
          Shipped
        </label>
        <label>
          <input data-test-id="orderInfo" type="checkbox" name="noFulfill" checked={!this.state.kit.fulfill} onChange={this.toggleFulfill.bind(this)} />
          Do Not Fulfill
        </label>
      </div>
    );
  }

  async toggleShipped() {
    const {match} = this.props;
    const isShipped = !this.state.kit.shipped;
    await this.props.patchKit(match.params.kitId, {
      isShipped
    });
  }

  async toggleFulfill() {
    console.log(this.state.kit.fulfill)
    const {match} = this.props;
    const fulfill = !this.state.kit.fulfill;
    await this.props.patchKit(match.params.kitId, {
      fulfill
    });
  }

  renderCode() {
    const {
      showCodeEditor, kit, formCodeValue
    } = this.state;
    if (!showCodeEditor) {
      return <span>{kit.code ? kit.code : '-'} <a href="#" onClick={this.openCodeEditor.bind(this)}>Edit</a></span>;
    }
    return <form onSubmit={this.submitCode.bind(this)}><input className="internal-control" value={formCodeValue} onChange={e => this.changeFormCode(e.target.value)}/> <button type="submit" disabled={this.state.isSubmitting}>Save</button></form>;
  }

  renderAddress(address) {
    return <div>
      {address.addressLine1}
      <br/>
      {address.addressLine2}
      <br/>
      {address.city}, {address.state} {address.postalCode}
    </div>;
  }
  openCodeEditor(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showCodeEditor: true
    });
  }
  changeFormCode(value) {
    this.setState({
      formCodeValue: value
    });
  }
  async submitCode(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isSubmitting) return;
    try {
      this.setState({
        isSubmitting: true
      });
      const {formCodeValue: code} = this.state;
      const {match} = this.props;
      await this.props.patchKit(match.params.kitId, {
        code
      });
      this.setState({
        isSubmitting: false,
        showCodeEditor: false
      });
    } catch(err) {
      console.error(err);
      this.setState({
        isSubmitting: false
      });
    }
  }
}

KitPage.propTypes = {
  getKit: PropTypes.func.isRequired,
  patchKit: PropTypes.func.isRequired,
  kitsById: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    kitsById: state.kits.byId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getKit: bindActionCreators(getKit, dispatch),
    patchKit: bindActionCreators(patchKit, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(KitPage));
