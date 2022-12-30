const Employee = require("../models/employeesSchema");

const checkIfExists = async (req, res, next) => {
    const { username } = req.body;
    await Employee.findOne({ username }, function (err, obj) {
        if (obj) {
            res.status(400).send({
                result: "ERROR",
                message: `Employee with username "${username}" already exists.`
            })
        } else {
            next();
        }
    }).clone();

}

const checkIfNotExist = async (req, res, next) => {
    const { username } = req.body;
    const employee = await Employee.findOne({ username });
    if (!employee) {
        res.status(401).send({ result: "ERROR", message: `Username "${username}" not found.` });
    } else {
        next();
    }
}

module.exports = { checkIfExists, checkIfNotExist }