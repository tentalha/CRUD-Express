const { addNewEmployee, authenticateEmployee } = require("../controllers/employeeController");
const { checkIfExists, checkIfNotExist } = require("../middlewares/employeeMiddlewares");

const router = require("express").Router();

router.post('/signup', checkIfExists, addNewEmployee);

router.post('/signin', checkIfNotExist, authenticateEmployee);

module.exports = router;
