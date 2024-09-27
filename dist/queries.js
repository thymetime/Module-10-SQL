import { pool } from './connection.js';
import inquirer from 'inquirer';
export const viewAllDepartments = async () => {
    // await connectToDb();
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT * FROM department;');
        console.log('\n');
        console.table(result.rows);
        console.log('\n');
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
export const viewEmployeesByManager = async () => {
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT * FROM employee ORDER BY manager_id;');
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
};
export const viewEmployeesByDept = async () => {
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        const result = await pool.query('SELECT department_id, title, first_name, last_name, role_id, salary FROM employee JOIN role ON employee.role_id = role.id ORDER BY department_id;');
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
export const updateEmployeeManager = async () => {
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
            message: 'Who is their new manager? Please provide the manager\'s ID.',
            name: 'manager'
        }
    ]);
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        // Query database
        await pool.query(`UPDATE employee 
                        SET manager_id = ${employee.manager}
                        WHERE first_name = \'${employee.first_name}\' 
                        AND last_name = \'${employee.last_name}\';`);
        console.log(`Changed ${employee.first_name} ${employee.last_name}\'s role to ${employee.manager}!`);
    }
    catch (err) {
        console.error(err);
    }
};
export const viewDepartmentBudget = async () => {
    try {
        // Set search path
        await pool.query('SET search_path = company_db;');
        const result = await pool.query(`SELECT name, id, total_salary
                                    FROM 
                                    department DEPT
                                    LEFT JOIN 
                                    (SELECT department_id,SUM(salary) AS Total_Salary
                                    FROM role
                                    GROUP BY department_id
                                    ORDER BY department_id) BUDGET
                                    ON BUDGET.department_id = DEPT.id`);
        console.table(result.rows);
    }
    catch (err) {
        console.error(err);
    }
};
