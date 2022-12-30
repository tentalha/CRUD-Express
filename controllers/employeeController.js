const Employee = require('../models/employeesSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateJwt } = require('../helpers/jwt');
const privateKey = "thisismyprivatekeypleasedontshareitwithanyone";

async function addNewEmployee(req, res) {
    const { password, ...rest } = req.body;
    const rounds = await bcrypt.genSalt(10);
    //Hashing password before storing in database.
    const hashedPassword = await bcrypt.hash(password, rounds)
    //Storing new employee with hashed password in database.
    const newEmployee = new Employee({ password: hashedPassword, ...rest });
    newEmployee.save();
    //Generating jwt token.
    const jwtToken = generateJwt({ sub: newEmployee?._id })
    res.status(201).send({
        result: "SUCCESS",
        message: "New Employee created.",
        jwt: {
            jwtToken: jwtToken,
        }
    })
}

async function authenticateEmployee(req, res) {

    const { username, password } = req.body;
    const employee = await Employee.findOne({ username }).clone();
    //Comparing hashed password stored in database with password from request body.
    const isPasswordValid = await bcrypt.compare(password, employee?.password); //Returns true if matched, false if otherwise.
    if (isPasswordValid) {
        //Generating jwt token.
        const jwtToken = generateJwt({ sub: employee._id })
        res.status(200).send({
            result: "SUCCESS",
            message: "Successfully Authorized!",
            jwt: {
                jwtToken: jwtToken,
            }
        })
    } else {
        res.status(401).send({
            result: "ERROR",
            message: "Password is incorrect."
        })
    }
}



module.exports = { addNewEmployee, authenticateEmployee }