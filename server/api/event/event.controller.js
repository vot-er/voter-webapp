import {
  createEventAndAttachKitMetadata,
  updateEveryActionEventFields,
} from "../../services/event/event.service.js";

export async function create(req, res) {
  try {
    const { ref, type, destination } = req.body;
    const { ip } = req;
    const {
      os,
      platform,
      browser,
      isMobile,
      isDesktop,
      isBot,
      source: userAgent,
    } = req.useragent;

    const ev = await createEventAndAttachKitMetadata({
      code: ref?.toLowerCase?.(),
      type,
      destination,
      ip,
      userAgent,
      device: isMobile
        ? "mobile"
        : isDesktop
        ? "desktop"
        : isBot
        ? "bot"
        : null,
      browser,
      os,
      platform,
    });

//     if (ev.user) {
//       const user = await ev.getUser();
//       await updateEveryActionEventFields(user);
//       const org = await user.getOrganization();
//       if (org.vanId) {
//         await updateEveryActionEventFields(org);
//       }
//     }

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
