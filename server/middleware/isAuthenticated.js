require('dotenv').config()
// this ^ line, is telling the prgram that dotenv is required to run, and is pulling it in, the config is the method being called on it
const jwt = require('jsonwebtoken')
// we are ^ setting a constant named jwt that is set to a jsonwebtoken, the require is telling the program that this is needed and pulling it in?
const {SECRET} = process.env
// this is ^ pulling the secret variable in from .env file, and destructoring it to use

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        // this ^ is checking if the user is Authenticated, it is setting a constant to the request body, using th get method on it?

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        // if ^ the header token is false, we will log a message, and send back the the user a status code
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        // not super familiar with these, but as far as i understand, it will run this try if certain things are not met, errors?
        }

        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        // this ^ is setting, then setting a new error if the users token is not verified
        }

        next()
    }
}