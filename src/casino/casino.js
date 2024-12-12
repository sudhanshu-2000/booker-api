const express = require("express");
const app = express.Router();
exports.app = app;
const { queryAsync, queryAsync2 } = require('../db/conn');
const cors = require("cors");
const verifytoken = require('../middle/casino-auth');
app.use(cors());
var bodyParser = require("body-parser");
require('dotenv').config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLmit: 5000
}));
const Joi = require('joi');
const mypartnerKey = "lvMq8oB5ifgpxTrxFP8LOCKw7GIPNa3/E42EIdEgW10b1Ap6grBJsHSy4mhBpnq7";
app.post("/balance", async (req, res) => {
    try {
        const { userId, partnerKey } = req.body;
        if (!userId || !partnerKey) {
            return res.status(400).json({
                error: true,
                message: "Missing required fields: userId or partnerKey",
            });
        }
        if (mypartnerKey != partnerKey) {
            return res.status(422).json({
                partnerKey: null,
                timestamp: null,
                userId: null,
                balance: 0,
                status: {
                    code: "LOGIN_FAILED",
                    message: "Given partner key is incorrect",
                },
            });
        }
        const date = new Date().getTime();
        const user = await queryAsync("SELECT `mobile` FROM `user_details` WHERE `id` = ?", [userId]);
        if (!user || user.length === 0) {
            return res.status(404).json({
                error: true,
                message: "User not found",
            });
        }
        const ab = await queryAsync2("SELECT `wallet_balance` as wb FROM `wallet` WHERE `user_name` = ?", [user[0].mobile]);
        if (!ab || ab.length === 0) {
            return res.status(404).json({
                error: true,
                message: "Wallet balance not found",
            });
        }
        const balance = ab[0]?.wb ? parseFloat(ab[0].wb) : 0;
        res.status(200).json({
            partnerKey: partnerKey,
            timestamp: date,
            userId: userId,
            balance: balance,
            status: {
                code: "SUCCESS",
                message: "",
            },
        });
    } catch (err) {
        console.error("Error processing /balance request:", err);
        res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});
// app.post("/credit", async (req, res) => {
//     try {
//         const { user, partnerKey, transactionData } = req.body;

//         if (!user || !partnerKey || !transactionData) {
//             console.log(transactionData.amount)
//             return res.status(400).json({
//                 error: true,
//                 message: "Missing required fields: user, partnerKey, or transactionData",
//             });
//         }
//         if (mypartnerKey != partnerKey) {
//             return res.status(422).json({
//                 partnerKey: null,
//                 timestamp: null,
//                 userId: null,
//                 balance: 0,
//                 status: {
//                     code: "LOGIN_FAILED",
//                     message: "Given partner key is incorrect",
//                 },
//             });
//         }
//         if (transactionData.amount < 0) {
//             return res.status(400).json({
//                 error: true,
//                 message: "Invalid transaction amount",
//             });
//         }
//         const date = new Date().getTime();
//         const users = await queryAsync("SELECT `mobile` FROM `user_details` WHERE `id` = ?", [user.id]);
//         if (!users || users.length === 0) {
//             return res.status(404).json({
//                 error: true,
//                 message: "User not found",
//             });
//         }
//         const ab = await queryAsync2("SELECT `wallet_balance` as wb FROM `wallet` WHERE `user_name` = ?", [users[0].mobile]);
//         if (!ab || ab.length === 0) {
//             return res.status(404).json({
//                 error: true,
//                 message: "Wallet balance not found",
//             });
//         }
//         const balance = ab[0]?.wb ? parseFloat(ab[0].wb) : 0;
//         await queryAsync2(
//             "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = ?",
//             [transactionData.amount, users[0].mobile]
//         );
//         res.status(200).json({
//             partnerKey: partnerKey,
//             timestamp: date,
//             userId: user.id,
//             balance: balance + transactionData.amount,
//             status: {
//                 code: "SUCCESS",
//                 message: "",
//             },
//         });
//     } catch (err) {
//         console.error("Error processing /credit request:", err);
//         res.status(500).json({
//             error: true,
//             message: "Internal Server Error",
//         });
//     }
// });

const debitschema = Joi.object({
    user: Joi.object({
        id: Joi.number().required(),
        currency: Joi.string().required(),
    }).required(),
    partnerKey: Joi.string().required(),
    transactionData: Joi.object({
        id: Joi.string().required(),
        amount: Joi.number().positive().required(),
        referenceId: Joi.string().allow('').optional(),
    }).required(),
    gameData: Joi.object({
        description: Joi.string().valid('bet', 'cancel', 'partial_cancel', 'tip').required(),
        providerCode: Joi.string().optional(),
        providerTransactionId: Joi.string().optional(),
        gameCode: Joi.string().optional(),
        providerRoundId: Joi.string().optional(),
    }).required(),
    timestamp: Joi.date().timestamp().required(),
});
const creditschema = Joi.object({
    user: Joi.object({
        id: Joi.number().required(),
        currency: Joi.string().required(),
    }).required(),
    partnerKey: Joi.string().required(),
    transactionData: Joi.object({
        id: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        referenceId: Joi.string().required(),
    }).required(),
    gameData: Joi.object({
        description: Joi.string().valid('win', 'lose', 'partial_cancel', 'bonus', 'spin', 'cancel').required(),
        providerCode: Joi.string().optional(),
        providerTransactionId: Joi.string().optional(),
        gameCode: Joi.string().optional(),
        providerRoundId: Joi.string().optional(),
    }).required(),
    timestamp: Joi.date().timestamp().required(),
});
async function getUserMobile(userId) {
    const users = await queryAsync("SELECT `mobile` FROM `user_details` WHERE `id` = ?", [userId]);
    if (!users.length) throw { status: 404, message: "User not found" };
    return users[0].mobile;
}
async function getWalletBalance(mobile) {
    const wallet = await queryAsync2("SELECT `wallet_balance` as wb FROM `wallet` WHERE `user_name` = ?", [mobile]);
    if (!wallet.length) throw { status: 404, message: "Wallet balance not found" };
    return parseFloat(wallet[0].wb) || 0;
}
async function updateWalletBalance(mobile, amount) {
    await queryAsync2("UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = ?", [amount, mobile]);
}
async function checkTransactionExists(transactionId) {
    const result = await queryAsync("SELECT `transactiondata_Id` FROM `casino_bet` WHERE `transactiondata_Id` = ?", [transactionId]);
    return result.length > 0;
}
async function checkreferenceidExists(transactionId) {
    const result = await queryAsync("SELECT `transactiondata_referenceId` FROM `casino_bet` WHERE `transactiondata_referenceId` = ?", [transactionId]);
    return result.length > 0;
}
function createResponse(partnerKey, userId, balance, status) {
    return {
        partnerKey: partnerKey || null,
        timestamp: Date.now(),
        userId: userId || null,
        balance: balance || 0,
        status: status,
    };
}
function handleError(res, error) {
    console.error("Error:", error.message || error);
    res.status(error.status || 500).json({
        error: true,
        message: error.message || "Internal Server Error",
    });
}
const debittransactionHandlers = {
    bet: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (await checkTransactionExists(transactionData.id)) {
            throw { status: 422, message: "The transaction ID has already been processed" };
        }
        if (balance < transactionData.amount) {
            throw { status: 422, message: "Insufficient funds to complete the transaction" };
        }
        await queryAsync(
            `INSERT INTO casino_bet(userid, gamedata_providerCode, gamedata_providerTransactionId, gamedata_gameCode,
             gamedata_description, gamedata_providerRoundId, transactiondata_Id, transactiondata_amount, transactiondata_referenceId, timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.id, gameData.providerCode, gameData.providerTransactionId, gameData.gameCode,
            gameData.description, gameData.providerRoundId, transactionData.id, transactionData.amount,
            transactionData.referenceId, new Date().toISOString()]
        );
        await updateWalletBalance(mobile, -transactionData.amount);
        return createResponse(partnerKey, user.id, balance - transactionData.amount, { code: "SUCCESS", message: "" });
    },

    cancel: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, transactionData.amount);
        return createResponse(partnerKey, user.id, balance + transactionData.amount, { code: "SUCCESS", message: "" });
    },

    partial_cancel: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, transactionData.amount);
        return createResponse(partnerKey, user.id, balance + transactionData.amount, { code: "SUCCESS", message: "" });
    },

    tip: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);

        if (await checkTransactionExists(transactionData.id)) {
            throw { status: 422, message: "The transaction ID has already been processed" };
        }
        if (balance < transactionData.amount) {
            throw { status: 422, message: "Insufficient funds to complete the transaction" };
        }
        await queryAsync(
            `INSERT INTO casino_bet(userid, gamedata_providerCode, gamedata_providerTransactionId, gamedata_gameCode,
             gamedata_description, gamedata_providerRoundId, transactiondata_Id, transactiondata_amount, transactiondata_referenceId, timestamp)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.id, gameData.providerCode, gameData.providerTransactionId, gameData.gameCode,
            gameData.description, gameData.providerRoundId, transactionData.id, transactionData.amount,
            transactionData.referenceId, new Date().toISOString()]
        );
        await updateWalletBalance(mobile, -transactionData.amount);
        return createResponse(partnerKey, user.id, balance - transactionData.amount, { code: "SUCCESS", message: "" });
    },
};
const credittransactionHandlers = {
    win: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)){
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, transactionData.amount);
        return createResponse(partnerKey, user.id, balance + transactionData.amount, { code: "SUCCESS", message: "" });
    },

    lose: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        return createResponse(partnerKey, user.id, balance - transactionData.amount, { code: "SUCCESS", message: "" });
    },

    partial_cancel: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, -transactionData.amount);
        return createResponse(partnerKey, user.id, balance - transactionData.amount, { code: "SUCCESS", message: "" });
    },

   
    cancel: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, -transactionData.amount);
        return createResponse(partnerKey, user.id, balance - transactionData.amount, { code: "SUCCESS", message: "" });
    },

   
    bonus: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, transactionData.amount);
        return createResponse(partnerKey, user.id, balance + transactionData.amount, { code: "SUCCESS", message: "" });
    },

   
    spin: async (user, transactionData, gameData, partnerKey) => {
        const mobile = await getUserMobile(user.id);
        const balance = await getWalletBalance(mobile);
        if (!(await checkTransactionExists(transactionData.referenceId))) {
            throw { status: 422, message: "This transactiondata ID does not exist" };
        }
        if (await checkreferenceidExists(transactionData.referenceId)) {
            throw { status: 422, message: "The bet amount has already been successfully processed" };
        }
        await updateWalletBalance(mobile, transactionData.amount);
        return createResponse(partnerKey, user.id, balance + transactionData.amount, { code: "SUCCESS", message: "" });
    },

   
};

app.post('/debit', async (req, res) => {
    try {
        const { error } = debitschema.validate(req.body);
        if (error) {
            let message = error.details[0].message;
            if (error.details[0].context.key === 'description') {
                message = "Invalid game description";
            }
            return res.status(400).json({ error: true, message });
        }
        const { user, partnerKey, transactionData, gameData } = req.body;
        if (partnerKey !== mypartnerKey) {
            return res.status(422).json(createResponse(null, null, 0, { code: "LOGIN_FAILED", message: "Given partner key is incorrect" }));
        }
        const handler = debittransactionHandlers[gameData.description];
        if (!handler) throw { status: 400, message: "Invalid game description" };
        const response = await handler(user, transactionData, gameData, partnerKey);
        res.status(200).json(response);
    } catch (err) {
        handleError(res, err);
    }
});
app.post('/credit', async (req, res) => {
    try {
        const { error } = creditschema.validate(req.body);
        if (error) {
            let message = error.details[0].message;
            if (error.details[0].context.key === 'description') {
                message = "Invalid game description";
            }
            return res.status(400).json({ error: true, message });
        }
        const { user, partnerKey, transactionData, gameData } = req.body;
        if (partnerKey !== mypartnerKey) {
            return res.status(422).json(createResponse(null, null, 0, { code: "LOGIN_FAILED", message: "Given partner key is incorrect" }));
        }
        const handler = credittransactionHandlers[gameData.description];
        if (!handler) throw { status: 400, message: "Invalid game description" };
        const response = await handler(user, transactionData, gameData, partnerKey);
        res.status(200).json(response);
    } catch (err) {
        handleError(res, err);
    }
});


module.exports = app;