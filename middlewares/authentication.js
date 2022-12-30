const jwt = require("jsonwebtoken");
const privateKey = "thisismyprivatekeypleasedontshareitwithanyone"

const authenticateEmployee = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({
            result: "ERROR",
            message: "Authentication required!"
        })
    }
    try {
        const user = jwt.verify(token, privateKey);
        req.user = user.sub;
        console.log(req.user);
        next()
    } catch (error) {
        res.status(401).send({
            result: "ERROR",
            message: "Authentication required!"
        })
    }
}

module.exports = { authenticateEmployee }