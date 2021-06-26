'use strict';

import {Kit, Address} from '../../models';

export async function index(req, res, next) {
  try {
    const user = req.user.id;
    const kits = await Kit.findAll({
      where: {
        user
      }
    });
    return res.status(200).json({data: kits});
  } catch(e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const userId = req.user.id;
    const {shippingAddress: shippingAddressBody} = req.body;
    const shippingAddress = await Address.create(shippingAddressBody);
    const kit = await Kit.create({
      shippingAddress: shippingAddress.id,
      user: userId
    });
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}
