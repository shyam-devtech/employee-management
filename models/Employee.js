const mongoose = require("mongoose");

/**
 * Employee Schema
 **/
const employeeSchema = new mongoose.Schema(
  {
    emp_id: {
      type: Number,
      required: true,
    },
    emp_name: {
      type: String,
      required: true,
    },
    emp_email: {
      type: String,
      lowercase: true,
    },
    emp_gender: {
      type: String,
      required: true,
    },
    emp_designation: {
      type: String,
      required: true,
    },
    emp_phone: {
      type: Number,
      required: true,
    },
    emp_address: {
      emp_city: {
        type: String,
        required: true,
      },
      emp_residence: {
        type: String,
        required: true,
      },
    },
    emp_salary: {
      type: Number,
      required: true,
    },
    added_by: {
      type: String,
    },
    emp_img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
