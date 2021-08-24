'use strict';

import cryptoUtil from '../utils/crypto';
import passwordIsValid from '../../shared/validation/password';
import moment from 'moment';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import config from '../config/environment';

var validatePresenceOf = function(value) {
  return value && value.length;
};

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'unverified'
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isStrong: async password => {
          const response = await passwordIsValid(password);
          if (!response.isValid) {
            throw new Error('Password is not strong enough.');
          }
        }
      }
    },
    provider: DataTypes.STRING,
    salt: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetTokenExpiresAt: DataTypes.DATE,
    emailVerificationToken: DataTypes.STRING,
    emailVerificationTokenExpiresAt: DataTypes.DATE,
    stateOfWork: DataTypes.TEXT,
    jobTitle: DataTypes.TEXT,
    organization: {
      type: DataTypes.UUID,
      references: {
        model: 'organizations',
        key: 'id'
      }
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['passwordResetToken', 'passwordResetTokenExpiresAt', 'emailVerificationToken', 'emailVerificationTokenExpiresAt', 'salt', 'password'] }
    },
    scopes: {
      withSecrets: {
        attributes: {}
      }
    },
    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile() {
        return {
          name: this.name,
          role: this.role
        };
      },

      // Non-sensitive info we'll be putting in the token
      token() {
        return {
          id: this.id,
          role: this.role
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeBulkCreate(users) {
        var promises = users.map(user => user.updatePassword());
        return Promise.all(promises);
      },
      beforeCreate(user) {
        return user.updatePassword();
      },
      beforeUpdate(user) {
        if (user.changed('password')) {
          return user.updatePassword();
        }
        return Promise.resolve();
      }
    }
  });

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  User.prototype.authenticate = async function(password) {
    const encrypted = await this.encryptPassword(password);
    return this.password === encrypted;
  };


  User.prototype.getSignedToken = function() {
    return jwt.sign({ id: this.get('id') }, config.secrets.session, {
      expiresIn: 60 * 60 * 5
    });
  };

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  User.prototype.makeSalt = function() {
    return cryptoUtil.makeSalt();
  };

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  User.prototype.encryptPassword = function(password) {
    return cryptoUtil.encryptPassword(password, this.salt);
  };

  /**
   * Update password field
   *
   * @param {Function} fn
   * @return {String}
   * @api public
   */
  User.prototype.updatePassword = async function() {
    // Handle new/update passwords
    if (!this.password) return null;

    if (!validatePresenceOf(this.password)) {
      throw new Error('Invalid password');
    }

    // Make salt with a callback
    const salt = await this.makeSalt();
    this.salt = salt;
    const hashedPassword = await this.encryptPassword(this.password);
    this.password = hashedPassword;
    return;
  };

  User.prototype.generatePasswordResetToken = async function() {
    this.set('passwordResetToken', randomstring.generate({length: 18}));
    this.set('passwordResetTokenExpiresAt', moment().add(1, 'hour').toDate());
    return;
  };

  User.prototype.verifyPasswordResetToken = function(token) {
    const passwordResetToken = this.get('passwordResetToken');
    const matches = passwordResetToken && passwordResetToken === token;
    const isExpired = moment(this.get('passwordResetTokenExpiresAt')).isBefore(moment());
    if (matches && !isExpired) return true;
    return false;
  };

  User.prototype.generateEmailVerificationToken = function() {
    this.set('emailVerificationToken', randomstring.generate({length: 18}));
    this.set('emailVerificationTokenExpiresAt', moment().add(6, 'hour').toDate());
  };

  User.prototype.verifyEmailVerificationToken = function(token) {
    const emailVerificationToken = this.get('emailVerificationToken');
    const matches = emailVerificationToken && emailVerificationToken === token;
    const isExpired = moment(this.get('emailVerificationTokenExpiresAt')).isBefore(moment());
    if (matches && !isExpired) return true;
    return false;
  };

  User.prototype.verify = async function() {
    this.set('role', 'user');
    this.set('emailVerificationToken', null);
    this.set('emailVerificationTokenExpiresAt', null);
    await this.save();
  };

  User.associate = function(models) {
    User.belongsTo(models.Organization, {as: 'Organization', sourceKey: 'organization', foreignKey: 'id'});
  };

  return User;
};
