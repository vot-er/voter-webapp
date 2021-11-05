import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {SubmitButton} from '../../components';
import './bulk-update-page.scss';
import {bulkAssign} from '../../actions/kitActions';

export class BulkUpdatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isSubmitting: false,
      results: null
    };
  }
  getCodes() {
    return this.state.inputValue.replace(/[ ]*,[ ]*|[ ]+/g, '').split(/\n/g);
  }
  renderResults() {
    const {results} = this.state;
    if (!results) return null;
    return <table>
      <thead>
        <tr><th>Code</th><th>Kit</th><th>Status</th><th>Failure Reason</th></tr></thead>
      <tbody>{results.map((result, r) => this.renderResultRow(result, r))}</tbody>
    </table>;
  }
  renderResultRow(result, r) {
    return <tr key={r}>
      <td>{result.code}</td>
      <td>{result.kitId}</td>
      <td>{result.status}</td>
      <td>{result.failureReason}</td>
    </tr>;
  }
  async onFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      this.setState({
        isSubmitting: true
      });
      const {results} = await this.props.bulkAssign({codes: this.getCodes()});
      this.setState({
        results, isSubmitting: false
      });
    } catch(err) {
      console.error(err);
      this.setState({
        isSubmitting: false
      });
    }
  }
  render() {
    const {inputValue, isSubmitting} = this.state;
    return (
      <div className='fill fill-height flex-column bulk-update-page'>
        <h1>Bulk Assign Kits</h1>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <textarea value={inputValue} style={{width: 500, height: 400}} onChange={e => this.setState({inputValue: e.target.value})} placeholder="Add a list of line-separated codes to attach to kits without codes and marked for fulfillment."/>
          <div>
            <SubmitButton className="btn btn-primary signup-button" isSubmitting={isSubmitting} value="Bulk Update"/>
          </div>
        </form>
        {this.renderResults()}
      </div>
    );
  }
}

BulkUpdatePage.propTypes = {
  bulkAssign: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    bulkAssign: bindActionCreators(bulkAssign, dispatch),
  };
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(BulkUpdatePage));
