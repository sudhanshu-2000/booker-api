require('dotenv').config();
const jwt = require('jsonwebtoken');
async function verifytoken(req, res, next) {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) return res.sendStatus(403);
        const [, token] = bearerHeader.split(" ");
        req.token = token;
        const auth = await new Promise((resolve, reject) => {
            jwt.verify(req.token, process.env.SECRET_KEY_USER, (err, authData) => {
                if (err) reject(err);
                else resolve(authData);
            });
        });
        const checkMobile = req.body.mobile && auth.username === req.body.mobile;
        if (checkMobile ) {
            return next();
        } else {
            return res.status(403).send("Invalid Credentials");
        }
    } catch (err) {
        return res.status(403).send('Token Expire');
    }   
}
module.exports = verifytoken;