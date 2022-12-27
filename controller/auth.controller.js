require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const key = "secretkey";

const register = async (req, res) => {
  const admin = await new Admin({
    fullname: req.body.fullname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  admin.save((err) => {
    if (err) {
      res.status(500).send({ message: "Email already registerd!" });
      return;
    } else {
      res.status(200).send({ message: "User Registered successfully!" });
    }
  });
};

const login = async (req, res) => {
  await Admin.findOne({ email: req.body.email }).exec((err, admin) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (!admin) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const pwdIsValid = bcrypt.compareSync(req.body.password, admin.password);

    if (!pwdIsValid) {
      res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: admin.id }, key, {
      expiresIn: 86400,
    });

    res.status(200).send({
      admin: { id: admin._id, fullname: admin.fullname, email: admin.email },
      message: "Login successfull",
      accessToken: token,
    });
  });
};

const profile = async (req, res) => {
  const data = await Admin.find();
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, key);
    try {
      res.status(200).send(data);
      console.log(decoded.id)
    } catch(error) {
      res.status(401).send({ message: err.message });
    }
};

module.exports = { register, login, profile };
