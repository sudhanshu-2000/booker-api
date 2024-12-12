require('dotenv').config();
const jwt = require('jsonwebtoken');
const { con } = require('../db/conn');
async function verifyToken(req, res, next) {
    const check = req.path.split("-")[0].split("/")[1];
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) return res.sendStatus(403);
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    try {
        let auth = jwt.verify(req.token, SECRET_KEY_ADMIN);
        if (auth.username !== req.body.username) return res.status(403).send("false");
    } catch (err) {
        try {
            let auth = jwt.verify(req.token, SECRET_KEY_SUPERADMIN);
            if (auth.username !== req.body.username) return res.status(403).send("false");
        } catch (err) {
            return res.status(403).send("Token Invalid");
        }
    }
    const roles = {
        'get': 'view',
        'add': 'add_d',
        'assign': 'add_d',
        'del': 'delete_d',
        'update': 'update_d',
        'approve': 'update_d',
        'decline': 'update_d',
        'status': 'status_d',
        'change': 'status_d'
    };
    try {
        const value = await getRoleCheck(req.body.username, roles[check]);
        if (value[0].check === "true") return next();
        res.status(401).json({ error: true, status: false, message: "You Are Not Authorized!" });
    } catch (err) {
        res.status(401).json({ error: true, status: false, message: "You Are Not Authorized!" });
    }
}
const getRoleCheck = async (username, checkField) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT r.${checkField} as 'check' FROM role as r WHERE r.id = (SELECT ra.role_id FROM role_assign as ra WHERE ra.user_id = (SELECT lo.id FROM login as lo WHERE lo.username = ?))`,
            [username], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
    });
};
module.exports = verifyToken;