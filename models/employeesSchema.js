const mongoose = require("mongoose");

const employeesSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = Employee;