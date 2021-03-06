import axios from "axios";

import config from "./config/environment";

export const everyAction = axios.create({
  baseURL: "https://api.securevan.com/v4",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  auth: {
    username: config.everyAction.appName,
    password: config.everyAction.apiKey,
  },
});

export async function getOrCreateVanId(user) {
  const org = await user.getOrganization();
  const res = await everyAction({
    method: "POST",
    url: "/people/findOrCreate",
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      emails: [{ email: user.email }],
      employer: org.name,
      occupation: user.occupation,
      jobTitle: user.jobTitle,
    },
  });
  return res.data.vanId;
}

export async function getEveryActionUser(vanId, params) {
  const res = await everyAction({
    method: "GET",
    url: `/people/${vanId}`,
    params,
  });
  return res.data;
}

export async function updateEveryActionUser(vanId, data) {
  const res = await everyAction({
    method: "POST",
    url: `/people/${vanId}`,
    data,
  });
  return res.data;
}

export async function tryToUpdateUserWithEveryActionTag(user) {
  try {
    const vanId = await getOrCreateVanId(user);
    user.vanId = vanId;
    await everyAction({
      method: "POST",
      url: `/people/${vanId}/canvassResponses`,
      data: {
        canvassContext: { omitActivistCodeContactHistory: true },
        responses: [
          {
            type: "ActivistCode",
            action: "Apply",
            activistCodeId: "EID52D2C4F", // HasTrackableHDK
          },
        ],
      },
    });
  } catch (err) {
    console.error(err);
  }

  return user.save();
}
