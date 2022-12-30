const router = require("express").Router();
const { getAllUsers, getOneUser, postUser, patchUser, deleteUser } = require("../controllers/userController");
const { authenticateEmployee } = require("../middlewares/authentication");
const { checkMongoIDFormat, checkBodyForPostUser } = require("../middlewares/userMiddlewares");

//Send all Users as a response.
router.get("/users", authenticateEmployee, getAllUsers)

//Get a single User
router.get("/users/:id", checkMongoIDFormat, getOneUser)

//Add a new user to the database.
router.post("/users", checkBodyForPostUser, postUser)

//Edit user
router.patch("/users/:id", checkMongoIDFormat, checkBodyForPostUser, patchUser)


//Delete user
router.delete("/users/:id", deleteUser)


module.exports = router;