const jwt = require('jsonwebtoken');

const generateToken = (_id) => {
    try {
        return jwt.sign({ _id }, 'axel', {
            expiresIn: "1d",
        })
    } catch (error) {
        console.log("error generateToken", error.message);
    }
}
module.exports = generateToken;