import HTMLComponent from '../BaseComponent';
import config from '../../../config/environment';
import PropTypes from '../PropTypes';
import path from 'path';
import axios from 'axios';

export default class PasswordResetEmail extends HTMLComponent {
  async renderHtml() {
    const {user, token} = this.props;
    const resetUrl = `${config.domain}/password/reset?user=${user.id}&token=${token}`;
    return `
      <div class="container">
        <div class="card card--full card--padded">
          We've received a request to reset your VotER password. If this was not you, you can ignore this email. The links below will be valid for one hour.
          <br />
          <br />
          You can <a href="${resetUrl}">click here to reset your password</a>
          <br />or follow this link:
          <br />
          <a href="${resetUrl}">${resetUrl}</a>
        </div>
      </div>
    `;
  }
  getDefaultSendOptions() {
    const {user} = this.props;
    return {
      To: user.email,
      From: `${config.email.name} <${config.email.address}>`,
      Subject: 'Password Reset for VotER'
    };
  }
  async send(options) {
    let body = await this.renderHtml();
    let sendOptions = this.getDefaultSendOptions();
    let data = {HtmlBody: body, ...sendOptions, ...options};
    await axios({
      method: 'POST',
      url: 'https://api.postmarkapp.com/email',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': config.token
      },
      data
    });
  }
}


PasswordResetEmail.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};


PasswordResetEmail.styles = path.join(__dirname, '../../styles/password-reset.css');
