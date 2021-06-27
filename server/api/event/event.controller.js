import {Event, Kit} from '../../models';

export async function create(req, res) {
  try {
    const {
      code, type, destination, userAgent, ip, device, browser, os, platform
    } = req.body;
    const eventBody = {
      code,
      type,
      destination,
      ip,
      userAgent,
      device,
      browser,
      os,
      platform,
    };
    if (code) {
      const kit = await Kit.findOne({
        code
      });
      eventBody.kitId = kit ? kit.id : null;
    }
    await Event.create(eventBody);
    return res.status(204).end();
  } catch(err) {
    console.error(err);
    return res.status(500).end();
  }
}
