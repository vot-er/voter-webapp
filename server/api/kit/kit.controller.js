'use strict';

import {Kit, Address} from '../../../sequelize/models';

export async function index(req, res, next) {
  try {
    const {user} = req.user._id;
    const kits = await Kit.findAll({
      user
    });
    return res.status(200).json({data: kits});
  } catch(e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const {user} = req.user._id;
    const {shippingAddress: shippingAddressBody} = req.body;
    const shippingAddress = await Address.create(shippingAddressBody);
    const kit = await Kit.create({
      shippingAddress,
      user
    });
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}
