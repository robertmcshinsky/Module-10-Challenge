const { test, expect } = require("@jest/globals");
const { any } = require("expect");
const { string } = require("yargs");
const Employee = require("../index.js");

let employee = new Employee("Rob", 1, "test@email.com", "Employee");

test("Checks to see if an Employee is Created", () => {
  expect(employee.name).toEqual(expect.any(String));
  expect(employee.id).toBeGreaterThan(0);
  expect(employee.email).toEqual(expect.any(String));
  expect(employee.role).toEqual(expect.any(String));
});
