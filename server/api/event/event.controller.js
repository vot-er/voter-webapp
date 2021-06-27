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
      if (kit) {
        eventBody.kit = kit.id;
        eventBody.organization = kit.organization;
        eventBody.user = kit.user;
      }
    }
    await Event.create(eventBody);
    return res.status(204).end();
  } catch(err) {
    console.error(err);
    return res.status(500).end();
  }
}
