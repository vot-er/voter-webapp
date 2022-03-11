"use strict";
const mockKitBody = {
  id: "kitId",
  code: "test",
  organization: "organization",
  user: "user",
};

jest.mock("../../models/Kit", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("kit", mockKitBody);
});

jest.mock("../../models/Event", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("event");
});

const createEventAndAttachKitMetadata =
  require("./event.service").createEventAndAttachKitMetadata;

describe("Event service: createEventAndAttachKitMetadata", function () {
  it("should return an event with attached kit metadata when a valid kit code is provided", async function () {
    const reqBody = {
      code: "test",
      type: "type",
    };
    const result = await createEventAndAttachKitMetadata(reqBody);
    expect(result.code).toEqual(reqBody.code);
    expect(result.type).toEqual(reqBody.type);
    expect(result.kit).toEqual(mockKitBody.id);
    expect(result.organization).toEqual(mockKitBody.organization);
    expect(result.user).toEqual(mockKitBody.user);
  });
  it("should return an event without kit metadata when no valid code is provided", async function () {
    const reqBody = {
      code: null,
      type: "type",
    };
    const result = await createEventAndAttachKitMetadata(reqBody);
    expect(result.code).toEqual(null);
    expect(result.type).toEqual("type");
    expect(result.organization).toBeUndefined();
    expect(result.user).toBeUndefined();
    expect(result.kit).toBeUndefined();
  });
});
