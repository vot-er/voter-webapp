"use strict";

import { User, Organization, Kit, Sequelize } from "../../models";
import config from "../../config/environment";
import jwt from "jsonwebtoken";
import moment from "moment";
import emailer from "../../email";
import PasswordResetEmail from "../../email/components/PasswordReset/PasswordResetEmail";
import { applyPatch } from "../../utils/patch";
import { everyAction } from '../../everyAction';
const Op = Sequelize.Op;

/**
 * Get list of users
 * restriction: 'admin' or part of business
 */
export async function index(req, res, next) {
  try {
    const users = await User.findAll({});
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
}

export async function show(req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: {
        model: Organization,
        as: "Organization",
      },
    });
    if (!user) return res.status(404).end();
    return res.status(200).json(user);
  } catch (e) {
    return next(e);
  }
}

/**
 * Creates a new user
 */
export async function create(req, res, next) {
  try {
    const {
      password,
      email: unformattedEmail,
      firstName,
      lastName,
      organization: organizationId,
      newOrganizationName,
      occupation,
      jobTitle,
    } = req.body;
    if (!unformattedEmail || typeof unformattedEmail !== "string") {
      return res.status(422).send("Must provide an email address.");
    }
    const email = unformattedEmail.toLowerCase();
    let user = await User.findOne({
      where: {
        email,
      },
    });
    const userExistsAndIsVerified = user && user.get("role") !== "unverified";
    if (userExistsAndIsVerified)
      return res.status(403).send("User with email already exists.");
    if (!user) {
      user = User.build({
        provider: "local",
        role: "unverified",
      });
    }
    user.set("password", password);
    user.set("email", email);
    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("jobTitle", jobTitle);
    user.set("occupation", occupation);
    let employer = newOrganizationName;
    if (newOrganizationName && organizationId) {
      return res
        .status(400)
        .send(
          "Cannot both create a new organization and join an existing one."
        );
    } else if (!newOrganizationName && !organizationId) {
      return res
        .status(400)
        .send("You must enter an organization name or join an existing one.");
    } else if (newOrganizationName) {
      const organizationToJoin = await Organization.create({
        name: newOrganizationName,
        public: false,
      });
      user.organization = organizationToJoin.id;
    } else {
      const organizationToJoin = await Organization.findOne({
        where: {
          id: organizationId,
        },
      });
      if (!organizationToJoin)
        return res.status(400).send("Invalid organization id provided.");

      user.organization = organizationToJoin.id;
      employer = organizationToJoin.name;
    }

    try {
      const res = await everyAction({
        method: "POST",
        url: "/people/findOrCreate",
        data: {
          firstName,
          lastName,
          emails: [{ email }],
          employer,
          occupation,
          jobTitle,
        },
      });
      const { vanId } = res.data;
      user.vanId = vanId;
      await everyAction({
        method: "POST",
        url: `/people/${vanId}/canvassResponses`,
        data: {
          canvassContext: { omitActivistCodeContactHistory: true },
          responses: [{
            type: "ActivistCode",
            action: "Apply",
            activistCodeId: "EID52D2C4F", // HasTrackableHDK
          }],
        },
      });
    } catch (err) {
      console.error(err);
    }

    user = await user.save();
    const token = jwt.sign({ id: user.id }, config.secrets.session, {
      expiresIn: 60 * 60 * 5,
    });
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).end();
    }
    await user.destroy();
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
}

/**
 * Change a users password
 */
export async function changePassword(req, res, next) {
  try {
    let userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      await user.save();
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch (e) {
    return next(e);
  }
}

/**
 * Change a users password
 */
export async function updateMyProfile(req, res, next) {
  try {
    const user = await User.scope("withSecrets").findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) return res.status(401).end();
    const patch = req.body;
    applyPatch(user, patch, { allowedKeys: ["name"] });
    await user.save();
    return res.status(200).json({
      id: user.get("id"),
      name: user.get("name"),
      role: user.get("role"),
    });
  } catch (e) {
    return next(e);
  }
}

export async function requestPasswordReset(req, res, next) {
  try {
    const email = decodeURIComponent(req.query.email);
    const user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: email,
        },
      },
      attributes: [
        "id",
        "email",
        "passwordResetToken",
        "passwordResetTokenExpiresAt",
      ],
    });
    if (!user) return res.status(200).end(); // Do not reveal there is no user.
    user.generatePasswordResetToken();
    await user.save();
    const token = user.get("passwordResetToken");
    await emailer.send(PasswordResetEmail, { user: user.toJSON(), token });
    return res.status(200).end();
  } catch (e) {
    return next(e);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { userId, token: passwordResetToken } = req.query;
    if (!passwordResetToken) return res.status(400).end();
    const { newPassword } = req.body;
    const user = await User.findOne({
      where: { id: userId, passwordResetToken },
      attributes: ["id", "passwordResetTokenExpiresAt"],
    });
    if (!user) return res.status(401).end();
    const resetTokenIsExpired =
      !user.get("passwordResetTokenExpiresAt") ||
      moment(user.get("passwordResetTokenExpiresAt")).isBefore(moment());
    if (resetTokenIsExpired) return res.status(401).end();
    user.set("password", newPassword);
    user.set("passwordResetToken", null);
    user.set("passwordResetTokenExpiresAt", null);
    await user.save();
    return res.status(200).end();
  } catch (e) {
    return next(e);
  }
}

export async function verifyResetToken(req, res, next) {
  try {
    const { userId, token: passwordResetToken } = req.query;
    if (!passwordResetToken) return res.status(400).end();
    const user = await User.findOne({
      where: { id: userId, passwordResetToken },
      attributes: ["passwordResetTokenExpiresAt"],
    });
    if (!user) return res.status(401).end();
    const resetTokenIsExpired =
      !user.get("passwordResetTokenExpiresAt") ||
      moment(user.get("passwordResetTokenExpiresAt")).isBefore(moment());
    if (resetTokenIsExpired) return res.status(401).end();
    return res.status(200).end();
  } catch (e) {
    return next(e);
  }
}

export async function changeRole(req, res, next) {
  try {
    const { userId } = req.params;
    var newRole = String(req.body.role);
    if (config.userRoles.indexOf(newRole) === -1) {
      return res.status(403).send(`Cannot set unknown role ${newRole}.`);
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).end();
    user.set("role", newRole);
    await user.save();
    return res.status(200).json(user.toJSON());
  } catch (e) {
    return next(e);
  }
}

export async function changeOrganization(req, res, next) {
  try {
    const { userId } = req.params;
    const { organization } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).end();
    user.set("organization", organization);
    await user.save();
    return res.status(200).json(user.toJSON());
  } catch (e) {
    return next(e);
  }
}

/**
 * Get my info
 */
export async function me(req, res, next) {
  try {
    var userId = req.user.id;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "name", "email", "role", "provider", "organization"],
    });
    if (!user) return res.status(401).end();
    return res.json(user.dataValues);
  } catch (e) {
    return next(e);
  }
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect("/");
}
