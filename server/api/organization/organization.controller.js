'use strict';

import {Organization} from '../../models';

export async function index(req, res, next) {
  try {
    const organizations = await Organization.findAll({
      where: {
        public: true
      },
      order: [
        ['name']
      ]
    });
    return res.status(200).json({data: organizations});
  } catch(e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const {name} = req.body;
    const organization = await Organization.create({
      name,
      public: req.body.public
    });
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}

export async function show(req, res, next) {
  try {
    const {organizationId} = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId
      }
    });

    if (!organization) return res.status(404).end();
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}


export async function patch(req, res, next) {
  try {
    const {name} = req.body;
    const {organizationId} = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId
      }
    });
    if (!organization) return res.status(404).end();
    organization.update({
      name
    });
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}
