const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) {
    return res.status(204).json({ message: "No employees found." });
  }

  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  try {
    const newEmployee = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
  }
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    employee.lastname = req.body.lastname;
  }

  const fileteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...fileteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const fileteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...fileteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
