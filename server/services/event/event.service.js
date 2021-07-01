import {Event, Kit} from '../../models';

export async function createEventAndAttachKitMetadata(body) {
  const {code} = body;
  if (code) {
    const kit = await Kit.findOne({
      where: {
        code
      }
    });
    if (kit) {
      body.kit = kit.id;
      body.organization = kit.organization;
      body.user = kit.user;
    }
  }
  return Event.create(body);
}
