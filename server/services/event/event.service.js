import {Event, Kit} from '../../models';
import { getOrCreateVanId, getEveryActionUser, updateEveryActionUser } from "../../everyAction";

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
      await updateEveryActionFields(kit, body.destination)
    }
  }
  return Event.create(body);
}

const CUSTOM_FIELD_GROUP_ID = 95;
const CUSTOM_FIELD_VOTER_REGISTRATIONS_ID = 379;
const CUSTOM_FIELD_VOTE_BY_MAIL_ID = 380;
const CUSTOM_FIELD_TOTAL_ID = 484;

const isVoterRegistration = dest => dest.includes("act.vot-er.org/register-to-vote")
  || dest.includes("voter.turbovote.org")
  || dest.includes("act.vot-er.org/registrate-para-votar");

const isVoteByMail = dest => dest.includes("absentee.vote.org");

const getCustomFieldValueFromUser = (user, fieldId) => {
  const customField = user.customFields.find(f => f.customFieldId === fieldId);
  if (customField.customField.customFieldTypeId === "N") {
    return customField.assignedValue != null
      ? Number(customField.assignedValue)
      : null;
  }
  return customField.assignedValue;
}

async function getCustomFieldValues(vanId) {
  const person = await getEveryActionUser(vanId, { "$expand": "customFields" });
  return {
    voterRegistrations: getCustomFieldValueFromUser(
      person,
      CUSTOM_FIELD_VOTER_REGISTRATIONS_ID
    ),
    voteByMail: getCustomFieldValueFromUser(
      person,
      CUSTOM_FIELD_VOTE_BY_MAIL_ID
    ),
    total: getCustomFieldValueFromUser(
      person,
      CUSTOM_FIELD_TOTAL_ID
    ),
  };
}

async function updateEveryActionFields(kit, dest) {
  const user = await kit.getUser();
  const vanId = await getOrCreateVanId(user);
  const { voterRegistrations, voteByMail, total } = getCustomFieldValues(vanId);

  await updateEveryActionUser(vanId, {
    customFieldValues: [
      {
        customFieldId: CUSTOM_FIELD_TOTAL_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: total + 1,
      },
      {
        customFieldId: CUSTOM_FIELD_VOTER_REGISTRATIONS_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: voterRegistrations + (isVoterRegistration(dest) ? 1 : 0),
      },
      {
        customFieldId: CUSTOM_FIELD_VOTE_BY_MAIL_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: voteByMail + (isVoteByMail(dest) ? 1 : 0),
      }
    ],
  });
}
