console.log("Start");
let fs = require("fs");
let inquirer = require("inquirer");
let jest = require("jest");

const questions = [
  // Number of workers -- 0
  {
    type: "number",
    name: "workers",
    message: "How many workers are there?",
  },
  // What type of worker -- 1
  {
    type: "list",
    name: "role",
    message: "What role does this person have?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  // Questions Everyone -- 2
  {
    type: "input",
    name: "name",
    message: "What is their name?",
  },
  // Employee ID -- 3
  {
    type: "input",
    name: "id",
    message: "What is their employee ID?",
  },
  // Email -- 4
  {
    type: "input",
    name: "email",
    message: "What is their Email?",
  },
  // Manager only question -- 5
  {
    type: "number",
    name: "officenumber",
    message: "What is the Manager's office number?",
  },
  // Engineer only question -- 6
  {
    type: "input",
    name: "github",
    message: "What is their github username?",
  },
  // Intern only question -- 7
  {
    type: "input",
    name: "school",
    message: "What school is the intern from?",
  },
  // Team name question -- 8
  {
    type: "input",
    name: "team",
    message: "What is the team name?",
  },
];

// CLASSES
class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getName() {
    return this.name.name;
  }

  getId() {
    return this.id.id;
  }

  getEmail() {
    return this.email.email;
  }

  getRole() {
    if (this.role === "Manager") {
      return Manager.getRole();
    } else if (this.role === "Engineer") {
      return Engineer.getRole();
    } else if (this.role === "Intern") {
      return Intern.getRole();
    }
  }
}

class Engineer extends Employee {
  constructor(github) {
    this.github = github;
  }
  getGithub() {
    console.log(this.github);
  }

  getRole() {
    return this.role;
  }
}

class Intern extends Employee {
  constructor(school) {
    this.school = school;
  }
  getSchool() {
    console.log(this.school.school);
  }

  getRole() {
    return this.role.role;
  }
}

class Manager extends Employee {
  constructor(officeNumber) {
    this.officeNumber = officeNumber;
  }
  getRole() {
    return this.role.role;
  }
}

// FUNCTION TO GET NUMBER OF WORKERS
async function getNumberOfEmployees() {
  console.log("@getNumberOfEmployees");
  try {
    // Number of Workers
    let num = await inquirer.prompt(questions[0]);
    console.log("Amount of Workers:", num.workers);
    num = num.workers;
    console.log(num);

    let employees = [];

    // LOOP TO ASK THE QUESTIONS FOR EACH WORKER
    for (let i = 0; i < num; ++i) {
      let employeeName, employeeId, employeeEmail, employeeRole, employeeExtraQ;

      employeeName = await inquirer.prompt(questions[2]);
      employeeId = await inquirer.prompt(questions[3]);
      employeeEmail = await inquirer.prompt(questions[4]);
      employeeRole = await inquirer.prompt(questions[1]);

      if (employeeRole.role === "Manager") {
        employeeExtraQ = await inquirer.prompt(questions[5]);
      } else if (employeeRole.role === "Engineer") {
        employeeExtraQ = await inquirer.prompt(questions[6]);
      } else if (employeeRole.role === "Intern") {
        employeeExtraQ = await inquirer.prompt(questions[7]);
      }

      // CREATES THE EMPLOYEE AND ADDS THEM TO AN ARRAY
      let k = employeeName.name;
      k = new Employee(employeeName, employeeId, employeeEmail, employeeRole);
      employees[i] = k;
    }
    console.log(employees);
    generateWebpage(employees);
    //
  } catch (err) {
    console.log("ERROR @getNumberOfEmployees");
  }
}

function generateWebpage(employees) {
  // USE FS HERE
  console.log("@generateWebpage");
  console.log(employees[1].name.name); // logs the second person's name
}

getNumberOfEmployees();
