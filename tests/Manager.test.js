const { test, expect } = require("@jest/globals");
const { any } = require("expect");
const { string } = require("yargs");
const Manager = require("../index.js");

let manager = new Manager("mygithub", 4);

test("Checks to see if a Manager has a office number", () => {
  expect(manager.id).toBeGreaterThanOrEqual(0);
});
