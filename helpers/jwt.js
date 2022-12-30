const jwt = require('jsonwebtoken');
const privateKey = "thisismyprivatekeypleasedontshareitwithanyone";

const generateJwt = (payload) => {
    const jwtToken = jwt.sign(payload, privateKey);
    return jwtToken;
}

module.exports = { generateJwt }