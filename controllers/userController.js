
const User = require('../models/userSchema');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).send({
            result: "SUCCESS",
            statusCode: 200,
            message: "users found",
            users: allUsers
        })
    } catch (error) {
        res.status(500).send(error);
    }
}


const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            res.status(200).send({
                result: "SUCCESS",
                statusCode: 200,
                message: "user found",
                user
            })
        } else {
            res.status(404).send({
                result: "ERROR",
                statusCode: 404,
                message: `User with ${id} doesn't exist in database.`
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Failure",
            statusCode: 500,
            message: "Server Error."
        })
    }
}


const postUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({
            result: "Success",
            statusCode: 201,
            message: "User created",
            user: req.body
        })
    } catch {
        res.status(500).send({
            result: "Failure",
            statusCode: 500,
            message: "Internal Server Error."
        })
    }
}


const patchUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send({
                result: "SUCCESS",
                statusCode: 200,
                message: "user updated",
                user: updatedUser
            })
        } else {
            res.status(404).send({
                result: "ERROR",
                statusCode: 404,
                message: `User with ${req.params.id} doesn't exist in database.`
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "ERROR",
            statusCode: 500,
            message: "Some internal Error."
        })
    }
}


const deleteUser = async (req, res) => {
    const user = User.findById(req.params.id);
    if (!user) {
        res.status(404).send({
            result: "ERROR",
            statusCode: 404,
            message: `User with ${req.params.id} doesn't exist in database.`
        })
    } else {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send({
            result: "SUCCESS",
            statusCode: 200,
            message: `User with ${req.params.id} deleted!`
        })
    }
}


module.exports = { getAllUsers, getOneUser, deleteUser, patchUser, postUser }