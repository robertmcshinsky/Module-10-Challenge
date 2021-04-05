const { test, expect } = require("@jest/globals");
const { any } = require("expect");
const { string } = require("yargs");
const Intern = require("../index.js");

let intern = new Intern("mygithub");

test("Checks to see if an intern has a school", () => {
  expect(intern.name).toEqual(expect.any(String));
});
