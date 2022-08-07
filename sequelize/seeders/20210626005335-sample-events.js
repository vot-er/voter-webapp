"use strict";
const cryptoUtil = require("../../server/utils/crypto");
const defaultPassword = "test";
const UUIDV4 = require("uuid").v4;
const moment = require("moment");

const organizations = [
  {
    id: "703b2ce3-0f26-460a-8cdd-5a5647385c9a",
    name: "University of New Portia",
    customUrl: "https://univnewportia.edu",
    vanId: 124020467,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2cb14b4e-b3c6-4b50-9c45-4302000f5ad9",
    name: "College of Argyle",
    vanId: 124020467,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "e5e41382-2494-4a2b-bb06-0ba48523691a",
    name: "Speedy Clinic",
    vanId: 124020467,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ae0b73df-712b-4c71-9a81-d2561f4ca204",
    name: "Hospital of South Abbey",
    vanId: 124020467,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const users = [
  {
    id: "5173e5ef-0526-4136-b0d5-24b8006051aa",
    provider: "local",
    role: "admin",
    name: "Bran Bockleman",
    email: "bran.test@mailinator.com",
    password: defaultPassword,
    organization: organizations[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5173e5ef-0526-4136-b0d5-24b8006051ab",
    provider: "local",
    role: "admin",
    name: "Malister Artin",
    email: "malister.test@mailinator.com",
    password: defaultPassword,
    organization: organizations[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5173e5ef-0526-4136-b0d5-24b8006051ac",
    provider: "local",
    role: "admin",
    name: "Bolia Ahtia",
    email: "bolia.test@mailinator.com",
    password: defaultPassword,
    organization: organizations[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const kits = [
  {
    id: UUIDV4(),
    code: "testaa",
    user: users[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: UUIDV4(),
    code: "testbb",
    user: users[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: UUIDV4(),
    code: "testcc",
    user: users[2].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function encryptUserPasswords(usersToEncrypt) {
  const promises = usersToEncrypt.map(async (user) => {
    user.salt = await cryptoUtil.makeSalt();
    user.password = await cryptoUtil.encryptPassword(user.password, user.salt);
    return user;
  });
  return Promise.all(promises);
}

function generateEvent(queryInterface, kit, organization, user) {
  const daysAgo = Math.round(Math.random() * 45);
  return {
    id: UUIDV4(),
    type: "link",
    destination:
      Math.random() > 0.4 ? "https://vote.org" : "https://turbovote.org",
    code: kit.code,
    kit: kit.id,
    organization: organization.id,
    user: user.id,
    device: Math.random() > 0.2 ? "mobile" : "desktop",
    createdAt: moment().subtract(daysAgo, "days").toDate(),
    updatedAt: new Date(),
  };
}

module.exports = {
  up: async (queryInterface) => {
    const encryptedPasswordUsers = await encryptUserPasswords(users);
    await queryInterface.bulkInsert("organizations", organizations, {});
    await queryInterface.bulkInsert("users", encryptedPasswordUsers, {});
    await queryInterface.bulkInsert("kits", kits, {});
    const events = [];
    kits.forEach(async (kit, k) => {
      for (var i = 0; i < 100; i++) {
        events.push(
          generateEvent(queryInterface, kit, organizations[k], users[k])
        );
      }
    });
    await queryInterface.bulkInsert("events", events, {});
    return;
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("events", {
      [Op.or]: users.map((user) => ({ user: user.id })),
    });
    await queryInterface.bulkDelete("kits", {
      [Op.or]: users.map((user) => ({ user: user.id })),
    });
    await queryInterface.bulkDelete("users", {
      [Op.or]: users.map((user) => ({ id: user.id })),
    });
    await queryInterface.bulkDelete("organizations", {
      [Op.or]: organizations.map((organization) => ({ id: organization.id })),
    });
    return;
  },
};
