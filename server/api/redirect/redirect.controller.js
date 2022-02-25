"use strict";

import { Kit } from "../../models";

export async function redirect(req, res, next) {
  try {
    const { code } = req.params;
    const kit = await Kit.findOne({
      where: {
        code,
      },
    });
    if (!kit) return res.status(404).end();
    const user = await kit.getUser();
    const organization = await user.getOrganization();
    const organizationId = organization && organization.id;
    let customUrl = organization && organization.customUrl;
    if (customUrl && customUrl.length === 0) customUrl = null;
    return res.status(200).json({ code, customUrl, organizationId });
  } catch (e) {
    return next(e);
  }
}
