require('dotenv').config();
const jwt = require('jsonwebtoken');
async function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.sendStatus(403);
    }
    const [, bearerToken] = bearerHeader.split(" ");
    req.token = bearerToken;
    try {
        const secrets = [process.env.SECRET_KEY_ADMIN, process.env.SECRET_KEY_SUPERADMIN];
        for (const secret of secrets) {
            try {
                const auth = await jwt.verify(req.token, secret);
                if (auth.username === req.body.username) {
                    return next();
                }
            } catch (err) {
                continue;
            }
        }
        return res.status(403).send("Invalid Credentials");
    } catch {
        res.status(403).send('Token Expired or Invalid');
    }
}
module.exports = verifyToken;