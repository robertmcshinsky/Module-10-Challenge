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
  // Gender question -- 9
  {
    type: "list",
    name: "gender",
    message: "What is the employee gender?",
    choices: ["Male", "Female", "Other"],
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
    generateWebpage(employees, num, team);
    //
  } catch (err) {
    console.log("ERROR @getNumberOfEmployees");
    console.log(err);
  }
}

function generateWebpage(employees, num, team) {
  console.log("@generateWebpage");

  //DONE CREATING THE FIRST 1/2 OF THE HTML DOCUMENT
  let docType = "<!DOCTYPE html>";

  let doc = document.createElement("html");
  doc.setAttribute("lang", "en");

  let head = document.createElement("head");

  let metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "UTF-8");

  let httpEquiv = document.createElement("meta");
  httpEquiv.setAttribute("http-equiv", "X-UA-Compatable");
  httpEquiv.setAttribute("content", "IE=edge");

  let viewport = document.createElement("meta");
  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width, initial-scale-1.0");

  let title = document.createElement("title");
  title.innerHTML = team;

  let styles = document.createElement("Link");
  styles.setAttribute("rel", "stylesheet");
  styles.setAttribute(
    "href",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  );

  //DONE PUTTING THE FIRST 1/2 OF THE HTML DOCUMENT TOGETHER

  head.appendChild(metaCharset);
  head.appendChild(httpEquiv);
  head.appendChild(viewport);
  head.appendChild(title);
  head.appendChild(styles);

  //TODO CREATE THE BODY OF THE HTML DOCUMENT
  let body = document.createElement("body");

  // HEADER
  let header = document.createElement("header");
  header.setAttribute("class", "jumbotron text-center");

  let headerTitle = document.createElement("h1");
  headerTitle.innerHTML = team;

  // MAIN
  let main = document.createElement("main");
  main.setAttribute("style", "width:75%; margin-left: 15%");

  // FOOTER
  let footer = document.createElement("footer");
  footer.setAttribute("class", "jumbotron text-center");

  // CREATING THE CARDS
  let cardColumns = document.createElement("div");
  cardColumns.setAttribute("class", "card-columns");

  for (let i = 0; i < num; ++i) {
    let card = document.createElement("div");

    let cardTextRole = document.createElement("h2");
    cardTextRole.setAttribute(
      "class",
      "card-text font-weight-bold text-center text-uppercase"
    );
    cardTextRole.innerHTML = employees[i].role.role;

    let cardImg = document.createElement("img");
    cardImg.setAttribute("class", "card-img-top");

    if (employees[i].gender.gender === "Male") {
      card.setAttribute("class", "card bg-danger");
      cardImg.setAttribute("src", "/images/mario.png");
    } else {
      cardImg.setAttribute("src", "/images/peach.png");
      card.setAttribute("class", "card bg-warning");
    }

    cardImg.setAttribute("alt" /* Here will be the person's name */);
    cardImg.setAttribute("style", "width: 50%; margin-left: 25%");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body text-center");

    let cardTextName = document.createElement("h3");
    cardTextName.setAttribute(
      "class",
      "card-text font-weight-bold text-center"
    );
    cardTextName.innerHTML = employees[i].name.name;

    let cardTextId = document.createElement("h4");
    cardTextId.setAttribute("class", "card-text text-center");
    cardTextId.innerHTML = "ID: ";

    let cardTextEmail = document.createElement("h4");
    cardTextEmail.setAttribute("class", "card-text text-center");
    cardTextEmail.innerHTML = "Email: ";

    //todo Create if statement for manager/engineer/intern
    let cardTextExtra = document.createElement("h4");
    cardTextExtra.setAttribute("class", "card-text text-center");
    cardTextExtra.innerHTML = "Extra:";

    //TODO APPENDING THE CARDS TO THE HTML DOCUMENT
    cardBody.appendChild(cardTextName);
    cardBody.appendChild(cardTextId);
    cardBody.appendChild(cardTextEmail);
    cardBody.appendChild(cardTextExtra);

    card.appendChild(cardTextRole);
    card.appendChild(cardImg);
    card.appendChild(cardBody);

    cardColumns.appendChild(card);
  }
  main.appendChild(cardColumns);

  body.appendChild(header);
  body.appendChild(main);
  body.appendChild(footer);

  doc.appendChild(head);
  doc.appendChild(body);
  doc.appendChild(footer);

  docType.appendChild(doc);
  console.log(docType);
  console.log(cardColumns);
}

getNumberOfEmployees();
