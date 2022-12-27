const express = require("express");

const { register, login, profile } = require("../controller/auth.controller");

const { addEmployee, getAllEmployees, getEmployee, updateEmployee, deleteEmployee } = require("../controller/employee.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

/*#### Admin ####*/
router.route("/register").post(register);
router.route("/login" , ).post(login);
router.get("/profile", verifyToken, profile);

/*#### Employee ####*/
router.post("/addemployee", verifyToken, addEmployee);
router.get("/getallemployees", verifyToken, getAllEmployees);
router.post("/getemployee", verifyToken, getEmployee);
router.put("/updateemployee", verifyToken, updateEmployee);
router.delete("/deleteemployee", verifyToken, deleteEmployee);

module.exports = router;