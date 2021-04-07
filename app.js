const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "946669",
  database: "employee_tracker",
});

const initialPrompt = () => {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message:
        "Welcome to Employee Tracker, Are you here to ADD, VIEW or UPDATE?",
      choices: ["ADD", "VIEW", "UPDATE", "QUIT"],
    })
    .then((answer) => {
      if (answer.mainMenu === "ADD") {
        addMainMenu();
      } else if (answer.mainMenu === "VIEW") {
        viewEmployee();
      } else if (answer.mainMenu === "UPDATE") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};

const addMainMenu = () => {
  inquirer
    .prompt({
      name: "addMenu",
      type: "list",
      message: "Would you like to ADD a EMPLOYEE, ROLE, or DEPARTMENT?",
      choices: ["EMPLOYEE", "ROLE", "DEPARTMENT", "MAIN MENU"],
    })
    .then((answer) => {
      if (answer.addMenu === "EMPLOYEE") {
        addEmployee();
      } else if (answer.addMenu === "ROLE") {
        addRole();
      } else if (answer.addMenu === "DEPARTMENT") {
        addDepartment();
      } else {
        initialPrompt();
      }
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "employeeID",
        type: "input",
        message: "What is the employees ID number?",
      },
      {
        name: "employeeFirstName",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "employeeLastName",
        type: "input",
        message: "What is the employees last name?",
      },
      {
        name: "employeeRoleID",
        type: "input",
        message: "What is the employees Role ID?",
      },
      {
        name: "employeeManagerID",
        type: "input",
        message: "What is the employees Manager ID? (if applicable)",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          id: answer.employeeID,
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRoleID,
          manager_id: answer.employeeManagerID,
        },
        (err) => {
          if (err) throw err;
          console.log("Employee has been added!");
          initialPrompt();
        }
      );
    });
};

const viewEmployee = () => {
  connection.query("SELECT * FROM ");
};

const updateEmployee = () => {
  connection.query("");
};

connection.connect((err) => {
  if (err) throw err;

  initialPrompt();
});
