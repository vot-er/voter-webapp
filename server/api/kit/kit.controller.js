'use strict';

import {Kit, Address} from '../../models';

export async function index(req, res, next) {
  try {
    const kits = await Kit.findAll({
      where: {
        user: req.user.id
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

export async function show(req, res, next) {
  try {
    const {kitId} = req.params;
    const kit = await Kit.findOne({
      where: {
        id: kitId

      }
    });

    if (!kit) return res.status(403).end();
    kit.user = await kit.getUser();
    kit.shippingAddress = await kit.getShippingAddress();

    if (!kit.user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).end();
    }
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}


export async function patch(req, res, next) {
  try {
    const {kitId} = req.params;
    const kit = await Kit.findOne({
      where: {
        id: kitId
      }
    });
    if (!kit) return res.status(403).end();
    kit.update(getUpdates(req.body));
    kit.user = await kit.getUser();
    kit.shippingAddress = await kit.getShippingAddress();
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}

function getUpdates(reqBody) {
  let updateValue = {};
  const {
    isShipped, code, fulfill
  } = reqBody;
  if (code !== undefined) {
    updateValue.code = code.length ? code : null;
  }
  if (isShipped !== undefined) {
    updateValue.shipped = isShipped;
    updateValue.shippedAt = null;
    if (isShipped) {
      const time = new Date().toISOString();
      updateValue.shippedAt = time;
    }
  }
  if (fulfill !== undefined) {
    updateValue.fulfill = fulfill;
  }
  return updateValue;
}


export async function bulkAssign(req, res, next) {
  try {
    const {codes} = req.body;
    const kits = await Kit.findAll({
      where: {
        code: null,
        fulfill: true
      },
      limit: codes.length
    });
    const results = codes.map(code => ({
      code,
      kitId: null,
      status: null,
      failureReason: null
    }));
    let k = 0;
    for (var i = 0; i < results.length; i++) {
      const result = results[i];
      const kit = kits[k];
      if (k + 1 > kits.length) {
        result.status = 'failed';
        result.failureReason = 'No additional kits without codes to assign to.';
        continue;
      }
      try {
        kit.code = result.code;
        await kit.save();
        result.status = 'succeeded';
        result.kitId = kit.id;
        k++;
      } catch(err) {
        result.status = 'failed';
        result.failureReason = String(err);
      }
    }
    return res.status(200).json({results});
  } catch(e) {
    return next(e);
  }
}

export async function bulkShip(req, res, next) {
  try {
    const {codes} = req.body;
    const unShipped = await Kit.findAll({
      where: {
        code: !null,
        shipped: false
      }
    });
    const results = codes.map(code => ({
      code: code,
      kitId: null,
      status: null,
      failureReason: null
    }));
    for (let i = 0; i < unShipped.length; i++) {
      if (codes.includes(unShipped[i].code.toString(10))) {
        let result = results.filter(obj => {
          return obj.code === unShipped[i].code;
        });
        try {
          unShipped[i].shipped = true;
          await unShipped[i].save();
          result.status = 'succeeded';
          result.kitId = unShipped[i].id;
        } catch(err) {
          result.status = 'failed';
          result.failureReason = String(err);
          return next(err);
        };
      };
    };
    for(let i = 0; i < results.length; i++){
      if(results[i].status == null){
        results[i].kitId = 'none';
        results[i].status = 'failed';
        results[i].failureReason = 'no matched kit';
      };
    };
    return res.json(results);
  } catch(err) {
    return next(err);
  };
};