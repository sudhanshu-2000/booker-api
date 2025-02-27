const express = require("express");
const app = express.Router();
exports.app = app;
const { queryAsync, queryAsync3 } = require('../db/conn');
const atob = require('atob');
const btoa = require('btoa');
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const bodyParser = require("body-parser");
const cron = require('node-cron');
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.post("/get-game-type", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const result = await queryAsync3("SELECT * FROM `game_type`");
        res.status(200).json(btoa(JSON.stringify({ data: result })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            message: "Failed to retrieve game types",
        })));
    }
});

app.post("/get-record-complete", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        let limit = 20;
        let offset = limit * req.body.page - limit;
        const result = await queryAsync3("SELECT MAX(r.id) AS id,r.period,r.price,r.start_date,r.end_date,r.date,MAX(r.number) AS number,MAX(r.status) AS status,MAX(r.game_type) AS game_type,(SELECT COUNT(*) FROM `record` WHERE `status` = 'Y' AND `game_type` = ?) AS count,GROUP_CONCAT(DISTINCT (SELECT code FROM game_color WHERE id = gm.color_id) ORDER BY gm.color_id SEPARATOR ', ') AS color_code FROM `record` AS r INNER JOIN game_number AS gn ON r.number = gn.number INNER JOIN game_mapping AS gm ON gm.number_id = gn.id AND gm.game_type_id = r.game_type WHERE r.`status` = 'Y' AND r.`game_type` = ? GROUP BY r.period, r.price, r.start_date, r.end_date, r.date ORDER BY id DESC LIMIT ? OFFSET ?;", [req.body.id, req.body.id, limit, offset]);
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result, })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({ error: true, status: false, message: "Failed to fetch records", })));
    }
});
app.post("/get-record-complete-details", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        let limit = 10;
        let offset = limit * req.body.page - limit;
        const result = await queryAsync3(
            "SELECT r.*, (SELECT COUNT(*) FROM `record` WHERE `status` = 'Y' AND `game_type` = ?) AS count, (SELECT code FROM game_color WHERE id = gm.color_id) AS color_code FROM `record` AS r INNER JOIN game_number AS gn ON r.number = gn.number INNER JOIN game_mapping AS gm ON gm.number_id = gn.id AND gm.game_type_id = r.game_type WHERE r.`status` = 'Y' AND r.`game_type` = ? GROUP BY r.period ORDER BY id DESC LIMIT ? OFFSET ?",
            [req.body.id, req.body.id, limit, offset]
        );
        res.status(200).json(btoa(JSON.stringify({
            error: false,
            status: true,
            data: result,
        })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            status: false,
            message: "Failed to fetch records",
        })));
    }
});
app.post("/get-record-not-complete", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const result = await queryAsync3(
            "SELECT `period`, `game_type`,(SELECT `end_coundown` FROM `game_type` WHERE `id` = ?) as coundown, `start_date`, `end_date` FROM `record` WHERE `status` = 'N' AND `game_type` = ?",
            [req.body.id, req.body.id]
        );
        if (result.length > 0 && result[0]) {
            result[0].api_get_time = new Date();
        } else {
            console.log("No matching records found");
        }
        res.status(200).json(btoa(JSON.stringify({
            error: false,
            status: true,
            data: result,
        })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            status: false,
            message: "Failed to fetch incomplete records",
        })));
    }
});
app.post("/get-game-mapping-number", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const result_data = await queryAsync3(
            "SELECT gm.id, gt.id AS game_type, gc.code AS color_code, gn.number AS number FROM game_mapping gm INNER JOIN game_color gc ON gc.id = gm.color_id INNER JOIN game_number gn ON gn.id = gm.number_id INNER JOIN game_type gt ON gt.id = gm.game_type_id WHERE game_type_id = ? ORDER BY CAST(number AS UNSIGNED INTEGER);",
            [req.body.id]
        );
        const grouped = {};
        for (const { color_code, color_name, date, for_color_or_number, game_type, id, number, status } of result_data) {
            const userGroup = (grouped[number] ??= { number, color_name, date, for_color_or_number, game_type, id, status, orders: {} });
            const bookGroup = (userGroup.orders[color_code] ??= { color_code });
        }
        const newdata = Object.values(grouped).map(({ orders, ...rest }) => ({
            ...rest,
            orders: Object.values(orders),
        }))
        res.status(200).json(btoa(JSON.stringify({ data: newdata })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            status: false,
            message: "Failed to fetch game mapping numbers",
        })));
    }
});
app.post("/get-game-mapping-color", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const result = await queryAsync3(
            "SELECT gm.id, gm.for_color_or_number, gt.id AS game_type, gc.name AS color_name, gc.code AS color_code, gm.status, gm.date FROM game_mapping gm INNER JOIN game_color gc ON gc.id = gm.color_id INNER JOIN game_type gt ON gt.id = gm.game_type_id WHERE gm.for_color_or_number = 'only_color' AND game_type_id = ?",
            [req.body.id]
        );
        res.status(200).json(btoa(JSON.stringify({ data: result })));
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            status: false,
            message: "Failed to fetch game mapping colors",
        })));
    }
});

// bet-record
app.post("/get-bet-record", verifytoken, async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const limit = 10;
        const offset = limit * req.body.page - limit;
        const result = await queryAsync3(
            "SELECT bt.id, bt.Period, bt.`game-type`, bt.price, bt.type, bt.value, bt.if_open_zero, (SELECT gc.CODE FROM `game_color` as gc WHERE gc.name = bt.value) AS color, (SELECT COUNT(*) FROM `bet-table` WHERE `username` = ? AND `game-type` = ?) AS count, bt.open_color, bt.open_number as number, bt.`winning-amount` as winning_amount, bt.date FROM `bet-table` as bt WHERE bt.`username` = ? and bt.`game-type` = ? ORDER BY bt.id DESC LIMIT ? OFFSET ?;",
            [req.body.mobile, req.body.id, req.body.mobile, req.body.id, limit, offset]
        );
        res.status(200).json(btoa(JSON.stringify({ error: false, status: true, data: result })));
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: true, message: err.message });
    }
});
app.post("/add-bet-details", async (req, res) => {
    try {
        req.body = JSON.parse(atob(req.body.data));
        const checks = { 2: 30, 3: 25, 9: 20, 10: 5 };
        const [timeResult] = await queryAsync3("SELECT TIMESTAMPDIFF(SECOND, NOW(), r.end_date) AS time, period FROM `record` AS r WHERE `status` = 'N' AND `game_type` = ?", [req.body.game_type]);
        if (timeResult.period != req.body.period) {
            return res.status(302).json(btoa(JSON.stringify({ error: true, status: false, message: "Game session has ended. Please Reffesh Page." })));
        } else if (timeResult && timeResult.time >= checks[req.body.game_type]) {
            if (req.body.method == 'Number') {
                const walletCheck = await queryAsync("SELECT IF(game_wallet >= ?,'true','false') AS result FROM wallet WHERE `user_name` = ?", [parseInt(req.body.total_amount), req.body.mobile]);
                if (walletCheck[0].result === "false") {
                    return res.status(302).json(btoa(JSON.stringify({ error: true, status: false, massage: "Insufficient Balance in your Account" })));
                }
                const gmae_type = await queryAsync3("(SELECT `name` FROM `game_type` WHERE `id` =?)", [req.body.game_type]);
                await queryAsync("UPDATE `wallet` SET `wagering`= `wagering` + ?, `monthly_wagering` = `monthly_wagering` + ?, `game_wallet`= `game_wallet` - ? WHERE `user_name`=?", [parseInt(req.body.total_amount), parseInt(req.body.total_amount), parseInt(req.body.total_amount), req.body.mobile]);
                await queryAsync3("INSERT INTO `bet-table`(`Period`, `username`, `price`, `type`, `winning-amount`, `if_open_zero`, `value`,`value_id`, `game-type`, `term_condition`) VALUES (?,?,?,?,(SELECT `multiple` FROM `game_mapping` WHERE `id`=?)*?,(SELECT `if_open_zero` FROM `game_mapping` WHERE `id`=?)*?,?,?,?,'Y')", [req.body.period, req.body.mobile, req.body.total_amount, req.body.method, req.body.id, req.body.total_amount, req.body.id, req.body.total_amount, req.body.select, req.body.id, req.body.game_type]);
                await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,'Add Bet',?,?,?,'Color-Game',?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?))", [req.body.mobile, gmae_type[0].name, req.body.period, req.body.select, req.body.total_amount, req.body.mobile]);
                return res.status(200).json(btoa(JSON.stringify({ error: false, status: true })));
            } else {
                const checkbet = await queryAsync3("SELECT value FROM `bet-table` WHERE `username` = ? AND `game-type` = ? AND `Period` = ? and `type` = 'Color' and `value` != 'Violet'", [req.body.mobile, req.body.game_type, req.body.period]);
                if (checkbet.length == 0) {
                    const walletCheck = await queryAsync("SELECT IF(`game_wallet` >= ?,'true','false') AS result FROM wallet WHERE `user_name` = ?", [parseInt(req.body.total_amount), req.body.mobile]);
                    if (walletCheck[0].result === "false") {
                        return res.status(302).json(btoa(JSON.stringify({ error: true, status: false, massage: "Insufficient Balance in your Account" })));
                    }
                    const gmae_type = await queryAsync3("(SELECT `name` FROM `game_type` WHERE `id` =?)", [req.body.game_type]);
                    await queryAsync("UPDATE `wallet` SET `wagering`= `wagering` + ?, `monthly_wagering` = `monthly_wagering` + ?, `game_wallet`= `game_wallet` - ? WHERE `user_name`=?", [parseInt(req.body.total_amount), parseInt(req.body.total_amount), parseInt(req.body.total_amount), req.body.mobile]);
                    await queryAsync3("INSERT INTO `bet-table`(`Period`, `username`, `price`, `type`, `winning-amount`, `if_open_zero`, `value`,`value_id`, `game-type`, `term_condition`) VALUES (?,?,?,?,(SELECT `multiple` FROM `game_mapping` WHERE `id`=?)*?,(SELECT `if_open_zero` FROM `game_mapping` WHERE `id`=?)*?,?,?,?,'Y')", [req.body.period, req.body.mobile, req.body.total_amount, req.body.method, req.body.id, req.body.total_amount, req.body.id, req.body.total_amount, req.body.select, req.body.id, req.body.game_type]);
                    await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,'Add Bet',?,?,?,'Color-Game',?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?))", [req.body.mobile, gmae_type[0].name, req.body.period, req.body.select, req.body.total_amount, req.body.mobile]);
                    return res.status(200).json(btoa(JSON.stringify({ error: false, status: true })));
                } else {
                    if (req.body.select !== 'Violet') {
                        const exists = checkbet.some(obj => obj.value === req.body.select);
                        if (!exists) {
                            return res.status(302).json(
                                btoa(
                                    JSON.stringify({
                                        error: true,
                                        status: false,
                                        message: `You are already added in ${req.body.select === 'Red' ? 'Green' : 'Red'} color. Adding a bet in ${req.body.select} color is not allowed.`
                                    })
                                )
                            );
                        }
                    }
                    const walletCheck = await queryAsync("SELECT IF(game_wallet >= ?,'true','false') AS result FROM wallet WHERE `user_name` = ?", [parseInt(req.body.total_amount), req.body.mobile]);
                    if (walletCheck[0].result === "false") {
                        return res.status(302).json(btoa(JSON.stringify({
                            error: true, status: false, message: "Insufficient Balance in your Account"
                        })));
                    }
                    const gmae_type = await queryAsync3("(SELECT `name` FROM `game_type` WHERE `id` =?)", [req.body.game_type]);
                    await queryAsync("UPDATE `wallet` SET `wagering`= `wagering` + ? , `monthly_wagering` = `monthly_wagering` + ?, `game_wallet`= `game_wallet` - ? WHERE `user_name`=?", [parseInt(req.body.total_amount), parseInt(req.body.total_amount), parseInt(req.body.total_amount), req.body.mobile]);
                    await queryAsync3("INSERT INTO `bet-table` (`Period`, `username`, `price`, `type`, `winning-amount`, `if_open_zero`, `value`, `value_id`, `game-type`, `term_condition`) VALUES (?,?,?,?,(SELECT `multiple` FROM `game_mapping` WHERE `id`=?)*?,(SELECT `if_open_zero` FROM `game_mapping` WHERE `id`=?)*?,?,?,?,'Y')", [req.body.period, req.body.mobile, req.body.total_amount, req.body.method, req.body.id, req.body.total_amount, req.body.id, req.body.total_amount, req.body.select, req.body.id, req.body.game_type]);
                    await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,'Add Bet',?,?,?,'Color-Game',?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?))", [req.body.mobile, gmae_type[0].name, req.body.period, req.body.select, req.body.total_amount, req.body.mobile]);
                    return res.status(200).json(btoa(JSON.stringify({ error: false, status: true })));
                }
            }
        } else {
            return res.status(302).json(btoa(JSON.stringify({ error: true, status: false, message: "Game session has ended. Please place your bet in the next session." })));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, status: false, message: err.message });
    }
});
// Statement
app.post("/get-statement", verifytoken, async (req, res) => {
    try {
        let limit = 100;
        let offset = limit * req.body.page - limit;
        const result = await queryAsync(
            "SELECT s.*, (SELECT COUNT(*) FROM `game_statement` WHERE `username` = ?) AS count FROM `game_statement` as s WHERE s.`username` = ? ORDER BY s.id DESC LIMIT ? OFFSET ?",
            [req.body.mobile, req.body.mobile, limit, offset]
        );
        res.status(200).json({
            error: false,
            status: true,
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(btoa(JSON.stringify({
            error: true,
            status: false,
            message: "Failed to retrieve statement",
        })));
    }
});


const deleteOldRecords = async (gameType, limit = 1000) => {
    await queryAsync3(
        `DELETE FROM \`record\` 
     WHERE id NOT IN (
       SELECT id 
       FROM (SELECT id FROM \`record\` ORDER BY id DESC LIMIT ?) AS temp
     ) AND \`game_type\` = ?`,
        [limit, gameType]
    );
};
const updateRecordStatus = async (gameType) => {
    await queryAsync3(
        `UPDATE \`record\` 
     SET \`status\` = 'Y' 
     WHERE \`status\` = 'N' AND \`game_type\` = ?`,
        [gameType]
    );
};
const insertNewRecord = async (gameType, intervalInSeconds) => {
    const bufferInSeconds = 3; // Add buffer to avoid frontend delays
    const now = new Date();
    const endDate = new Date(now.getTime() + (intervalInSeconds + bufferInSeconds) * 1000);
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            await queryAsync3(
                `INSERT INTO \`record\`(\`period\`, \`game_type\`, \`end_date\`) 
                VALUES ((SELECT COALESCE(MAX(r.\`period\`), 0) + 1 FROM \`record\` AS r WHERE r.\`game_type\` = ?), ?, ?)`,
                [gameType, gameType, endDate]
            );
            break; 
        } catch (error) {
            if (error.code === 'ER_LOCK_DEADLOCK' && attempt < maxRetries - 1) {
                console.warn(`Deadlock detected, retrying... Attempt ${attempt + 1}`);
                attempt++;
                await new Promise(resolve => setTimeout(resolve, 100 * attempt));
            } else {
                console.error(`Failed to insert record for gameType ${gameType}:`, error);
                throw error;
            }
        }
    }
};
const handleGameType = async (gameType, intervalInSeconds) => {
    try {
        await deleteOldRecords(gameType);
        await updateRecordStatus(gameType);
        await insertNewRecord(gameType, intervalInSeconds);
    } catch (err) {
        console.error(`Error handling gameType ${gameType}:`, err);
    }
};

const addRecord30Sec = () => handleGameType(10, 30);
const addRecord1Min = () => handleGameType(9, 60);
const addRecord2Min = () => handleGameType(3, 120);
const addRecord = () => handleGameType(2, 180);
const callProcedures = async () => {
    try {
        const gameTypes = [2, 3, 9, 10];
        const checks = { 2: 30, 3: 25, 9: 20, 10: 5 };

        for (const gameType of gameTypes) {
            const [timeResult] = await queryAsync3(
                `SELECT TIMESTAMPDIFF(SECOND, NOW(), r.end_date) AS time 
         FROM \`record\` AS r 
         WHERE \`status\` = 'N' AND \`game_type\` = ?`,
                [gameType]
            );

            const [periodResult] = await queryAsync3(
                `SELECT r.period AS pp 
         FROM \`record\` AS r 
         WHERE \`status\` = 'N' AND \`game_type\` = ?`,
                [gameType]
            );

            if (timeResult && timeResult.time === checks[gameType]) {
                const randomNum = Math.floor(Math.random() * 10000);

                try {
                    await addTotalByNumber(periodResult.pp, gameType);
                    await randomnumber(periodResult.pp, gameType, randomNum);
                    await queryAsync3(
                        `DELETE FROM \`total_amount\` 
             WHERE id NOT IN (
               SELECT id 
               FROM (SELECT id FROM \`total_amount\` ORDER BY id DESC LIMIT 9000) AS temp
             ) AND \`game_type\` = ?`,
                        [gameType]
                    );
                } catch (err) {
                    if (err.code === 'ER_LOCK_DEADLOCK') {
                        console.log('Deadlock occurred. Retrying after a delay...');
                        await new Promise((res) => setTimeout(res, 100)); // Retry after 100ms
                        continue;
                    } else {
                        throw err;
                    }
                }
            }
        }
    } catch (err) {
        console.error("Error in callProcedures:", err);
    }
}

cron.schedule("*/30 * * * * *", addRecord30Sec);
cron.schedule("* * * * * *", callProcedures);
cron.schedule("*/2 * * * *", addRecord2Min);
cron.schedule("*/1 * * * *", addRecord1Min);
cron.schedule("*/3 * * * *", addRecord);

async function singlenumber(period, game_type, ran) {
    try {
        let totalbet = 0;
        let totalwamount = 0;
        let opennumber = 0;
        let countvalue = 0;
        const totalBetResults = await queryAsync3('SELECT SUM(`price`) as totalbet FROM `bet-table` WHERE `Period` = ? AND `game-type` = ?', [period, game_type]);
        totalbet = totalBetResults[0]?.totalbet || 0;
        const totalWAmountResults = await queryAsync3('SELECT `amount` FROM `total_amount` WHERE `period` = ? AND `game_type` = ? AND `amount` > 0 ORDER BY `amount` ASC LIMIT 1', [period, game_type]);
        totalwamount = totalWAmountResults[0]?.amount || 0;
        const openNumberResults = await queryAsync3('SELECT `number` FROM `total_amount` WHERE `period` = ? AND `game_type` = ? AND `amount` = (SELECT MIN(NULLIF(`amount`, 0)) FROM `total_amount` WHERE `period` = ? AND `game_type` = ?) ORDER BY RAND() LIMIT 1', [period, game_type, period, game_type]);
        opennumber = openNumberResults[0]?.number || 0;
        const countValueResults = await queryAsync3('SELECT COUNT(*) as countvalue FROM `total_amount` WHERE `period` = ? AND `game_type` = ? AND `amount` > 0', [period, game_type]);
        countvalue = countValueResults[0]?.countvalue || 0;
        if (countvalue === 0) {
            const a1 = Math.floor(Math.random() * 10);
            await queryAsync3('UPDATE `record` SET `price` = ?, `number` = ? WHERE `period` = ? AND `game_type` = ?', [ran, a1, period, game_type]);
        } else if (countvalue === 1) {
            let a2;
            do {
                a2 = Math.floor(Math.random() * 10);
            } while (a2 === opennumber);
            await queryAsync3('UPDATE `record` SET `price` = ?, `number` = ? WHERE `period` = ? AND `game_type` = ?', [ran, a2, period, game_type]);
        } else {
            if (totalwamount === totalbet) {
                await updateRecordAndCallProcedures(ran, period, game_type, opennumber);
            } else if (totalwamount < totalbet) {
                await updateRecordAndCallProcedures(ran, period, game_type, opennumber);
            } else if (totalwamount > totalbet) {
                if (countvalue === 10) {
                    await updateRecordAndCallProcedures(ran, period, game_type, opennumber);
                } else if (countvalue < 10) {
                    const ifzroResults = await queryAsync3('SELECT `number` FROM `total_amount` WHERE `period` = ? AND `game_type` = ? AND `amount` = 0 ORDER BY RAND() LIMIT 1', [period, game_type]);
                    const ifzro = ifzroResults[0]?.number || 0;
                    await updateRecordAndCallProcedures(ran, period, game_type, ifzro);
                }
            }
        }
    } catch (error) {
        console.error('Error in singlenumber function:', error);
    }
}
async function randomnumber(period, game_type, ran) {
    try {
        let a2;
        a2 = Math.floor(Math.random() * 10);
        await queryAsync3('UPDATE `record` SET `price` = ?, `number` = ? WHERE `period` = ? AND `game_type` = ?', [ran, a2, period, game_type]);
        await updateRecordAndCallProcedures(ran, period, game_type, a2);
    } catch (error) {
        console.error('Error in singlenumber function:', error);
    }
}
async function updateRecordAndCallProcedures(ran, period, game_type, number) {
    await queryAsync3('UPDATE `record` SET `price` = ?, `number` = ? WHERE `period` = ? AND `game_type` = ?', [ran, number, period, game_type]);
    // await queryAsync('CALL winnerwalletnumber(?, ?, ?)', [period, game_type, number]);
    await winnerWalletNumber(period, game_type, number);
    const color = getColor(number);
    await winnerWalletColor(period, game_type, number, color);
    await queryAsync3("UPDATE `bet-table` SET `open_color`=? ,`open_number`= ? WHERE `Period` = ? and `game-type` = ?", [color, number,period, game_type]);
    // await queryAsync('CALL winnerwalletcolor(?, ?, ?, ?)', [period, game_type, number, color]);
}
const winnerWalletNumber = async (period, gameType, num) => {
    try {
        const selectQuery = "SELECT ta.username, ta.`winning-amount` AS winAmount FROM `bet-table` AS ta WHERE ta.`Period` = ? AND ta.`game-type` = ? AND ta.`value` = ?";
        const users = await queryAsync3(selectQuery, [period, gameType, num]);
        for (const user of users) {
            const { username, winAmount } = user;
            const updateQuery = "UPDATE `wallet` SET `game_wallet` = `game_wallet` + ? WHERE `user_name` = ?";
            await queryAsync(updateQuery, [winAmount, username]);
            const gmae_type = await queryAsync3("(SELECT `name` FROM `game_type` WHERE `id` =?)", [gameType]);
            const statementQuery = "INSERT INTO `game_statement`(`username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,'Win Bet',?,?,?,'Color-Game',?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?)	)";
            await queryAsync(statementQuery, [username, gmae_type[0].name, period, num, winAmount, username]);
        }
        // console.log('Winner wallet numbers processed successfully.');
    } catch (error) {
        console.error('Error in winnerWalletNumber:', error);
        throw error;
    }
};
const winnerWalletColor = async (period, gameType, num, color) => {
    try {
        // Helper function to get count from `bet-table`
        const getCount = async (value) => {
            const query = `
        SELECT COUNT(*) AS count
        FROM \`bet-table\`
        WHERE \`Period\` = ? AND \`game-type\` = ? AND \`value\` = ?`;
            const [result] = await queryAsync3(query, [period, gameType, value]);
            return result.count || 0;
        };

        // Count the occurrences for each color and value
        const [valueColor, valueRed, valueGreen] = await Promise.all([
            getCount(color),
            getCount("Red"),
            getCount("Green")
        ]);

        // Helper function to process the cursor data and update the wallet
        const processCursor = async (value, type) => {
            const cursorQuery = "SELECT username, if_open_zero, `winning-amount` FROM `bet-table` WHERE `Period` = ? AND `game-type` = ? AND `value` = ?";
            const cursorData = await queryAsync3(cursorQuery, [period, gameType, value]);

            for (const { username, if_open_zero, "winning-amount": winningAmount } of cursorData) {
                const amountToAdd = (num === 0 || num === 5) ? if_open_zero : winningAmount;

                if (amountToAdd) {
                    const updateWalletQuery = "UPDATE `wallet` SET `game_wallet` = `game_wallet` + ? WHERE `user_name` = ?";
                    await queryAsync(updateWalletQuery, [amountToAdd, username]);
                    const gmae_type = await queryAsync3("(SELECT `name` FROM `game_type` WHERE `id` =?)", [gameType]);
                    // Insert statement into `statement` table
                    const insertStatementQuery = "INSERT INTO `game_statement`(`username`, `bet_type`, `game_name`, `period`, `Select`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,'Win Bet',?,?,?,'Color-Game',?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?))";
                    await queryAsync(insertStatementQuery, [
                        username,
                        gmae_type[0].name,
                        period,
                        type,
                        amountToAdd,
                        username,
                    ]);
                }
            }
        };
        if (num === 0) {
            if (valueColor > 0) await processCursor(color, color);
            if (valueRed > 0) await processCursor("Red", "Red");
        } else if (num === 5) {
            if (valueColor > 0) await processCursor(color, color);
            if (valueGreen > 0) await processCursor("Green", "Green");
        } else {
            if (valueColor > 0) await processCursor(color, color);
        }
    } catch (error) {
        console.error("Error in winnerWalletColor:", error);
        throw error;
    }
};
const addTotalByNumber = async (period, gameType) => {
    try {
        const queries = [
            { key: '0', conditions: ["bt.value = '0'", "bt.value = 'Violet'", "bt.value = 'Red'"], column: 'if_open_zero' },
            { key: '1', conditions: ["bt.value = '1'", "bt.value = 'Green'"], column: 'winning-amount' },
            { key: '2', conditions: ["bt.value = '2'", "bt.value = 'Red'"], column: 'winning-amount' },
            { key: '3', conditions: ["bt.value = '3'", "bt.value = 'Green'"], column: 'winning-amount' },
            { key: '4', conditions: ["bt.value = '4'", "bt.value = 'Red'"], column: 'winning-amount' },
            { key: '5', conditions: ["bt.value = '5'", "bt.value = 'Violet'", "bt.value = 'Green'"], column: 'if_open_zero' },
            { key: '6', conditions: ["bt.value = '6'", "bt.value = 'Red'"], column: 'winning-amount' },
            { key: '7', conditions: ["bt.value = '7'", "bt.value = 'Green'"], column: 'winning-amount' },
            { key: '8', conditions: ["bt.value = '8'", "bt.value = 'Red'"], column: 'winning-amount' },
            { key: '9', conditions: ["bt.value = '9'", "bt.value = 'Green'"], column: 'winning-amount' },
        ];
        const results = {};
        for (const { key, conditions, column } of queries) {
            const query = `
        SELECT (
          ${conditions
                    .map(
                        (condition) => `
            COALESCE(
              (SELECT SUM(bt.\`${column}\`) 
               FROM \`bet-table\` AS bt 
               WHERE bt.Period = ? 
                 AND bt.\`game-type\` = ? 
                 AND ${condition}), 0)`
                    )
                    .join(' + ')}
        ) AS total;
      `;
            const [row] = await queryAsync3(query, Array(conditions.length).fill(period).concat(Array(conditions.length).fill(gameType)));
            results[key] = row.total || 0;
        }
        const numberColorMap = [
            { number: '0', color: 'Violet' },
            { number: '1', color: 'Green' },
            { number: '2', color: 'Red' },
            { number: '3', color: 'Green' },
            { number: '4', color: 'Red' },
            { number: '5', color: 'Violet' },
            { number: '6', color: 'Red' },
            { number: '7', color: 'Green' },
            { number: '8', color: 'Red' },
            { number: '9', color: 'Green' },
        ];
        const insertQuery = `
      INSERT INTO \`total_amount\` (\`period\`, \`number\`, \`color\`, \`amount\`, \`game_type\`)
      VALUES ${numberColorMap.map(() => "(?, ?, ?, ?, ?)").join(", ")};
    `;
        const insertValues = numberColorMap.flatMap(({ number, color }, index) => [
            period,
            number,
            color,
            results[number] || 0,
            gameType,
        ]);
        await queryAsync3(insertQuery, insertValues);
        // console.log('Total amounts inserted successfully.');
    } catch (error) {
        console.error('Error in addTotalByNumber:', error);
        throw error;
    }
};


function verifytoken(req, res, next) {
    // const bearerHeader = req.headers["authorization"];  
    // if (typeof bearerHeader !== "undefined") {
    //   const bearer = bearerHeader.split(" ");
    //   const bearerToken = bearer[1];
    //   req.token = bearerToken;
    //   jwt.verify(req.token, process.env.SECRET_KEY_USER, (err, auth) => {
    //     if (err) {
    //       res.status(403).send('Token Expire');
    //     } else {
    //       if ((req.body.mobile) != undefined) {
    //         if (auth.username == req.body.mobile) {
    //           next();
    //         } else {
    //           res.status(403).send("false");
    //         }
    //       }
    //       if ((req.body.data) != undefined) {
    //         if ((auth.username == JSON.parse(atob(req.body.data)).mobile)) {
    //           next();
    //         } else {
    //           res.status(403).send("false");
    //         }
    //       }
    //     }
    //   });
    // } else {
    //   res.sendStatus(403);
    // }
    next();
};
function getColor(num) {
    let color;

    switch (num) {
        case 0:
        case 5:
            color = 'Violet';
            break;
        case 1:
        case 3:
        case 7:
        case 9:
            color = 'Green';
            break;
        case 2:
        case 4:
        case 6:
        case 8:
            color = 'Red';
            break;
        default:
            color = 'Unknown';
            break;
    }

    return color;
}

module.exports = app;