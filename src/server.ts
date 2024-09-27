// import { QueryResult } from 'pg';
import { connectToDb, closeDbConnection } from './connection.js';
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as dbQuery from './queries.js';

await connectToDb();
let usingDb : Boolean = true;

while (usingDb) {

    console.log('\n\n\n')
    const decision = await inquirer.prompt(
        [
            {
                type: 'list',
                message: chalk.bgWhiteBright.cyan('What would you like to do?'),
                choices: 
                ['View all departments', 
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'View Department Budgets',
                'Exit'
                ],
                name: 'choice'
            }
        ]
    )

    switch (decision.choice) {
    case 'View all departments':
        // Call function to view all departments
        dbQuery.viewAllDepartments();
        break;
    case 'View all roles':
        // Call function to view all roles
        dbQuery.viewAllRoles();
        break;
    case 'View all employees':
        // Call function to view all employees
        dbQuery.viewAllEmployees();
        break;
    case 'View employees by manager':
        // Call function to view employees grouped by manager
        dbQuery.viewEmployeesByManager();
        break;
    case 'View employees by department':
        // Call function to view employees grouped by manager
        dbQuery.viewEmployeesByDept();
        break;
    case 'Add a department':
        // Call function to add a department
        await dbQuery.addDepartment();
        break;
    case 'Add a role':
        // Call function to add a role
        await dbQuery.addRole();
        break;
    case 'Add an employee':
        // Call function to add an employee
        await dbQuery.addEmployee();
        break;
    case 'Update an employee role':
        // Call function to update an employee role
        await dbQuery.updateEmployee();
        break;
    case 'View Department Budgets':
        // Call function to view department budgets
        dbQuery.viewDepartmentBudget();
        break;
    case 'Exit':
        console.log('Exiting program. Goodbye!')
        usingDb = false;
        closeDbConnection();
        process.exit(1);
    default:
        console.log('Invalid option');
        break;
  };
};