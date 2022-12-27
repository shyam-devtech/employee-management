const Admin = require("../models/Admin");
const Employee = require("../models/Employee");

const addEmployee = async (req, res) => {
  try {
    const { emp_email } = req.body;
    const pro = { _id: 0, email: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 };
    const admin = await Admin.findOne({ _id: req.user.id }, pro);

    const isEmailExist = await Employee.findOne({ emp_email }).lean().exec();
    if (isEmailExist) {
      res.status(409).send({ message: "Email already exist!" });
    }

    req.body.added_by = req.user.id;
    const records = await Employee.create(req.body);
    if (records) {
      let msg = `${records.emp_name} as employee added by ${admin.fullname}`;
      res.send({ message: msg });
      console.log(msg);
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Unable to add!" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const records = await Employee.find();
    if (records) {
      res.status(200).send(records);
      console.log("Records found!");
    } else {
      res.status(404).send({ message: "No records found" });
      console.log("Records not found!");
    }
  } catch (error) {
    res.send({ message: "Data not found" });
  }
};

const getEmployee = async (req, res) => {
  try {
    let record = await Employee.findById(req.body._id);
    if (record) {
      res.status(200).send(record);
      console.log("Record found!");
    } else {
      res.status(404).send({ message: "No records found !" });
      console.log("Record not found!");
    }
  } catch (err) {
    res.send({ message: err });
  }
};

const updateEmployee = async (req, res) => {
  try {
    let record = await Employee.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (record.added_by === req.user.id) {
      if (record) {
        res.status(200).send(record);
        console.log("Record Updated!");
      } else {
        res.status(404).send({ message: "No record found !" });
        console.log("Record not found!");
      }
    } else{
      res.send({message: 'Updation is not allowed!'});
    }
  } catch (err) {
    res.send({ message: err });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    let employee = await Employee.findByIdAndRemove(req.body._id);
    if (employee.added_by === req.user.id) {
      if (employee) {
        res.status(200).json({
          message: "Record deleted successfully !",
        });
        console.log("Record deleted successfully !");
      } else {
        res.status(400).json({
          message: "No employee found",
        });
        console.log("No employee found !");
      }
    } else{
      res.send({message: 'Deletion is not allowed!'});
      console.log('Deletion is not allowed!');
    }
  } catch (err) {
    res.send({
      message: err,
    });
  }
};

module.exports = { addEmployee, getAllEmployees, getEmployee, updateEmployee, deleteEmployee };
