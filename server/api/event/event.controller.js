import {createEventAndAttachKitMetadata} from '../../services/event/event.service.js';

export async function create(req, res) {
  try {
    const {
      ref, type, destination, userAgent, ip, device, browser, os, platform
    } = req.body;
    await createEventAndAttachKitMetadata({
      code: ref,
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
