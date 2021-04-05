console.log("Start");
let fs = require("fs");
let inquirer = require("inquirer");
let jest = require("jest");

function randImage(role) {
  let choice;
  if (role === "Manager") {
    choice = "mario";
  } else if (role === "Engineer") {
    choice = "luigi";
  } else {
    choice = "goomba";
  }

  return choice;
}

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
    name: "extra",
    message: "What is the Manager's office number?",
  },
  // Engineer only question -- 6
  {
    type: "input",
    name: "extra",
    message: "What is their github username?",
  },
  // Intern only question -- 7
  {
    type: "input",
    name: "extra",
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

    let team = await inquirer.prompt(questions[8]);
    console.log(team);
    let employees = [];
    let extra = [];
    // LOOP TO ASK THE QUESTIONS FOR EACH WORKER
    for (let i = 0; i < num; ++i) {
      let employeeName, employeeId, employeeEmail, employeeRole, employeeExtraQ;

      employeeName = await inquirer.prompt(questions[2]);
      employeeId = await inquirer.prompt(questions[3]);
      employeeEmail = await inquirer.prompt(questions[4]);
      employeeRole = await inquirer.prompt(questions[1]);

      if (employeeRole.role === "Manager") {
        employeeExtraQ = await inquirer.prompt(questions[5]);
        extra.push({
          extra: "Office Number",
          employeeExtraQ,
        });
      } else if (employeeRole.role === "Engineer") {
        employeeExtraQ = await inquirer.prompt(questions[6]);
        extra.push({
          extra: "Github",
          employeeExtraQ,
        });
      } else if (employeeRole.role === "Intern") {
        employeeExtraQ = await inquirer.prompt(questions[7]);
        extra.push({
          extra: "School",
          employeeExtraQ,
        });
      }
      console.log(extra);
      // CREATES THE EMPLOYEE AND ADDS THEM TO AN ARRAY
      let k = employeeName.name;
      k = new Employee(employeeName, employeeId, employeeEmail, employeeRole);
      employees[i] = k;
    }
    console.log(employees);
    generateWebpage(employees, num, team, extra);
    //
  } catch (err) {
    console.log("ERROR @getNumberOfEmployees");
    console.log(err);
  }
}

function generateWebpage(employees, num, team, extra) {
  console.log("@generateWebpage");
  //DONE CREATING THE FIRST 1/2 OF THE HTML DOCUMENT
  team = team.team;
  let endDiv = "</div>";
  let document =
    "<!DOCTYPE html>" +
    '<html lang="en">' +
    "<head>" +
    '<meta charset="UTF-8">' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    "<title>Team " +
    team +
    "</title>" +
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">' +
    "</head>";
  let body =
    "<body>" +
    '<header class="jumbotron text-center">' +
    "<h1>" +
    team +
    "</h1>" +
    "</header>";
  let main = '<main style="width: 75%; margin-left: 15%">';

  console.log("Card");

  let cardColumns = '<div class="card-columns">';
  let card;
  for (let i = 0; i < num; ++i) {
    let cardTextRole =
      '<h2 class="card-text font-weight-bold text-center text-uppercase">' +
      employees[i].role.role +
      "</h2>";
    card = '<div class="card bg-danger">';
    let cardImg =
      '<img class="card-img-top" src="/images/' +
      randImage(employees[i].role.role) +
      '.png" style="width: 50%; margin-left: 25%">';

    let cardBody = '<div class="card-body text-center">';

    let cardTextName =
      '<h3 class="card-text font-weight-bold text-center">' +
      employees[i].name.name +
      "</h3>";

    let cardTextId =
      '<h4 class="card-text text-center">ID: ' + employees[i].id.id + "</h4>";

    let cardTextEmail =
      '<h4 class="card-text text-center">Email: ' +
      employees[i].email.email +
      "</h4>";

    //todo Create if statement for manager/engineer/intern
    let cardTextExtra =
      '<h4 class="card-text text-center">' +
      extra[i].extra +
      ": " +
      extra[i].employeeExtraQ.extra +
      "</h4>";
    cardBody += cardTextName;
    cardBody += cardTextId;
    cardBody += cardTextEmail;
    cardBody += cardTextExtra;
    card += cardTextRole;
    card += cardImg;
    card += cardBody;
    card += endDiv;
    card += endDiv;

    cardColumns += card;
  }

  main += cardColumns;
  body += main;

  document += body;
  fs.writeFile("index.html", document, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}
getNumberOfEmployees();
