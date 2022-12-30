
const checkBodyForPostUser = (req, res, next) => {
    const { name, age, interest } = req.body;
    if (name && age && interest) {
        next();
    } else {
        res.status(404).send({
            result: "ERROR",
            statusCode: 404,
            message: "Some required field is missing in request body."
        })
    }
}


const checkMongoIDFormat = (req, res, next) => {
    const { id } = req.params.id;
    if (id?.length < 24) {
        res.status(400).send({
            result: "ERROR",
            statusCode: 400,
            message: "Invalid ID length in request body."
        })
    } else {
        next();
    }
}

module.exports = { checkBodyForPostUser, checkMongoIDFormat };