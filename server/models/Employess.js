const mongoose = require('mongoose');

// Define employee schema with validations
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define model for the employees collection
const EmployeeModel = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeModel;
