require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
    const secret = process.env.TOKEN_KEY;
    if (!secret) {
        throw new Error('TOKEN_KEY is not defined');
    }
    const token = jwt.sign({id}, secret, { expiresIn: 3 * 24 * 60 * 60 });
    return token;
}