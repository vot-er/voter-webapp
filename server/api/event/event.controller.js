import {createEventAndAttachKitMetadata} from '../../services/event/event.service.js';

export async function create(req, res) {
  try {
    const {
      ref, type, destination
    } = req.body;
    const {ip} = req;
    const {
      os, platform, browser, isMobile, isDesktop, isBot, source: userAgent
    } = req.useragent;
    console.log(userAgent);
    await createEventAndAttachKitMetadata({
      code: ref,
      type,
      destination,
      ip,
      userAgent,
      device: isMobile ? 'mobile' : isDesktop ? 'desktop' : isBot ? 'bot' : null,
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
