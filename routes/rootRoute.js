const router = require('express').Router();

const user = require('../routes/userRoutes');

const employee = require('../routes/employeeRoutes');

router.use(user);
router.use(employee);

module.exports = router;