"use strict";

import { Organization, User } from "../../models";
import { Sequelize } from "sequelize";

export async function index(req, res, next) {
  try {
    const where = {};
    if (!req.user || req.user.role !== "admin" || req.query.public) {
      where.public = true;
    }
    const organizations = await Organization.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("users.organization")),
            "memberCount",
          ],
        ],
      },
      include: [{ model: User, attributes: [] }],
      where,
      group: ["organization.id"],
      order: [["name"]],
    });
    return res.status(200).json({ data: organizations });
  } catch (e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const { name } = req.body;
    const organization = await Organization.create({
      name,
      public: req.body.public,
    });
    return res.status(200).json({ data: organization });
  } catch (e) {
    return next(e);
  }
}

export async function show(req, res, next) {
  try {
    const { organizationId } = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId,
      },
    });

    if (!organization) return res.status(404).end();
    return res.status(200).json({ data: organization });
  } catch (e) {
    return next(e);
  }
}

export async function patch(req, res, next) {
  try {
    const { name, public: isPublic, customUrl } = req.body;
    const { organizationId } = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId,
      },
    });
    if (!organization) return res.status(404).end();
    organization.update({
      name,
      public: isPublic,
      customUrl,
    });
    return res.status(200).json({ data: organization });
  } catch (e) {
    return next(e);
  }
}
