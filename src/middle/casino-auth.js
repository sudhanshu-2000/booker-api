require("dotenv").config();
const { queryAsync } = require('../db/conn');
async function verifytoken(req, res, next) {
    try {
        const sessionId = req.headers["sessionid"];
        const endpoint = req.path.split("/")[1];
        if (!sessionId) {
            return res.status(400).json({
                partnerKey: null,
                timestamp: null,
                userId: null,
                balance: 0,
                status: {
                    code: "INVALID_TOKEN",
                    message: "sessionId is missing or invalid.",
                },
            });
        }
        const userId = endpoint === "Balance" ? req.body.userId : req.body.user?.id;
        if (!userId) {
            return res.status(422).json({
                partnerKey: null,
                timestamp: null,
                userId: null,
                balance: 0,
                status: {
                    code: "INVALID_TOKEN",
                    message: "User ID is missing.",
                },
            });
        }
        const session = await queryAsync(
            "SELECT * FROM `user_sessionid` WHERE `userid` = ? AND `sessionid` = ?",
            [userId, sessionId]
        );
        if (!session || session.length === 0) {
            return res.status(400).json({
                partnerKey: null,
                timestamp: null,
                userId: null,
                balance: 0,
                status: {
                    code: "INVALID_TOKEN",
                    message: "sessionId is invalid.",
                },
            });
        }
        next();
    } catch (err) {
        console.error("Error in verifytoken middleware:", err);
        return res.status(500).json({
            partnerKey: null,
            timestamp: null,
            userId: null,
            balance: 0,
            status: {
                code: "INVALID_TOKEN",
                message: "An internal error occurred while validating sessionId.",
            },
        });
    }
}

module.exports = verifytoken;
