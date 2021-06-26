import {Event, Kit} from '../models';

export async function create(req, res) {
  try {
    const {
      code, type, destination, userAgent, ip, device, browser, os, platform
    } = req.body;
    const kit = await Kit.findOne({
      code
    });
    const kitId = kit ? kit.id : null;
    await Event.create({
      kit: kitId,
      code,
      type,
      destination,
      ip,
      userAgent,
      device,
      browser,
      os,
      platform,
    });
    return res.status(204).end();
  } catch(err) {
    console.error(err);
    return res.status(500).end();
  }
}
