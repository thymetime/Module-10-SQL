SET search_path = company_db;

INSERT INTO department (name)
VALUES  ('Design'),
        ('Engineering'),
        ('Human Resources'),
        ('Quality Assurance');

-- SELECT * FROM DEPARTMENT;
SET search_path = company_db;

INSERT INTO role (title, salary, department_id)
VALUES  ('Senior UX Designer', 100000, 1),
        ('Junior UX Designer', 73000, 1),
        ('Backend Engineer', 80000, 2),
        ('React Developer', 110000, 2),
        ('Hiring Manager', 75000, 3),
        ('QA Tester', 90000, 4),
        ('Accessibility Tester', 82500, 4);

-- SELECT * FROM ROLE;
SET search_path = company_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Charles', 'DeWallace', 3, NULL),
        ('Ash', 'Ketchum', 1, NULL),
        ('Devon', 'Hendryx', 5, NULL),
        ('Don', 'Quixote', 5, NULL),
        ('Billy', 'Batson', 6, NULL),
        ('Remy', 'LeMouse', 4, NULL),
        ('Texas', 'Paris', 2, 2),
        ('Chet', 'Youbetcha', 3, 1),
        ('Paul', 'Auster', 7, 5);

-- SELECT * FROM employee;