const { test, expect } = require("@jest/globals");
const { any } = require("expect");
const { string } = require("yargs");
const Engineer = require("../index.js");

let engineer = new Engineer("mygithub");
console.log(engineer);
test("Checks to see if an Engineer has a github", () => {
  expect(engineer.name).toEqual(expect.any(String));
});
