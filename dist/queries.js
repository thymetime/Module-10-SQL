import { pool } from './connection.js';
import inquirer from 'inquirer';
export const viewAllDepartments = async () => {
    // await connectToDb();
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT * FROM department;');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
};
export const viewAllRoles = async () => {
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT * FROM role;');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
};
export const viewAllEmployees = async () => {
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT * FROM employee;');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
};
export const addDepartment = async () => {
    // User input to get department name
    const dept = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name'
        }
    ]);
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        await pool.query(`INSERT INTO department (name) VALUES (\'${dept.name}\');`);
        console.log(`Added ${dept.name} department!`);
    }
    catch (err) {
        console.error(err);
    }
};
export const addRole = async () => {
    // User input to get department name
    const role = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the ID of the role\'s department?',
            name: 'dept_id'
        }
    ]);
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        await pool.query(`INSERT INTO role (title, salary, department_id) 
                        VALUES (\'${role.title}\', ${role.salary}, ${role.dept_id});`);
        console.log(`Added ${role.title} to roles!`);
    }
    catch (err) {
        console.error(err);
    }
};
export const addEmployee = async () => {
    // User input to get department name
    const employee = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is their first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is their last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'What is their role? Please provide the role ID.',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Who is their manager? Please provide the ID. Enter \'null\' if they do not have a manager.',
            name: 'manager'
        }
    ]);
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES (\'${employee.first_name}\', \'${employee.last_name}\', ${employee.role}, ${employee.manager});`);
        console.log(`Added ${employee.first_name} ${employee.last_name} to the company!`);
    }
    catch (err) {
        console.error(err);
    }
};
export const updateEmployee = async () => {
    // User input to get department name
    const employee = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is employee\'s last name?',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'What is their new role? Please provide the role ID.',
            name: 'role'
        }
    ]);
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        await pool.query(`UPDATE employee 
                        SET role_id = ${employee.role}
                        WHERE first_name = \'${employee.first_name}\' 
                        AND last_name = \'${employee.last_name}\';`);
        console.log(`Changed ${employee.first_name} ${employee.last_name}\'s role to ${employee.role}!`);
    }
    catch (err) {
        console.error(err);
    }
};
