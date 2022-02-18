import { getOrCreateVanId, updateEveryActionUser } from "../../everyAction";
import { Event, Kit, Sequelize } from '../../models';

const { Op } = Sequelize;

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

const CUSTOM_FIELD_GROUP_ID = 95;
const CUSTOM_FIELD_VOTER_REGISTRATIONS_ID = 379;
const CUSTOM_FIELD_VOTE_BY_MAIL_ID = 380;
const CUSTOM_FIELD_TOTAL_ID = 484;

const VOTE_BY_MAIL_PATTERN = "absentee.vote.org";
const VOTER_REGISTRATION_PATTERNS = [
  "act.vot-er.org/register-to-vote",
  "voter.turbovote.org",
  "act.vot-er.org/registrate-para-votar",
];

const patternForLike = pattern => `%${pattern}%`;

async function getCustomFieldValuesFromDb(user) {
  const voterRegistrations = await Event.count({
    where: {
      user: user.id,
      destination: {
        [Op.like]: { [Op.any]: VOTER_REGISTRATION_PATTERNS.map(patternForLike) },
      },
    },
  });

  const voteByMail = await Event.count({
    where: {
      user: user.id,
      destination: {
        [Op.like]: patternForLike(VOTE_BY_MAIL_PATTERN),
      },
    },
  });

  return {
    voterRegistrations,
    voteByMail,
    total: voterRegistrations + voteByMail,
  };
}

export async function updateEveryActionEventFields(user) {
  const vanId = await getOrCreateVanId(user);
  const { voterRegistrations, voteByMail, total } = await getCustomFieldValuesFromDb(user);

  await updateEveryActionUser(vanId, {
    customFieldValues: [
      {
        customFieldId: CUSTOM_FIELD_VOTER_REGISTRATIONS_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: voterRegistrations
      },
      {
        customFieldId: CUSTOM_FIELD_VOTE_BY_MAIL_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: voteByMail,
      },
      {
        customFieldId: CUSTOM_FIELD_TOTAL_ID,
        customFieldGroupId: CUSTOM_FIELD_GROUP_ID,
        assignedValue: total,
      },
    ],
  });
}

/* Currently unused but might be useful.

const isVoterRegistration = dest => VOTER_REGISTRATION_PATTERNS.any(
  pattern => dest.includes(pattern)
);

const isVoteByMail = dest => dest.includes(VOTE_BY_MAIL_PATTERN);

const getCustomFieldValueFromUser = (user, fieldId) => {
  const customField = user.customFields.find(f => f.customFieldId === fieldId);
  if (customField.customField.customFieldTypeId === "N") {
    return customField.assignedValue != null
      ? Number(customField.assignedValue)
      : null;
  }
  return customField.assignedValue;
}

async function getCustomFieldValuesFromEa(vanId) {
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
*/
