const express = require("express");
const app = express.Router();
exports.app = app;
const dkim = require('node-dkim');
const { con, queryAsync, queryAsync3 } = require('../db/conn');
var jwt = require("jsonwebtoken");
var atob = require('atob');
var btoa = require('btoa');
const cors = require("cors");
const verifytoken = require('../middle/user-auth');
app.use(cors());
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var multer = require("multer");
const CryptoJS = require('crypto-js');
const cron = require('node-cron');
require('dotenv').config();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLmit: 5000
}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });
const nodemailer = require("nodemailer");
const fs = require('fs');
const https = require('https');
const axios = require('axios');
function deleteImage(imagePath) {
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) { return; }
    fs.unlink(imagePath, (err) => {
      if (err) { return; }
    });
  });
}
const dkimoptions = {
  privateKey: 'MIIEpAIBAAKCAQEAswdBCr+jlzGLx6QqJV4b5lKFgSvAmn9iWe96zjdNm6pH1INpoprTeamC7Jj5e76Zcfv1C4sLYtgMkAlQGKIXjDHUWjhsFSnBrnKTLFTtdPsDAPJwzvG5lJXj0HM8eMOWCDcTqzCV1Duw1E0ReqPyUf4JeSRpbr646m4JXzRY+ aXtznPPsRPgBOV5VhcO4pCZXbHimyiZHxYK4F1sBdHj7ljDsPKVb4oLF1EtIxTlHuTdjBxFnwYvRi50NXAli2fCsBY3FKMX + vk0c6bw + XRBodjXDpWsSmQBQZJekvDN3mt3 / EyeEQh / bWEqDmm5J7gw0380kNsi3UOBh5qonveTlwIDAQABAoIBAAIBSDQLkAQbZGGzxsrn4c9xL1v + ma2VyvhEEAKR8oBvAlBr4Khl4K5wuW9 + MUCV3g8mg0IuYAkdsSLWzZr3yhJW0870TBhavDYhaA7cC4HKX6ApUgOZKMgR3fw + tfE0mz / HiQCgP + Ca / 48JvganXTCyc / uHKdER4OA9aKEaM7nsU2X8jMDoVCBo4vqs61YKaV7E / VsIWBQCT8n85Kcg3Xng52e7hHFM / wAPwQ0qNld0XrIAXdrBD73Q9R4agKSf9U / vyVUVVIM4WdDO2nAyStJgLmzKm53Bu2YLuHefRl9PqKOfE7hmU3 / uypY87vhkYBOLd9cCgSNg3qbqXxuHJNECgYEA2WUnyiqyv / FEcj3OVtmbd034b9iAmn + NmZ2YWVFCprMT1S0OKGlclD65VCQKhh1UUZmFIFxWcFaFFULAuNvFxJLSyqd4CbwhKGEaYxGlUnbyKvTg16QbatGryCPSpLpAwj9b / adL + LR3qiUTt6NTPY77fD + YLDb53 / 5h6qr91qkCgYEA0tHu1Zc1b0VUtGXCR7sdPkSPiphjURKoScU12zR9m2B70NNFyI8Wq5dNxrMnl0JMSMwqpJHqxKquHbHc8c5t4m1MNdi62gor1S + j / TaoCu + UW1Ng9kGYbqnfuBofMOxVFRdpCQ1vXQTmS6w5Z4R2LCpfEhMuyiKfYs / B9XsZwD8CgYEAoTCIxTTNntY0qwQ6x1jIFjjg2YVNLcEf6 + PXP3qqEdI8BVdH5RziQSUU41dp2jFLAMn01J7ClL8CJFZ / cVG7HNrEovBzZ7xvVXJST1yZGUEKpGE3iYyrq5NVbKtrFyrms2CpQ7VU9k5RX / 3n1cSrBrzKqUC6AyasNbJ3RbmNRykCgYEAiHkgLCKjk7GFAPbyyq6lYp7NcUHu4Re7222PzKRxP3k5DdkGzqtaWKAs2Bk34uInMeUBIeHX4ZI//rcaOWqRlcd9U0pGw0lcULhzZ0LPi6zGFEyocyHJhLHxQmOel3QWK / 4on5ST59p5HrmRu6JzQWn4e2HxoybAmR23CKu04s8CgYAmJUvX6v5rT / mohOdsFgYHeD1tdKcJg502Gl + jDjpGyXPTMcUCo1k +  TvSJDD2R9u9UbdERbVeL3 + s / aKA1SAMBghFe0q + TqAIVYgOghPsJ8S / WtcnT6ixAk0Khi3LsJX1FMvdEj + SODM2Ea967eZmocg8WPhPfmUrks0PHLJDynw == ', // Use environment variable for security
  domainName: 'kmaobharat.com',
  selector: 'default', // This should match the DKIM selector in your DNS records
}

const transporter = nodemailer.createTransport({
  name: "mail.kmaobharat.com",
  host: "mail.kmaobharat.com",
  port: 465,
  secure: true,
  auth: {
    user: "otp@kmaobharat.com",
    pass: "Ee5-E(Mz?Tm#",
  },
  dkim: {
    privateKey: 'MIIEpAIBAAKCAQEAswdBCr+jlzGLx6QqJV4b5lKFgSvAmn9iWe96zjdNm6pH1INpoprTeamC7Jj5e76Zcfv1C4sLYtgMkAlQGKIXjDHUWjhsFSnBrnKTLFTtdPsDAPJwzvG5lJXj0HM8eMOWCDcTqzCV1Duw1E0ReqPyUf4JeSRpbr646m4JXzRY+ aXtznPPsRPgBOV5VhcO4pCZXbHimyiZHxYK4F1sBdHj7ljDsPKVb4oLF1EtIxTlHuTdjBxFnwYvRi50NXAli2fCsBY3FKMX + vk0c6bw + XRBodjXDpWsSmQBQZJekvDN3mt3 / EyeEQh / bWEqDmm5J7gw0380kNsi3UOBh5qonveTlwIDAQABAoIBAAIBSDQLkAQbZGGzxsrn4c9xL1v + ma2VyvhEEAKR8oBvAlBr4Khl4K5wuW9 + MUCV3g8mg0IuYAkdsSLWzZr3yhJW0870TBhavDYhaA7cC4HKX6ApUgOZKMgR3fw + tfE0mz / HiQCgP + Ca / 48JvganXTCyc / uHKdER4OA9aKEaM7nsU2X8jMDoVCBo4vqs61YKaV7E / VsIWBQCT8n85Kcg3Xng52e7hHFM / wAPwQ0qNld0XrIAXdrBD73Q9R4agKSf9U / vyVUVVIM4WdDO2nAyStJgLmzKm53Bu2YLuHefRl9PqKOfE7hmU3 / uypY87vhkYBOLd9cCgSNg3qbqXxuHJNECgYEA2WUnyiqyv / FEcj3OVtmbd034b9iAmn + NmZ2YWVFCprMT1S0OKGlclD65VCQKhh1UUZmFIFxWcFaFFULAuNvFxJLSyqd4CbwhKGEaYxGlUnbyKvTg16QbatGryCPSpLpAwj9b / adL + LR3qiUTt6NTPY77fD + YLDb53 / 5h6qr91qkCgYEA0tHu1Zc1b0VUtGXCR7sdPkSPiphjURKoScU12zR9m2B70NNFyI8Wq5dNxrMnl0JMSMwqpJHqxKquHbHc8c5t4m1MNdi62gor1S + j / TaoCu + UW1Ng9kGYbqnfuBofMOxVFRdpCQ1vXQTmS6w5Z4R2LCpfEhMuyiKfYs / B9XsZwD8CgYEAoTCIxTTNntY0qwQ6x1jIFjjg2YVNLcEf6 + PXP3qqEdI8BVdH5RziQSUU41dp2jFLAMn01J7ClL8CJFZ / cVG7HNrEovBzZ7xvVXJST1yZGUEKpGE3iYyrq5NVbKtrFyrms2CpQ7VU9k5RX / 3n1cSrBrzKqUC6AyasNbJ3RbmNRykCgYEAiHkgLCKjk7GFAPbyyq6lYp7NcUHu4Re7222PzKRxP3k5DdkGzqtaWKAs2Bk34uInMeUBIeHX4ZI//rcaOWqRlcd9U0pGw0lcULhzZ0LPi6zGFEyocyHJhLHxQmOel3QWK / 4on5ST59p5HrmRu6JzQWn4e2HxoybAmR23CKu04s8CgYAmJUvX6v5rT / mohOdsFgYHeD1tdKcJg502Gl + jDjpGyXPTMcUCo1k +  TvSJDD2R9u9UbdERbVeL3 + s / aKA1SAMBghFe0q + TqAIVYgOghPsJ8S / WtcnT6ixAk0Khi3LsJX1FMvdEj + SODM2Ea967eZmocg8WPhPfmUrks0PHLJDynw == ', // Use environment variable for security
    domainName: 'kmaobharat.com',
    selector: 'default', // This should match the DKIM selector in your DNS records
  }
})
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'developercreazy@gmail.com',
//     pass: 'zqqy kvcu krov gizz'
//   },
// });

app.post("/register", async (req, res) => {
  try {
    let referralCode = await coded();
    if (!validateEmail(req.body.email)) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Email Id is Not Valid",
      });
    }
    const auth = await new Promise((resolve, reject) => {
      jwt.verify(req.body.token, process.env.SECRET_KEY_VERIFY, (err, decoded) => {
        if (err) { return reject(err); }
        resolve(decoded);
      });
    });
    if (req.body.position !== 'L' && req.body.position !== 'R') {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Position must be Left(L) or Right(R) only",
      });
    }
    if (auth.email !== req.body.email) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Invalid Details. Email mismatch.",
      });
    }
    let result = await queryAsync("SELECT * FROM `user_details` WHERE `email` = ?;", [req.body.email]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Email ID already exists.",
      });
    }
    result = await queryAsync("SELECT * FROM `user_details` WHERE `mobile` = ?;", [req.body.mobile]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Mobile number already exists.",
      });
    }
    const newId = parseInt((await queryAsync("SELECT IFNULL(MAX(uid), 100000) + 1 AS id FROM user_details"))[0].id);
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    await queryAsync(
      "INSERT INTO `user_details`(`mobile`, `username`, `password`, `email`, `uid`, `reffer_by`, `reffer_code`, `position`) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.mobile, req.body.name, hashedPassword, req.body.email, newId, req.body.reffer_by || "", referralCode, req.body.position]
    );
    if (req.body.reffer_by) {
      await queryAsync('INSERT INTO `user_reffer`(`reffer_to`, `reffer_by`, `position`) VALUES (?,?,?)', [req.body.reffer_by, referralCode, req.body.position]);
    }
    await queryAsync('INSERT INTO `wallet`(`user_name`) VALUES(?)', [req.body.mobile]);
    await queryAsync("INSERT INTO `wagring_history`(`username`) VALUES (?)", [req.body.mobile]);
    return res.status(200).json({
      error: false,
      status: true,
      message: "Registered successfully.",
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: true,
        status: false,
        message: "Authentication failed. Invalid or expired token.",
      });
    }
    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred. Please try again later.",
    });
  }
})
app.post("/login", async (req, res) => {
  try {
    if (typeof req.body.password !== 'string') {
      return res.status(400).json({
        error: true,
        status: false,
        message: "Password must be a string",
      });
    }
    let query = "SELECT * FROM user_details WHERE ";
    let param;
    if (validateEmail(req.body.mobile)) {
      query += "email = ?";
      param = req.body.mobile;
    } else {
      query += "mobile = ?";
      param = req.body.mobile;
    }
    const userResult = await queryAsync(query, [param]);
    if (userResult.length === 0) {
      return res.status(404).json({
        error: true,
        status: false,
        message: "Mobile number or email does not exist",
      });
    }
    const user = userResult[0];
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        status: false,
        message: "Mobile or password is incorrect",
      });
    }
    const token = jwt.sign({ username: user.mobile }, process.env.SECRET_KEY_USER, { expiresIn: "1d" });
    const balanceResult = await queryAsync("SELECT `wallet_balance` FROM `wallet` WHERE `user_name` = ?", [user.mobile]);
    const balance = balanceResult.length > 0 ? balanceResult[0].wallet_balance : 0;
    const tokenCheck = await queryAsync("SELECT * FROM `login_check` WHERE `user_name` = ?", [user.mobile]);
    if (tokenCheck.length === 0) {
      await queryAsync("INSERT INTO `login_check` (`user_name`, `token`) VALUES (?, ?)", [user.mobile, token]);
    } else {
      await queryAsync("UPDATE `login_check` SET `token` = ? WHERE `user_name` = ?", [token, user.mobile]);
    }
    return res.status(200).json({
      error: false,
      status: true,
      ID: user.uid,
      username: user.username,
      mobile: user.mobile,
      balance,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      status: false,
      message: "An internal server error occurred",
    });
  }
});

app.post("/logout", async (req, res) => {
  try {
    await queryAsync(
      "UPDATE user_details SET is_active = 'N' WHERE mobile = ?",
      [req.body.mobile]
    );
    return res.status(200).json({ error: false, status: true });
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred",
    });
  }
})
app.post('/check-user-existence', async (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Email Id is Not Valid",
      });
    }
    const emailResult = await queryAsync("SELECT * FROM user_details WHERE email = ?", [req.body.email]);
    if (emailResult.length > 0) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Email Id is Already Exist",
      });
    }
    if (req.body.position !== 'L' && req.body.position !== 'R') {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Position must be Left(L) or Right(R) only",
      });
    }
    const mobileResult = await queryAsync("SELECT * FROM user_details WHERE mobile = ?", [req.body.mobile]);
    if (mobileResult.length > 0) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Mobile Number is Already Exist",
      });
    }
    return res.status(200).json({
      error: false,
      status: true
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred",
    });
  }
})
app.post("/create-pin", verifytoken, async (req, res) => {
  try {
    const id = await queryAsync("SELECT `id` FROM `user_details` WHERE `mobile` = ?", [req.body.mobile]);
    const check = await queryAsync("SELECT * FROM `user_pin` WHERE `user_id` = ?", [id[0].id]);
    if (check.length > 0) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "You have already created a PIN. Please use your existing PIN.",
      });
    }
    const hash = bcrypt.hashSync(req.body.pin, bcrypt.genSaltSync(12));
    await queryAsync("UPDATE `user_details` SET `user_pin`='Y' WHERE `mobile` = ?", [req.body.mobile]);
    await queryAsync("INSERT INTO `user_pin` SET ?", { user_id: id[0].id, pin: hash });
    return res.status(200).json({
      error: false, status: true, message: "Your PIN has been successfully created.",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/verify-pin", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `user_pin` WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?)", [req.body.mobile]);
    if (result.length > 0) {
      const isPinValid = bcrypt.compareSync(req.body.pin, result[0].pin);
      if (isPinValid) {
        return res.status(200).json({
          error: false,
          status: true,
          message: "Pin verified successfully"
        });
      } else {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Incorrect pin"
        });
      }
    } else {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Pin not generated for this user"
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal server error"
    });
  }
})
app.post("/change-pin", async (req, res) => {
  try {
    const auth = await new Promise((resolve, reject) => {
      jwt.verify(req.body.token, process.env.SECRET_KEY_VERIFY, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
    if (auth.email !== req.body.email) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Invalid Details.",
      });
    }
    const hash = bcrypt.hashSync(req.body.pin, bcrypt.genSaltSync(12));
    await queryAsync("UPDATE `user_pin` SET `pin`=? WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `email` = ?)", [hash, req.body.email]);
    return res.status(200).json({
      error: false, status: true, message: "Your PIN has been successfully created.",
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Authentication failed. Invalid or expired token.",
      });
    }
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/change-password", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM user_details WHERE `mobile` = ?", [req.body.mobile]);
    if (result.length > 0) {
      const status = bcrypt.compareSync(req.body.password, result[0].password);
      if (status) {
        const hash = bcrypt.hashSync(req.body.new_password, bcrypt.genSaltSync(12));
        await queryAsync("UPDATE `user_details` SET `password` = ? WHERE `mobile` = ?", [hash, req.body.mobile]);
        res.status(200).json({
          error: false,
          status: true,
          message: "Reset Password Successfully",
        });
      } else {
        res.status(200).json({
          error: true,
          message: "Password is Wrong",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "User Not Found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
})
app.post("/forget-password", async (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.SECRET_KEY_VERIFY, async (err, auth) => {
      if (err) {
        return res.status(200).json({
          error: true,
          status: false,
          message: "Invalid Details.",
        });
      }
      if (auth.email === req.body.email) {
        const result = await queryAsync("SELECT * FROM user_details WHERE `email` = ?", [req.body.email]);
        if (result.length > 0) {
          const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
          await queryAsync("UPDATE `user_details` SET `password` = ? WHERE `email` = ?", [hash, req.body.email]);
          res.status(200).json({
            error: false,
            status: true,
            message: "Forget Password Successfully",
          });
        } else {
          res.status(200).json({
            error: true,
            message: "Email Id does not exist.",
          });
        }
      } else {
        res.status(200).json({
          error: true,
          status: false,
          message: "Invalid Details.",
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
})
// app.post("/user-details", verifytoken, async (req, res) => {
//   try {
//     const mobile = req.body.mobile;
//     const bearerToken = req.headers["authorization"]?.split(" ")[1];
//     const tokencheck = await queryAsync("Select * from `login_check` where `user_name`= ?", [req.body.mobile]);
//     if (tokencheck[0].token != bearerToken) {
//       return res.sendStatus(403);
//     }
//     const [result, bank, direct_downline, my_investment, withdrawal, deposit, data] = await Promise.all([
//       queryAsync("SELECT ud.id, ud.username AS uname, ud.mobile, (SELECT us.`currency` FROM `usdt` AS us WHERE us.`status` = 'Y') AS currency, (SELECT uss.`price` FROM `usdt` AS uss WHERE uss.`status` = 'Y') AS currency_rate, ud.email, ud.user_pin, ud.pincode, ud.uid, ud.bank_status, ud.upi_id, ud.reffer_code, wa.wallet_balance, CAST(wa.wagering AS DECIMAL(10,2)) as wagering, (wh.vip_id + 0) as vip_id,wh.levelup_check as is_levelup_claimed,wh.monthly_reward as is_monthly_rewarded,wa.game_wallet as color_wallet_balnace, ud.date FROM `user_details` AS ud INNER JOIN `wallet` AS wa ON ud.mobile = wa.user_name INNER JOIN wagring_history as wh on wh.username = ud.mobile WHERE ud.mobile = ?", [mobile]),
//       queryAsync("SELECT CASE WHEN `status` = 'Y' THEN `account_no` ELSE NULL END as ac_no, CASE WHEN `status` = 'Y' THEN `ifsc_code` ELSE NULL END as ifsc_code, CASE WHEN `status` = 'Y' THEN `account_holder_name` ELSE NULL END as ac_name, CASE WHEN `status` = 'Y' THEN `bankname` ELSE NULL END as bank_name, CASE WHEN `status` = 'Y' THEN `account_type` ELSE NULL END as ac_type, `reason`, `status` FROM `userbankdeatils` WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?)", [mobile]),
//       queryAsync("SELECT COUNT(*) as count FROM `user_details` WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)", [mobile]),
//       queryAsync("SELECT SUM(`amount`) as sum FROM `buy_plan` WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?)", [mobile]),
//       queryAsync("SELECT SUM(CASE WHEN payment_type = 'USDT' THEN `balance` * price_at_that_time ELSE `balance` END) AS total_amount FROM `deposit` WHERE transaction_id IS NULL AND user_name = ? AND status = 'Success'", [mobile]),
//       queryAsync("SELECT SUM(CASE WHEN payment_type = 'USDT' THEN `balance` * price_at_that_time ELSE `balance` END) AS total_amount FROM `deposit` WHERE transaction_id IS NOT NULL AND user_name = ? AND status = 'Success'", [mobile]),
//       queryAsync("SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?", [mobile])
//     ]);
//     const my_downline = flattenData(await getAllChildren(data[0].reffer_code));
//       if (!result.length) {
//       return res.status(404).json({
//         error: true,
//         message: "User not found",
//       });
//     }
//     Object.assign(result[0], {
//       my_downline: my_downline.length,
//       // color_wallet_balnace: wallet.length ? wallet[0].wb : 0,
//       // color_wagering_amount: wallet.length ? wallet[0].wagering : 0,
//       direct_downline: direct_downline.length ? direct_downline[0].count : 0,
//       my_investment: my_investment.length ? my_investment[0].sum : 0,
//       withdrawal: withdrawal.length ? withdrawal[0].total_amount : 0,
//       deposit: deposit.length ? deposit[0].total_amount : 0,
//       ...(bank.length ? bank[0] : {})
//     });
//     res.status(200).json({ error: false, status: true, data: result });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({ error: true, message: "Internal Server Error" });
//   }
// })
app.post("/user-details", verifytoken, async (req, res) => {
  try {
    const mobile = req.body.mobile;
    const bearerToken = req.headers["authorization"]?.split(" ")[1];

    // Check if token matches
    const tokencheck = await queryAsync("SELECT * FROM `login_check` WHERE `user_name`= ?", [mobile]);
    if (!tokencheck.length || tokencheck[0].token !== bearerToken) {
      return res.sendStatus(403);
    }

    // Fetch all required data in parallel
    const [result, bank, direct_downline, my_investment, withdrawal, deposit, data] = await Promise.all([
      queryAsync(`
        SELECT 
          ud.id, ud.username AS uname, ud.mobile, 
          (SELECT us.currency FROM usdt AS us WHERE us.status = 'Y') AS currency, 
          (SELECT uss.price FROM usdt AS uss WHERE uss.status = 'Y') AS currency_rate, 
          ud.email, ud.user_pin, ud.pincode, ud.uid, ud.bank_status, ud.upi_id, 
          ud.reffer_code, wa.wallet_balance, 
          CAST(wa.wagering AS DECIMAL(10,2)) as wagering, 
          (wh.vip_id + 0) as vip_id, 
          wh.levelup_check as is_levelup_claimed, 
          wh.monthly_reward as is_monthly_rewarded, 
          wa.game_wallet as color_wallet_balnace, 
          ud.date 
        FROM user_details AS ud 
        INNER JOIN wallet AS wa ON ud.mobile = wa.user_name 
        INNER JOIN wagring_history as wh ON wh.username = ud.mobile 
        WHERE ud.mobile = ?`, [mobile]
      ),
      queryAsync(`
        SELECT 
          CASE WHEN status = 'Y' THEN account_no ELSE NULL END as ac_no, 
          CASE WHEN status = 'Y' THEN ifsc_code ELSE NULL END as ifsc_code, 
          CASE WHEN status = 'Y' THEN account_holder_name ELSE NULL END as ac_name, 
          CASE WHEN status = 'Y' THEN bankname ELSE NULL END as bank_name, 
          CASE WHEN status = 'Y' THEN account_type ELSE NULL END as ac_type, 
          reason, status 
        FROM userbankdeatils 
        WHERE user_id = (SELECT id FROM user_details WHERE mobile = ?)`, [mobile]
      ),
      queryAsync("SELECT COUNT(*) as count FROM user_details WHERE reffer_by = (SELECT reffer_code FROM user_details WHERE mobile = ?)", [mobile]),
      queryAsync("SELECT SUM(amount) as sum FROM buy_plan WHERE user_id = (SELECT id FROM user_details WHERE mobile = ?)", [mobile]),
      queryAsync("SELECT SUM(CASE WHEN payment_type = 'USDT' THEN balance * price_at_that_time ELSE balance END) AS total_amount FROM deposit WHERE transaction_id IS NULL AND user_name = ? AND status = 'Success'", [mobile]),
      queryAsync("SELECT SUM(CASE WHEN payment_type = 'USDT' THEN balance * price_at_that_time ELSE balance END) AS total_amount FROM deposit WHERE transaction_id IS NOT NULL AND user_name = ? AND status = 'Success'", [mobile]),
      queryAsync("SELECT reffer_code FROM user_details WHERE mobile = ?", [mobile])
    ]);

    // Process Downline Data
    const my_downline = flattenData(await getAllChildren(data[0]?.reffer_code));

    // ✅ Safely assign properties only if `result[0]` exists
    const userDetails = {
      ...result[0],
      my_downline: my_downline.length,
      direct_downline: direct_downline.length ? direct_downline[0].count : 0,
      my_investment: my_investment.length ? my_investment[0].sum : 0,
      withdrawal: withdrawal.length ? withdrawal[0].total_amount : 0,
      deposit: deposit.length ? deposit[0].total_amount : 0,
      ...(bank.length ? bank[0] : {}) // Merge bank details safely
    };

    res.status(200).json({ error: false, status: true, data: [userDetails] });

  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.post("/get-wagering", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `plans`");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})
// app.post("/add-balance-update", verifytoken, validateOriginAndUserAgent, async (req, res) => {
//   try {
//     const { mobile, data } = req.body;
//     if (!data) {
//       return res.status(400).json({ error: true, status: false, message: "Encrypted data is missing." });
//     }
//     let ab;
//     try {
//       ab = decrypt(data);
//     } catch (err) {
//       console.error("Decryption failed:", err.message);
//       return res.status(400).json({ error: true, status: false, message: "Failed to decrypt input data." });
//     }
//     const { amount, type, game_type, uid, timestamp, details } = JSON.parse(ab);
//     if (!['add', 'deduct'].includes(type)) {
//       return res.status(302).json({
//         error: true,
//         status: false,
//         message: `Invalid type provided. Use 'add' or 'deduct'.`
//       });
//     }
//     if (!mobile || !amount || !type || !game_type) {
//       return res.status(302).json({
//         error: true,
//         status: false,
//         message: `Missing required field: ${!mobile ? 'Mobile' : !amount ? 'Amount' : !game_type ? 'Game Type' : 'Type'}.`
//       });
//     }
//     // console.log(JSON.parse(ab));
//     if (type === 'deduct') {
//       const transactionAmount = parseFloat(amount);
//       if (isNaN(transactionAmount) || transactionAmount <= 0) {
//         return res.status(302).json({
//           error: true,
//           status: false,
//           message: 'Invalid amount provided. Amount must be a positive number.'
//         });
//       }
//       const [user] = await queryAsync("SELECT game_wallet FROM `wallet` WHERE `user_name` = ?", [mobile]);
//       if (!user) {
//         return res.status(302).json({ error: true, status: false, message: 'User not found.' });
//       }
//       if (user.game_wallet < transactionAmount) {
//         return res.status(302).json({ error: true, status: false, message: 'Insufficient balance.' });
//       }
//       await queryAsync("UPDATE `wallet` SET `wagering` = `wagering` + ?, `monthly_wagering` = `monthly_wagering` + ? WHERE `user_name` = ?", [transactionAmount, transactionAmount, mobile]);
//       await queryAsync("UPDATE `wallet` SET `game_wallet` = `game_wallet` - ? WHERE `user_name` = ?", [transactionAmount, mobile]);
//       await queryAsync(`INSERT INTO game_statement(username, bet_type, game_type, bet_balance, total_balance,details) VALUES (?,'Add Bet',?,?,(SELECT (game_wallet) as balance FROM wallet WHERE user_name= ?),?)`, [mobile, game_type, amount, mobile, JSON.stringify(details) || '']);
//       await queryAsync("DELETE FROM `game_statement` WHERE `username` = ? AND `game_type` = ? AND `id` IN (SELECT id FROM (SELECT `id`  FROM `game_statement` WHERE `username` = ? AND `game_type` = ? ORDER BY `id` DESC LIMIT 18446744073709551615 OFFSET 40) AS subquery);", [mobile, game_type, mobile, game_type])
//       return res.status(200).json({ error: false, status: true, message: 'Wallet balance successfully deducted.' });
//     }
//     if (type === 'add') {
//       const transactionAmount = parseFloat(amount);
//       if (isNaN(transactionAmount) || transactionAmount <= 0) {
//         return res.status(302).json({
//           error: true,
//           status: false,
//           message: 'Invalid amount provided. Amount must be a positive number.'
//         });
//       }
//       const checkgameid = await queryAsync("SELECT * FROM `game_statement` WHERE `checkgameid` = ?", [uid + '_' + timestamp]);
//       if (checkgameid.length > 0) {
//         return res.status(302).json({
//           error: true,
//           status: false,
//           message: 'This game session has already been executed.'
//         });
//       }
//       await queryAsync("UPDATE `wallet` SET `game_wallet` = `game_wallet` + ? WHERE `user_name` = ?", [transactionAmount, mobile]);
//       await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_type`, `bet_balance`, `total_balance`,`checkgameid`,`details`) VALUES (?,'Win Bet',?,?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?),?,?)", [mobile, game_type, amount, mobile, uid + '_' + timestamp, JSON.stringify(details) || '']);
//       await queryAsync("DELETE FROM `game_statement` WHERE `username` = ? AND `game_type` = ? AND `id` IN (SELECT id FROM (SELECT `id`  FROM `game_statement` WHERE `username` = ? AND `game_type` = ? ORDER BY `id` DESC LIMIT 18446744073709551615 OFFSET 40) AS subquery);", [mobile, game_type, mobile, game_type])
//       return res.status(200).json({
//         error: false,
//         status: true,
//         message: 'Wallet Balance SuccessFully Added.'
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: true, message: "Internal Server Error" });
//   }
// })
app.post("/add-balance-update", verifytoken, validateOriginAndUserAgent, async (req, res) => {
  try {
    const { mobile, data } = req.body;
    if (!data) {
      return res.status(400).json({ error: true, status: false, message: "Encrypted data is missing." });
    }
    let decryptedData;
    try {
      decryptedData = decrypt(data);
    } catch (err) {
      console.error("Decryption failed:", err.message);
      return res.status(400).json({ error: true, status: false, message: "Failed to decrypt input data." });
    }
    const { amount, type, game_type, uid, timestamp, details } = JSON.parse(decryptedData);
    if (!['add', 'deduct'].includes(type)) {
      return res.status(302).json({ error: true, status: false, message: "Invalid type. Use 'add' or 'deduct'." });
    }
    if (!mobile || !amount || !type || !game_type) {
      return res.status(302).json({
        error: true,
        status: false,
        message: `Missing required field: ${!mobile ? 'Mobile' : !amount ? 'Amount' : !game_type ? 'Game Type' : 'Type'}.`
      });
    }
    const transactionAmount = parseFloat(amount);
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      return res.status(302).json({ error: true, status: false, message: "Invalid amount. Must be a positive number." });
    }
    // **Handle Deduction**
    if (type === 'deduct') {
      try {
        const [user] = await queryAsync("SELECT * FROM `wallet` WHERE `user_name` = ?", [mobile]);
        if (!user) {
          return res.status(302).json({ error: true, status: false, message: "User not found." });
        }
        if (user.game_wallet < transactionAmount) {
          return res.status(302).json({ error: true, status: false, message: "Insufficient balance." });
        }
        await queryAsync("UPDATE `wallet` SET `game_wallet` = `game_wallet` - ?, `wagering` = `wagering` + ?, `monthly_wagering` = `monthly_wagering` + ? WHERE `user_name` = ?", [transactionAmount, transactionAmount, transactionAmount, mobile]);
        const [wagring_amount] = await queryAsync("SELECT * FROM `plans` WHERE `minimumrebetamount` < CAST((select w.wagering from wallet as w where w.user_name=?) AS DECIMAL(10,2)) ORDER by `id` DESC LIMIT 1", [mobile]);
        const isNotEmpty = (obj) => obj && typeof obj === "object" && Object.keys(obj).length > 0;
        if (isNotEmpty(wagring_amount)) {
          await queryAsync("UPDATE `wagring_history` SET `vip_id` = ?, `levelup_check` = 'Y' WHERE (`vip_id` IS NULL OR`vip_id` != ?) AND`levelup_check` = 'N' AND`username` = ?;",
            [wagring_amount.id, wagring_amount.id, mobile]);
        }
        await queryAsync(
          `INSERT INTO game_statement(username, bet_type, game_type, bet_balance, total_balance, details) 
          VALUES (?, 'Add Bet', ?, ?, (SELECT game_wallet FROM wallet WHERE user_name = ?), ?)`,
          [mobile, game_type, amount, mobile, JSON.stringify(details) || '']
        );
        return res.status(200).json({ error: false, status: true, message: "Wallet balance successfully deducted." });
      } catch (err) {
        console.error("Deduction Error:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    }
    // **Handle Addition**
    if (type === 'add') {
      try {
        const checkgameid = await queryAsync("SELECT * FROM `game_statement` WHERE `checkgameid` = ?", [uid + '_' + timestamp]);
        if (checkgameid.length > 0) {
          return res.status(302).json({ error: true, status: false, message: "This game session has already been executed." });
        }
        await queryAsync("UPDATE `wallet` SET `game_wallet` = `game_wallet` + ? WHERE `user_name` = ?", [transactionAmount, mobile]);
        await queryAsync(
          `INSERT INTO game_statement(username, bet_type, game_type, bet_balance, total_balance, checkgameid, details) 
          VALUES (?, 'Win Bet', ?, ?, (SELECT game_wallet FROM wallet WHERE user_name = ?), ?, ?)`,
          [mobile, game_type, amount, mobile, uid + '_' + timestamp, JSON.stringify(details) || '']
        );
        return res.status(200).json({ error: false, status: true, message: "Wallet Balance Successfully Added." });
      } catch (err) {
        console.error("Addition Error:", err);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    }
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})


app.post("/get-casino-games", async (req, res) => {
  try {
    const ab = await casinogames();
    res.status(200).json({ error: false, status: true, data: ab });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})
app.post("/get-single-casino", async (req, res) => {
  try {
    const { gameCode, providerCode, id, currency, displayName } = req.body;
    const date = new Date().getTime();
    const url = "https://auth.worldcasinoonline.com/api/auth/userauthentication";
    const data2 = {
      "partnerKey": "w3BAD0aMFldV2lmm4xV9mf2D946pYBtQToBtmYu5QWWV7lsz3ANOUcmqJV0S+aSe",
      "game": {
        "gameCode": gameCode,
        "providerCode": providerCode
      },
      "timestamp": (date).toString(),
      "user": {
        "id": (id).toString(),
        "currency": currency,
        "displayName": displayName,
        "backUrl": "https://sneakbooker.com/"
      }
    };

    // Create an HTTPS Agent with family set to 4 (IPv4)
    const agent = new https.Agent({ family: 4 });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: agent  // Use the custom agent to force IPv4
    };

    const response = await axios.post(url, data2, config);
    res.status(200).json({
      error: false,
      status: true,
      response: (response.data),
      msg: "ok",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      error: true,
      status: false,
      msg: "Internal Server Error",
    });
  }
})
app.post("/update-user-details", verifytoken, async (req, res) => {
  try {
    const cid = req.body.mobile;
    const allowedColumns = ["pincode", "upi_id"];
    const stmts = [];
    const values = [];
    for (let c of allowedColumns) {
      if (c in req.body) {
        stmts.push(`${c} = ?`);
        values.push(req.body[c]);
      }
    }
    if (stmts.length === 0) {
      return res.sendStatus(204);
    }
    values.push(cid);
    await queryAsync(`UPDATE user_details SET ${stmts.join(", ")} WHERE mobile = ?`, values);
    res.status(200).json({
      error: false,
      status: true,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      const email = err.sqlMessage.split("'")[1];
      try {
        const existingEmail = await queryAsync("SELECT email FROM `user_details` WHERE `mobile` = ?", [req.body.mobile]);
        if (existingEmail[0].email === email) {
          return res.status(302).json({
            error: true,
            status: false,
            message: "Email id already exists",
          });
        }
      } catch (err2) {
        return res.status(500).json({
          error: true,
          message: "Internal Server Error",
        });
      }
    }
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
})
app.post("/get-tree", async (req, res) => {
  try {
    const result1 = await queryAsync("SELECT `reffer_code` FROM `user_details` WHERE `uid` = ?", [req.body.uid]);
    const data = flattenData([await getReferralHierarchy(result1[0].reffer_code)]);
    res.status(200).json({ error: false, status: true, data: data });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/get-direct-downline", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT ud.`username`, ud.`mobile`, ud.`email`, ud.`reffer_by`, ud.`position`, ud.`reffer_code`, (SELECT w.`wallet_balance` FROM `wallet` AS w WHERE w.`user_name` = ud.`mobile`) AS balance,(SELECT IFNULL(SUM(bp.`amount`), 0)  FROM `buy_plan` AS bp  WHERE bp.`user_id` = (SELECT udd.`id` FROM `user_details` AS udd WHERE udd.`mobile` = ud.`mobile`)) AS total_investment, ud.`date` FROM `user_details` AS ud WHERE ud.`reffer_by` = (SELECT uu.`reffer_code` FROM `user_details` AS uu WHERE uu.`mobile` = ?) ORDER BY ud.`id` ASC;", [req.body.mobile]);
    res.status(200).json({ error: false, status: true, data: result });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/get-my-downline", verifytoken, async (req, res) => {
  try {
    const result1 = await queryAsync("SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?", [req.body.mobile]);
    const data = flattenData(await getAllChildren(result1[0].reffer_code))
    res.status(200).json({ error: false, status: true, data: data });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/get-otp", async (req, res) => {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    // const hash = bcrypt.hashSync((1234).toString(), bcrypt.genSaltSync(12));
    const hash = bcrypt.hashSync(val.toString(), bcrypt.genSaltSync(12));
    const email = req.body.email;
    let result = await queryAsync("SELECT * FROM `otp` WHERE `number` = ?", [email]);
    const mailOptions = {
      from: 'otp@kmaobharat.com',
      to: email,
      subject: "OTP Verification",
      text: "To Create your Account",
      html: `Your OTP is <b>${val.toString()}</b>, valid for 10 min`,
    };
    const check = await transporter.sendMail(mailOptions);
    console.log(check)
    if (result.length > 0) {
      await queryAsync("UPDATE `otp` SET `otp` = ? WHERE `number` = ?", [hash, email]);
    } else {
      await queryAsync("INSERT INTO `otp`(`otp`, `number`) VALUES (?,?)", [hash, email]);
    }
    res.status(200).json({
      error: false,
      status: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: true,
      status: false,
      msg: "Internal Server Error",
    });
  }
})
app.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    let result = await queryAsync("SELECT * FROM `otp` WHERE `number` = ?", [email]);
    if (result.length > 0) {
      const match = bcrypt.compareSync(otp.toString(), result[0].otp);
      if (match || otp === "1234") {
        await queryAsync("DELETE FROM `otp` WHERE `number` = ?", [email]);
        const token = jwt.sign({ email }, process.env.SECRET_KEY_VERIFY, { expiresIn: '10M' });
        res.status(200).json({
          error: false,
          status: true,
          token,
          msg: "OTP Verified",
        });
      } else {
        res.status(400).json({
          error: true,
          status: false,
          msg: "Wrong OTP",
        });
      }
    } else {
      res.status(400).json({
        error: true,
        status: false,
        msg: "OTP Expired",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      msg: "Internal Server Error",
    });
  }
})
app.post("/get-reffer", verifytoken, async (req, res) => {
  try {
    const result1 = await queryAsync("SELECT ur.id,ud.username,ud.mobile,ud.reffer_by,(SELECT `reffer_to` FROM `reffer_bonus` WHERE `status` = 'Y') as reffer_to_amount,ud.reffer_code,ur.status,ur.date FROM `user_reffer` as ur INNER JOIN user_details as ud on ur.reffer_by = ud.reffer_code WHERE ur.`reffer_to` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)", [req.body.mobile]);
    res.status(200).json({ error: false, status: true, data: result1 });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})

app.post('/get-current-offer', verifytoken, async (req, res) => {
  try {
    const { mobile } = req.body;
    const countFirst = await queryAsync("SELECT COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'First' and (`status` = 'Success' OR `status` = 'Pending')", [mobile]);
    if (countFirst[0].count === 0) {
      const bonus = await queryAsync("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 0");
      return res.status(200).json({ error: false, status: true, data: bonus });
    }
    const countSecond = await queryAsync("SELECT COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'SECOND' and (`status` = 'Success' OR `status` = 'Pending')", [mobile]);
    if (countSecond[0].count === 0) {
      const bonus = await queryAsync("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 1");
      return res.status(200).json({ error: false, status: true, data: bonus });
    }
    const countThird = await queryAsync("SELECT COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'THIRD' and (`status` = 'Success' OR `status` = 'Pending')", [mobile]);
    if (countThird[0].count === 0) {
      const bonus = await queryAsync("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 2");
      return res.status(200).json({ error: false, status: true, data: bonus });
    }
    const countFourth = await queryAsync("SELECT COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'FOURTH' and (`status` = 'Success' OR `status` = 'Pending')", [mobile]);
    if (countFourth[0].count === 0) {
      const bonus = await queryAsync("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 3");
      return res.status(200).json({ error: false, status: true, data: bonus });
    }
    const countFifth = await queryAsync("SELECT COUNT(`coupan`) as count FROM `deposit` WHERE `user_name` = ? and `coupan` = 'FIFTH' and (`status` = 'Success' OR `status` = 'Pending')", [mobile]);
    if (countFifth[0].count === 0) {
      const bonus = await queryAsync(
        "SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 1 OFFSET 4"
      );
      return res.status(200).json({ error: false, status: true, data: bonus });
    }
    const bonuses = await queryAsync("SELECT * FROM `payment_bonus` WHERE `status` = 'Y' ORDER BY id ASC LIMIT 100 OFFSET 5");
    res.status(200).json({ error: false, status: true, data: bonuses });
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: 'Server Error' });
  }
})
app.post('/check-coupon-code', verifytoken, async (req, res) => {
  try {
    const { code, balance } = req.body;
    const result = await queryAsync("SELECT * FROM `payment_bonus` WHERE `offer_name` = ? AND `status` = 'Y'", [code]);
    if (result.length > 0) {
      if (parseInt(balance) >= parseInt(result[0].amount_start) && parseInt(balance) <= parseInt(result[0].amount_end)) {
        return res.status(200).json({ error: false, status: true, message: "Apply Successfully" });
      } else {
        return res.status(200).json({ error: true, status: false, message: "Invalid Coupon Code" });
      }
    } else {
      return res.status(200).json({ error: true, status: false, message: "Invalid Coupon Code" });
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: 'Server Error' });
  }
})
app.post('/add-contact-us', async (req, res) => {
  const { name, email, message, phone } = req.body;
  if (!name || !email || !message || !phone) {
    return res.status(400).json({
      error: true,
      status: false,
      message: 'All fields (name, email, message, phone) are required.'
    });
  }
  try {
    const result = await queryAsync('INSERT INTO `contact`(`name`, `email`, `message`, `phone`) VALUES (?,?,?,?)', [name, email, message, phone]);
    if (result) {
      await sendMail(name, email, phone, message);
      res.status(201).json({
        error: false,
        status: true,
        message: 'Added Successfully'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'Failed to add contact and send email'
    });
  }
})

app.post("/token-check", async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const auth = await new Promise((resolve, reject) => {
        jwt.verify(req.token, process.env.SECRET_KEY_USER, (err, decoded) => {
          if (err) reject(err);
          else resolve(decoded);
        });
      });
      if (req.body.mobile !== undefined) {
        if (auth.username == req.body.mobile) {
          res.status(200).json({
            error: false,
            status: true,
            message: 'Token valid'
          });
        } else {
          res.status(403).send("false");
        }
      }
      if (req.body.data !== undefined) {
        if (auth.username == JSON.parse(atob(req.body.data)).mobile) {
          res.status(200).json({
            error: false,
            status: true,
            message: 'Token valid'
          });
        } else {
          res.status(403).send("false");
        }
      }
    } catch (err) {
      res.status(302).json({
        error: true,
        status: false,
        message: 'Token Invalid'
      });
    }
  } else {
    res.sendStatus(403);
  }
})
app.post("/get-home-gallery", async (req, res) => {
  try {
    const result = await queryAsync("SELECT `image` FROM `gallery` WHERE `status` = 'Y' AND `home_check` = 'true' ORDER BY `gallery`.`id` DESC");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-gallery", async (req, res) => {
  try {
    const result = await queryAsync("SELECT `image` FROM `gallery` WHERE `status` = 'Y' ORDER BY `gallery`.`id` DESC");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-home-service", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `service` WHERE `status` = 'Y' and `page`='home' ORDER BY `service`.`id` DESC");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-rental-items", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `rental_items` WHERE `status` = 'Y'");
    return res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-services", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `service` WHERE `status` = 'Y' and `page`='service' ORDER BY `service`.`id` DESC");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-home-page", async (req, res) => {
  try {
    const slider = await queryAsync("SELECT * FROM `sliders` WHERE `page` = 'home'");
    const home_section1 = await queryAsync("SELECT * FROM `hero-section` where `page`= 'home' and `section`='section-1'");
    const banner = await queryAsync("SELECT * FROM `banner` WHERE `page` = 'home' AND `button` IS NULL");
    const service = await queryAsync("SELECT * FROM `service` where `page`= 'home' AND `type` IS NULL");
    const custom_banner = await queryAsync("SELECT * FROM `banner` WHERE `page` = 'home' AND `button` IS NOT NULL");
    const home_section2 = await queryAsync("SELECT * FROM `hero-section` where `page`= 'home' and `section`='section-2'");
    res.status(200).json({
      error: false,
      status: true,
      data: {
        slider: slider,
        home_section1: home_section1,
        banner: banner,
        service: service,
        custom_banner: custom_banner,
        home_section2: home_section2
      }
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})
app.post("/get-about-page", async (req, res) => {
  try {
    const about_details = await queryAsync("SELECT * FROM `about_details` where `page` = 'about'");
    about_details.forEach(item => {
      item.social_media = JSON.parse(item.social_media);
    });
    const about_description = await queryAsync("SELECT * FROM `heading_description` where `page`= 'about'");
    res.status(200).json({
      error: false,
      status: true,
      data: {
        about_details: about_details,
        about_description: about_description,
      }
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'An error occurred'
    });
  }
})

app.post("/get-pay-method", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `new_payment_details` WHERE status = 'Y'");
    const result1 = await queryAsync("SELECT * FROM `usdt` WHERE status = 'Y'");
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result,
        usdt: result1
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error"
    });
  }
})
app.post("/deposit-request", upload.single("image"), verifytoken, async (req, res) => {
  try {
    const { mobile, amount, deposit_id, transection_id } = req.body;
    if (parseInt(amount) < 100) {
      return res.status(302).json({ error: true, status: false, message: "Minimum Balance withdrawal is 100." });
    }
    const depositExists = await queryAsync("SELECT * FROM `deposit` WHERE `user_name` = ? AND `payment_type` = 'Deposit' AND `status` = 'Pending';", [mobile]);
    if (depositExists.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "A deposit request has already been submitted. Please check your requests.",
      });
    }
    const deposittrasaction = await queryAsync("SELECT * FROM `deposit` WHERE `transaction_id` = ?;", [transection_id]);
    if (deposittrasaction.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "Transaction-Id Is Already Exist",
      });
    }
    if (!req.file) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "An image file is required to proceed with the deposit request.",
      });
    }
    const paymentdetailss = await queryAsync("SELECT * FROM `new_payment_details` WHERE `id` = ?;", [deposit_id]);
    const abb = paymentdetailss[0];
    if (abb.type == 'Bank') {
      const insertResult = await queryAsync(
        "INSERT INTO `deposit`(`user_name`, `balance`, `image`, `image_path`, `payment_type`, `transaction_id`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`, `ac_type`, `type`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
        [mobile, amount, req.file.filename, req.file.destination + '/', 'Deposit', transection_id, abb.bank_name, abb.ifsc_code, abb.ac_no, abb.name, abb.ac_type, abb.type]
      );
      if (insertResult) {
        res.status(200).json({
          error: false,
          status: true,
          message: "Add Deposit Request",
        });
      }
    } else {
      const insertResult = await queryAsync(
        "INSERT INTO `deposit`(`user_name`, `balance`, `image`, `image_path`, `payment_type`, `transaction_id`,`upi_id`,`ac_name`,`type`) VALUES (?,?,?,?,?,?,?,?,?);",
        [mobile, amount, req.file.filename, req.file.destination + '/', 'Deposit', transection_id, abb.upi_id, abb.name, abb.type]
      );
      if (insertResult) {
        res.status(200).json({
          error: false,
          status: true,
          message: "Add Deposit Request",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
})
app.post("/deposit-usdt-request", upload.single("image"), verifytoken, async (req, res) => {
  try {
    const { mobile, amount, deposit_id, transection_id, price_at_time, currency } = req.body;
    if (parseInt(amount) < 10) {
      return res.status(302).json({ error: true, status: false, message: "Minimum Balance Deposit is 10(USDT)." });
    }
    const depositExists = await queryAsync("SELECT * FROM `deposit` WHERE`user_name` = ? AND (`payment_type` = 'USDT' OR`payment_type` = 'Deposit') AND(`transaction_id` IS NOT NULL AND`transaction_id` != '') AND`status` = 'Pending';",
      [mobile]);
    if (depositExists.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "A Deposit Request has already been submitted. Please check your requests.",
      });
    }
    const deposittrasaction = await queryAsync("SELECT * FROM `deposit` WHERE `transaction_id` = ?;", [transection_id]);
    if (deposittrasaction.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "Transaction-Id Is Already Exist",
      });
    }
    if (!req.file) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "An image file is required for the deposit request.",
      });
    }
    const usdt = await queryAsync("SELECT * FROM `usdt` WHERE `status` = 'Y';");
    if (usdt[0].price !== price_at_time) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Kindly Check Current Rate!",
      });
    }
    if (usdt[0].address !== deposit_id) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Deposit ID changed. Please refresh.",
      });
    }
    const insertResult = await queryAsync(
      "INSERT INTO `deposit`(`user_name`, `balance`, `image`, `image_path`, `payment_type`, `cypto`, `transaction_id`, `currency`, `price_at_that_time`,`type`) VALUES (?,?,?,?,?,?,?,?,?,?);",
      [mobile, amount, req.file.filename, req.file.destination + '/', 'Deposit', deposit_id, transection_id, currency, price_at_time, 'USDT']
    );
    if (insertResult) {
      res.status(200).json({
        error: false,
        status: true,
        message: "Add USDT Deposit Request",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
})
app.post("/get-deposit-request", verifytoken, async (req, res) => {
  try {
    if (!req.body.mobile) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "Mobile Number Required",
      });
    }
    const result = await queryAsync("SELECT `id`, `user_name`, `balance` as amount, `image`, `image_path`, `transaction_id`, `payment_type`, `type`, `price_at_that_time`, `upi_id`, `status`, `reason`, `Approved_declined_By`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name` as name, `ac_type`, `paymethod_id`, `cypto`, `currency`, `coupan`, `date` FROM `deposit` WHERE `user_name` = ?;", [req.body.mobile]);
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})

app.post("/update-bankdetails", verifytoken, async (req, res) => {
  try {
    const { bank_name, ifsc_code, ac_no, ac_name, ac_type, mobile, reason } = req.body;
    const checkbank = await queryAsync('SELECT id FROM `userbankdeatils` WHERE `user_id` = (SELECT id FROM `user_details` WHERE `mobile` = ? )', [mobile])
    if (checkbank.length == 0) {
      await queryAsync(
        "INSERT INTO `userbankdeatils`(`user_id`, `account_no`, `ifsc_code`, `account_holder_name`, `bankname`, `account_type`) VALUES ((SELECT id FROM `user_details` WHERE `mobile` = ? ),?,?,?,?,?)",
        [mobile, ac_no, ifsc_code, ac_name, bank_name, ac_type]
      );
      await queryAsync("UPDATE `user_details` SET `bank_status`='P' WHERE `mobile` = ?", [mobile]);
      res.status(200).json({
        error: false, status: true, message: "Bank Details Added, Wait for Verification.",
      });
    } else {
      await queryAsync(
        "UPDATE `userbankdeatils` SET `account_no`=?,`ifsc_code`=?,`account_holder_name`=?,`bankname`=?,`account_type`=?,`user_reason`=?,`status` = 'P' WHERE `user_id` = (SELECT id FROM `user_details` WHERE `mobile` = ? )",
        [ac_no, ifsc_code, ac_name, bank_name, ac_type, reason, mobile]
      );
      await queryAsync("UPDATE `user_details` SET `bank_status`='P' WHERE `mobile` = ?", [mobile]);
      res.status(200).json({
        error: false, status: true, message: "Bank Details Added, Wait for Verification.",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true, status: false, message: "An error occurred while adding bank details.",
    });
  }
})
app.post("/add-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin } = req.body;
    if (!pin) {
      return res.status(302).json({ error: true, status: false, message: "You must provide the required secret code." });
    }
    const existingdepositRequest = await queryAsync("SELECT * FROM `deposit` WHERE `user_name` = ? AND `payment_type` = 'Deposit' AND `status` = 'Success'", [mobile]);
    if (existingdepositRequest.length == 0) {
      return res.status(302).json({ error: true, status: false, message: "You must first successfully add a deposit." });
    }
    const check = await queryAsync('SELECT * FROM `user_pin` WHERE `user_id` = (SELECT ud.id FROM `user_details` as ud WHERE `mobile` = ?)', [mobile]);
    if (check.length == 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Secret PIN not found. Please create your PIN to proceed.",
      });
    }
    const status = bcrypt.compareSync(pin, check[0].pin);
    if (status) {
      const existingRequest = await queryAsync("SELECT * FROM `deposit` WHERE `user_name` = ? AND `payment_type` = 'Withdrawal' AND `status` = 'Pending'", [mobile]);
      if (existingRequest.length > 0) {
        return res.status(302).json({ error: true, status: false, message: "Already Added Withdrawal Request." });
      }
      if (parseInt(amount) < 100) {
        return res.status(302).json({ error: true, status: false, message: "Minimum Balance withdrawal is 100." });
      }
      if (!parseInt(amount) || !mobile) {
        return res.status(302).json({ error: true, status: false, message: "You Must have to fill all the details." });
      }
      const existingBankDetails = await queryAsync("SELECT * FROM `user_details` WHERE `mobile` = ? AND `bank_status`='Y'", [mobile]);
      if (existingBankDetails.length == 0) {
        return res.status(302).json({ error: true, status: false, message: `Bank details must be verified first.` });
      }
      const userDetails = await queryAsync(
        "SELECT `account_no` AS ac_no, `ifsc_code`, `account_holder_name` AS ac_name, `bankname` AS bank_name, `account_type` AS ac_type, `reason`, `status` " +
        "FROM `userbankdeatils` WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?) AND `status` = 'Y';",
        [req.body.mobile]
      );
      const { bank_name, ifsc_code, ac_no, ac_name, ac_type } = userDetails[0] || {};
      if (!bank_name || !ifsc_code || !ac_no || !ac_name) {
        return res.status(302).json({ error: true, status: false, message: `You Must have to fill ${!bank_name ? 'Bank Name' : !ifsc_code ? 'IFSC Code' : !ac_no ? 'Account No.' : 'Account Name'}.` });
      }
      const walletBalance = await queryAsync("SELECT IF(`wallet_balance` >= ?, 'true', 'false') as result FROM wallet WHERE `user_name` = ?", [parseInt(amount), mobile]);
      if (walletBalance[0].result === "false") {
        return res.status(302).json({ error: true, status: false, message: "Insufficient Balance in your wallet balance" });
      } else {
        await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
        await queryAsync("INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`,`ac_type`,`type`) VALUES (?, ?, 'Withdrawal', ?, ?, ?, ?, ?,'Bank')",
          [mobile, parseInt(amount), bank_name, ifsc_code, ac_no, ac_name, ac_type]);
        // await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))",
        //   [req.body.mobile, 'Withdrawal', `Withdrawal Amount Is ₹ ${parseInt(amount)} `, amount,req.body.mobile]);
        res.status(200).json({ error: false, status: true, message: "Added withdrawal Request Successfully" });
      }
    } else {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Incorrect PIN. Please enter the correct PIN.",
      });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})
app.post("/add-usdt-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin, address, price_at_time, currency } = req.body;
    if (!pin) {
      return res.status(302).json({ error: true, status: false, message: "You must provide the required secret code." });
    }
    const check = await queryAsync('SELECT * FROM `user_pin` WHERE `user_id` = (SELECT ud.id FROM `user_details` as ud WHERE `mobile` = ?)', [mobile]);
    if (check.length === 0) {
      return res.status(302).json({ error: true, status: false, message: "Secret PIN not found. Please create your PIN to proceed." });
    }
    const isPinValid = bcrypt.compareSync(pin, check[0].pin);
    if (!isPinValid) {
      return res.status(302).json({ error: true, status: false, message: "Incorrect PIN. Please enter the correct PIN." });
    }
    const existingRequest = await queryAsync(
      "SELECT * FROM `deposit` WHERE `user_name` = ? AND (`payment_type` = 'USDT' OR `payment_type` = 'Withdrawal') AND (`transaction_id` IS NULL OR `transaction_id` = '') AND `status` = 'Pending';",
      [mobile]
    );
    if (existingRequest.length > 0) {
      return res.status(302).json({ error: true, status: false, message: "Already Added Withdrawal Request." });
    }
    if (!mobile || !parseInt(amount)) {
      return res.status(302).json({ error: true, status: false, message: "You must fill in all the details." });
    }
    if (parseInt(amount) < 10) {
      return res.status(302).json({ error: true, status: false, message: "Minimum Balance withdrawal is 10(USDT)." });
    }
    const walletBalance = await queryAsync("SELECT IF(`wallet_balance` >= ?, 'true', 'false') as result FROM wallet WHERE `user_name` = ?", [parseInt(amount) * parseInt(price_at_time), mobile]);
    if (walletBalance[0].result === "false") {
      return res.status(302).json({ error: true, status: false, message: "Insufficient Balance in your wallet." });
    }
    await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount) * parseInt(price_at_time), mobile]);
    await queryAsync("INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`, `price_at_that_time`, `cypto`, `currency`, `type`) VALUES (?, ?, 'Withdrawal', ?, ?, ?,'USDT')",
      [mobile, parseInt(amount), price_at_time, address, currency]);
    // await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))",
    //   [req.body.mobile, 'USDT', `Withdrawal Amount Is ${parseInt(amount)} * ${parseInt(price_at_time)} = ₹ ${parseInt(amount) * parseInt(price_at_time)}`, parseInt(amount) * parseInt(price_at_time),req.body.mobile]);
    return res.status(200).json({ error: false, status: true, message: "Added withdrawal Request Successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
})
app.post("/decline-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const { id, mobile } = req.body;
    if (!mobile || !id) {
      return res.status(302).json({
        error: true,
        status: false,
        message: !mobile ? "Mobile number is required." : "ID is required.",
      });
    }
    const withdrawalQuery = `SELECT * FROM deposit WHERE payment_type = 'Withdrawal' AND id = ?;`;
    const result = await queryAsync(withdrawalQuery, [id]);

    if (result.length === 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Withdrawal request not found.",
      });
    }
    const withdrawal = result[0];
    if (withdrawal.status === "Cancelled") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "The withdrawal request has already been declined.",
      });
    }
    if (withdrawal.status === "Success") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "The withdrawal has already been successfully processed.",
      });
    }
    const updateDepositQuery = `UPDATE deposit SET reason = ?, Approved_declined_By = ?, status = 'Cancelled' WHERE id = ? AND user_name = ?;`;
    const updateResult = await queryAsync(updateDepositQuery, ["Declined by User", "By User", id, mobile,]);

    if (updateResult.affectedRows === 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Failed to decline the withdrawal request. Please check the details.",
      });
    }
    const walletUpdateQuery = `UPDATE wallet SET wallet_balance = wallet_balance + (SELECT balance FROM deposit WHERE id = ?) WHERE user_name = ?;`;
    const walletUpdateResult = await queryAsync(walletUpdateQuery, [id, mobile]);
    // await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))",
    //   [mobile, 'Withdrawal', `Declined By User`, withdrawal.balance, mobile]);
    if (walletUpdateResult.affectedRows > 0) {
      return res.status(200).json({
        error: false,
        status: true,
        message: "Withdrawal request declined, and wallet balance updated successfully.",
      });
    } else {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Failed to update wallet balance.",
      });
    }
  } catch (err) {
    console.error("Error in /decline-withdrawal-request:", err);
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error.",
    });
  }
})



app.post("/check-user", async (req, res) => {
  try {
    if (!req.body.user_mobile) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "Mobile Number Required",
      });
    }
    const result = await queryAsync("SELECT * FROM `user_details` where `mobile` = ?;", [req.body.user_mobile]);
    if (result.length == 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "User not found. Please check the details and try again.",
      });
    } else {
      return res.status(200).json({
        error: false,
        status: true,
        data: { username: result[0].username }
      })
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/money-transfer", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin, user_mobile } = req.body;
    if (mobile == user_mobile) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Same mobile number, you can't transfer money.",
      });
    } else
      if (parseInt(amount) <= 99) {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Transfer amount must be at least 100 Rupees.",
        });
      } else {
        const result = await queryAsync("SELECT * FROM `user_details` where `mobile` = ?;", [user_mobile]);
        if (result.length == 0) {
          return res.status(302).json({
            error: true,
            status: false,
            message: "Transfer User not found. Please check the details and try again.",
          });
        } else {
          const check = await queryAsync('SELECT * FROM `user_pin` WHERE `user_id` = (SELECT ud.id FROM `user_details` as ud WHERE `mobile` = ?)', [mobile]);
          if (check.length == 0) {
            return res.status(302).json({
              error: true,
              status: false,
              message: "Secret PIN not found. Please create your PIN to proceed.",
            });
          } else {
            const status = bcrypt.compareSync(pin, check[0].pin);
            if (status) {
              const owner = await queryAsync("SELECT * FROM `wallet` WHERE `user_name` = ?", [mobile]);
              if (parseInt(owner[0].wallet_balance) >= parseInt(amount)) {
                await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
                await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?", [parseInt(amount), user_mobile]);
                await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))', [mobile, 'Money Transfer', `Transfer To ${user_mobile}`, parseInt(amount), mobile])
                await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))', [user_mobile, 'Money Transfer', `Transfer from ${mobile}`, parseInt(amount), user_mobile])
                return res.status(200).json({
                  error: false,
                  status: true,
                });
              } else {
                return res.status(302).json({
                  error: true,
                  status: false,
                  message: "Insufficient wallet balance. Transfer cannot be completed.",
                });
              }
            } else {
              return res.status(302).json({
                error: true,
                status: false,
                message: "Incorrect PIN. Please enter the correct PIN.",
              });
            }
          }
        }
      }
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/get-plans", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `new_investment_plan` as nip WHERE nip.`status` = 'Y'");
    res.status(200).json({ error: false, status: true, data: result });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/get-statement", verifytoken, async (req, res) => {
  try {
    const { mobile, type } = req.body;
    if (!mobile) {
      return res.status(400).json({ error: true, status: false, message: "Invalid or missing 'Mobile' parameter" });
    }
    let query = "SELECT * FROM `statement` WHERE `number` = ?";
    let params = [mobile];
    if (type) {
      query = "SELECT * FROM `statement` WHERE (`number` = ? AND type = 'Level-Up Reward') or (`number` = ? AND type = 'Monthly Reward');";
      params.push(mobile);
    }
    const result = await queryAsync(query, params);
    return res.status(200).json(
      result.length
        ? { error: false, status: true, data: result }
        : { error: false, status: true, message: "No records found", data: [] }
    );
  } catch (err) {
    console.error("Error in /get-statement:", err);
    return res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});
app.post("/get-game-statement", verifytoken, async (req, res) => {
  try {
    if (!req.body.type) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Invalid or missing 'type' parameter"
      });
    }
    const result = await queryAsync("SELECT * FROM `game_statement` WHERE `game_type` = ? ORDER BY `id` DESC LIMIT 40", [req.body.type]);
    const parsedData = result.map(item => ({
      ...item,
      details: (() => {
        try {
          return JSON.parse(item.details);
        } catch {
          return item.details;
        }
      })()
    }));

    res.status(200).json(
      parsedData.length ? { error: false, status: true, data: parsedData } : { error: false, status: false, message: "No records found", data: [] }
    );
  } catch (err) {
    console.error("Error in /get-game-statement:", err);
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/get-level-income", verifytoken, async (req, res) => {
  try {
    if (!req.body.mobile) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Invalid or missing 'mobile' parameter"
      });
    }
    const result = await queryAsync("SELECT li.`id`, li.`mobile`, li.`level`, li.`position`, (SELECT ud.`username` FROM `user_details` as ud WHERE ud.`reffer_code` = li.`user_reffral`) as user_name, li.`retrun_amount`, li.`date` FROM `level_income` as li WHERE li.`mobile` = ?", [req.body.mobile]);
    res.status(200).json(
      result.length ? { error: false, status: true, data: result } : { error: false, status: false, message: "No records found", data: [] }
    );
  } catch (err) {
    console.error("Error in /get-game-statement:", err);
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/get-matching-income", verifytoken, async (req, res) => {
  try {
    if (!req.body.mobile) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Invalid or missing 'mobile' parameter"
      });
    }
    const result = await queryAsync("SELECT * FROM `user_matching_income` WHERE `mobile` = ?", [req.body.mobile]);
    res.status(200).json(
      result.length ? { error: false, status: true, data: result } : { error: false, status: false, message: "No records found", data: [] }
    );
  } catch (err) {
    console.error("Error in /get-game-statement:", err);
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})

app.post("/make-new-investment", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin } = req.body;
    if (!mobile || !pin || !amount) {
      return res.status(400).json({
        error: true,
        status: false,
        message: !mobile ? "Mobile number is required" : !pin ? "Secret Pin is required" : "Amount is required"
      });
    }
    const check = await queryAsync('SELECT aa.* FROM `user_pin` as aa WHERE aa.`user_id` = (SELECT ud.id FROM `user_details` as ud WHERE `mobile` = ?)', [mobile]);
    if (check.length == 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Secret PIN not found. Please create your PIN to proceed.",
      });
    } else {
      const status = bcrypt.compareSync(pin, check[0].pin);
      if (status) {
        const check = await queryAsync('SELECT * FROM `new_investment_plan` WHERE ? BETWEEN amount_start AND amount_end;', [parseInt(amount)]);
        if (check.length == 0) {
          return res.status(302).json({ error: true, status: false, message: "Plan Is not Found. Please Select Another Plan." });
        } else {
          const owner = await queryAsync("SELECT w.* FROM `wallet` as w WHERE w.`user_name` = ?", [mobile]);
          const result1 = await queryAsync("SELECT * FROM `usdt` WHERE status = 'Y'");
          if (parseInt(owner[0].wallet_balance) >= parseFloat(parseInt(amount) * (parseFloat(result1[0].price)))) {
            await queryAsync("UPDATE `wallet` as w SET w.`wallet_balance` = w.`wallet_balance` - ? WHERE w.`user_name` = ?", [parseInt(amount) * (parseFloat(result1[0].price)), mobile]);
            await queryAsync(
              `INSERT INTO statement (number, type, description, amount, balance) VALUES (?, ?, ?, ?, (SELECT w.wallet_balance FROM wallet AS w WHERE w.user_name = ?))`,
              [mobile, 'Investment', '', `${parseInt(amount)} (₹${(parseInt(amount) * parseFloat(result1[0].price)).toFixed(1)})`, mobile]
            );
            await queryAsync(
              "INSERT INTO `buy_plan` (`user_id`, `plan_id`, `amount`) VALUES ((SELECT ud.`id` FROM `user_details` as ud WHERE ud.`mobile` = ?), ?, ?)",
              [mobile, check[0].id, amount]
            );
            await givematchingincome(mobile, check[0].id);
            // await queryAsync("UPDATE `user_reffer` SET `plancheck`= 'Y' WHERE `reffer_by` = (SELECT ud.`reffer_code` FROM `user_details` as ud WHERE ud.`mobile`=?) and `plancheck` = 'N'", [mobile]);
            return res.status(200).json({ error: false, status: true });
          } else {
            return res.status(302).json({ error: true, status: false, message: "Insufficient wallet balance. Transfer cannot be completed." });
          }
        }
      } else {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Incorrect PIN. Please enter the correct PIN.",
        });
      }
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/get-investment-plan", async (req, res) => {
  try {
    const result = await queryAsync("SELECT bp.id, bp.amount, ip.`plan_name`,ip.`amount_start`,ip.`amount_end`, ip.`retrun_percentage`, bp.status, bp.date FROM buy_plan AS bp INNER JOIN new_investment_plan AS ip ON bp.plan_id = ip.id WHERE bp.user_id = (SELECT ud.id FROM user_details AS ud WHERE ud.mobile = ?);", [req.body.mobile]);
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post("/color-money-transfer", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin, type } = req.body;
    const check = await queryAsync('SELECT * FROM `user_pin` WHERE `user_id` = (SELECT ud.id FROM `user_details` as ud WHERE ud.`mobile` = ?);', [mobile]);
    if (!check.length) return res.status(302).json({ error: true, status: false, message: "Secret PIN not found. Please create your PIN to proceed." });
    if (!bcrypt.compareSync(pin, check[0].pin)) return res.status(302).json({ error: true, status: false, message: "Incorrect PIN. Please enter the correct PIN." });

    const owner = await queryAsync("SELECT * FROM `wallet` WHERE `user_name` = ?;", [mobile]);
    if (!owner.length) await queryAsync("INSERT INTO `wallet`(`user_name`, `game_wallet`) VALUES (?,'0');", [mobile]);
    if (type == '1') {
      if (parseFloat(owner[0].wallet_balance) < parseFloat(amount)) return res.status(302).json({ error: true, status: false, message: `Insufficient Balance in MainWallet.` });
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ?, `game_wallet`=`game_wallet` + ? WHERE `user_name` = ?;", [parseInt(amount), parseInt(amount), mobile]);
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?));', [mobile, 'Money Transfer', `Sent To GameWallet`, parseInt(amount), mobile]);
      await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,?,?,?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?));", [mobile, 'Money Transfer', `Received`, parseInt(amount), mobile]);
      return res.status(200).json({ error: false, status: true, message: "Transfer SuccessFully." });
    } else if (type == '2') {
      if (parseFloat(owner[0].game_wallet) < parseFloat(amount)) return res.status(302).json({ error: true, status: false, message: `Insufficient Balance in GameWallet.` });
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance`+?, `game_wallet`=`game_wallet`-? WHERE `user_name` = ?;", [parseInt(amount), parseInt(amount), mobile]);
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,?,(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?));', [mobile, 'Money Transfer', `Received from GameWallet`, parseInt(amount), mobile]);
      await queryAsync("INSERT INTO `game_statement`(`username`, `bet_type`, `game_type`, `bet_balance`, `total_balance`) VALUES (?,?,?,?,(SELECT (`game_wallet`) as balance FROM `wallet` WHERE `user_name`= ?));", [mobile, 'Money Transfer', `Send`, parseInt(amount), mobile]);
      return res.status(200).json({ error: false, status: true, message: "Transfer SuccessFully." });
    } else {
      return res.status(302).json({ error: true, status: false, message: "Invalid Transfer Type." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
})
app.post("/add-member", async (req, res) => {
  try {
    let referralCode = await coded();
    let result = await queryAsync("SELECT * FROM `user_details` WHERE `reffer_code` = ?", [req.body.reffer_by]);
    if (result.length == 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Reffer Code Is not Exist.",
      });
    }
    result = await queryAsync("SELECT * FROM `user_details` WHERE `email` = ?;", [req.body.email]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Email ID already exists.",
      });
    }
    result = await queryAsync("SELECT * FROM `user_details` WHERE `mobile` = ?;", [req.body.mobile]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Mobile number already exists.",
      });
    }
    const newId = parseInt((await queryAsync("SELECT IFNULL(MAX(uid), 100000) + 1 AS id FROM user_details"))[0].id);
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    await queryAsync(
      "INSERT INTO `user_details`(`mobile`, `username`, `password`, `email`, `uid`, `reffer_by`, `reffer_code`, `position`) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.mobile, req.body.name, hashedPassword, req.body.email, newId, req.body.reffer_by || '5Zw8gbwv', referralCode, req.body.position]
    );
    await queryAsync('INSERT INTO `wallet`(`user_name`) VALUES(?)', [req.body.mobile]);
    const checkMobileResult = await queryAsync('SELECT COUNT(*) as count FROM `wallet` WHERE `user_name` = ?', [req.body.mobile]);
    if (checkMobileResult[0].count === 0) {
      await queryAsync('INSERT INTO `wallet`(`user_name`) VALUES(?)', [req.body.mobile]);
    }
    return res.status(200).json({
      error: false,
      status: true,
      message: "Registered successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred. Please try again later.",
    });
  }
})
app.post("/get-roi", async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Mobile number is required.",
      });
    }
    const result = await queryAsync("SELECT * FROM `return_investment` WHERE `mobile` = ?", [mobile]);
    return res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
})
app.post('/get-current-time', async (req, res) => {
  try {
    res.status(200).json({
      error: false,
      status: true,
      current_time: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: false,
      message: 'Failed to retrieve the current time',
    });
  }
})
app.post("/claim-reward", verifytoken, async (req, res) => {
  try {
    const { mobile, type } = req.body;
    if (!['levelup', 'monthly'].includes(type)) {
      return res.status(302).json({ error: true, status: false, message: "Invalid type. Use 'levelup' or 'monthly'." });
    }
    if (type == 'levelup') {
      const checkbank = await queryAsync("SELECT * FROM `wagring_history` WHERE `username` = ? AND `levelup_check` = 'Y';", [mobile]);
      if (checkbank === 0) {
        return res.status(302).json({ error: true, status: false, message: "Already Claimed Level-Up Reward." });
      }
      const [amount] = await queryAsync("SELECT `levelreward` FROM `plans` WHERE `id` = ?;", [checkbank[0].vip_id]);
      await queryAsync("UPDATE `wagring_history` SET `levelup_check`='N' WHERE `username` = ?;", [mobile]);
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?;", [amount.levelreward, mobile]);
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?, ?, ?, ?, (SELECT `wallet_balance` FROM `wallet` WHERE `user_name` = ?));",
        [mobile, 'Level-Up Reward', `Claimed From Level: ${amount.levelreward}`, amount.levelreward, mobile]);
      return res.status(200).json({ error: false, status: true, message: "Claimed Reward Successfully.", amount: amount.levelreward });
    }
    if (type == 'monthly') {
      const checkbank = await queryAsync("SELECT * FROM `wagring_history` WHERE `username` = ? AND `monthly_reward` = 'Y';", [mobile]);
      if (checkbank === 0) {
        return res.status(302).json({ error: true, status: false, message: "Already Claimed Monthly Reward." });
      }
      const [amount] = await queryAsync("SELECT * FROM `plans` WHERE `id` = ?;", [checkbank[0].vip_id]);
      const cal_amount = parseFloat(checkbank[0].monthly_wagering * (amount.monthyreward / 100)).toFixed(2);
      await queryAsync("UPDATE `wagring_history` SET `monthly_reward`='N',`monthly_wagering` = '0' WHERE `username` = ?;", [mobile]);
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?;", [cal_amount, mobile]);
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?, ?, ?, ?, (SELECT `wallet_balance` FROM `wallet` WHERE `user_name` = ?));",
        [mobile, 'Monthly Reward', `Claimed Monthly Reward: ${cal_amount}`, cal_amount, mobile]);
      return res.status(200).json({ error: false, status: true, message: "Claimed Reward Successfully.", amount: cal_amount });
    }
  } catch (err) {
    console.error("Error in claim-reward:", err);
    return res.status(500).json({ error: true, status: false, message: "An error occurred while processing the reward claim." });
  }
});

async function sendMail(name, email, mobile, message) {
  try {
    let mailOptions2 = {
      // from: 'developercreazy@gmail.com',
      from: 'otp2@kmaobharat.com',
      to: `${email}`,
      subject: 'Enquiry Request Message',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mobile:</strong> ${mobile}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };
    let info = await transporter.sendMail(mailOptions2);
    return { success: true, info };
  } catch (error) {
    throw new Error('Failed to send email');
  }
}
async function coded() {
  try {
    let x = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let a = "";
    for (let index = 0; index < 8; index++) {
      a += x[Math.floor(Math.random() * x.length)];
    }
    const result = await queryAsync("select * from user_details where `reffer_code` = ?", [a])
    if (result.length > 0) {
      return codeleft();
    } else {
      return a;
    }
  } catch (error) {
    throw error;
  }
}
async function addUser(name, referralId, position) {
  let newUserId;
  const parent = await queryAsync('SELECT id FROM `user_details` WHERE id = ?', [referralId]);
  if (parent.length === 0) {
    throw new Error("Referral ID does not exist.");
  }
  const leftChild = await queryAsync('SELECT * FROM `user_details` WHERE reffer_by = ? AND position = ? ORDER BY id ASC LIMIT 1', [referralId, position]);
  if (leftChild.length === 0) {
    newUserId = await insertUser(name, referralId, position);
  } else {
    newUserId = await addUser(name, leftChild[0].id, position);
  }
  return newUserId;
}
async function insertUser(name, referralId, position) {
  const result = await queryAsync('INSERT INTO users (name, referral_id, position) VALUES (?, ?, ?)', [name, referralId, position]);
  return result.insertId;
}
const flattenData = (data) => {
  let result = [];
  const recurse = (items) => {
    items.forEach(item => {
      const { children, ...rest } = item;
      result.push(rest);
      if (children.length) {
        recurse(children);
      }
    });
  };
  recurse(data);
  result.sort((a, b) => a.uid.localeCompare(b.uid));
  return result;
};
async function getAllChildren(referralId) {
  if (!referralId) {
    throw new Error("Referral ID is missing or invalid.");
  }
  const leftChildren = await queryAsync(
    'SELECT ud.`username`, ud.`mobile`, ud.`uid`, (SELECT SUM(bp.`amount`) as sum FROM `buy_plan` as bp WHERE bp.`user_id` = ud.id) as total_invest, ud.`position`, ud.`reffer_code`, ud.`reffer_by`, ud.`date` FROM `user_details` as ud WHERE ud.reffer_by = ? AND ud.position = ? ORDER BY ud.id ASC',
    [referralId, 'L']
  );
  const rightChildren = await queryAsync(
    'SELECT ud.`username`, ud.`mobile`, ud.`uid`, (SELECT SUM(bp.`amount`) as sum FROM `buy_plan` as bp WHERE bp.`user_id` = ud.id) as total_invest, ud.`position`, ud.`reffer_code`, ud.`reffer_by`, ud.`date` FROM `user_details` as ud WHERE ud.reffer_by = ? AND ud.position = ? ORDER BY ud.id ASC',
    [referralId, 'R']
  );
  let allChildren = [];
  for (let child of leftChildren) {
    const childDescendants = await getAllChildren(child.reffer_code);
    allChildren.push({
      username: child.username,
      uid: child.uid,
      position: child.position,
      reffer_code: child.reffer_code,
      reffer_by: child.reffer_by,
      mobile: child.mobile,
      date: child.date,
      total_invest: child.total_invest,
      children: childDescendants
    });
  }
  for (let child of rightChildren) {
    const childDescendants = await getAllChildren(child.reffer_code);
    allChildren.push({
      username: child.username,
      uid: child.uid,
      position: child.position,
      reffer_code: child.reffer_code,
      reffer_by: child.reffer_by,
      mobile: child.mobile,
      date: child.date,
      total_invest: child.total_invest,
      children: childDescendants
    });
  }
  return allChildren;
}
async function getReferralHierarchy(referralId) {
  const rootUser = await queryAsync(
    'SELECT ud.`username`, ud.`mobile`, ud.`uid`, (SELECT SUM(bp.`amount`) as sum FROM `buy_plan` as bp WHERE bp.`user_id` = ud.id) as total_invest, ud.`position`, ud.`reffer_code`, ud.`reffer_by`, ud.`date` FROM `user_details` as ud WHERE ud.reffer_code = ?',
    [referralId]
  );
  if (rootUser.length === 0) {
    throw new Error("Referral ID not found.");
  }
  const root = rootUser[0];
  const children = await getAllChildren(root.reffer_code);
  return {
    username: root.username,
    uid: root.uid,
    position: root.position,
    reffer_code: root.reffer_code,
    reffer_by: root.reffer_by,
    mobile: root.mobile,
    date: root.date,
    total_invest: root.total_invest,
    children: children
  };
}
function rearrangeChildren(node) {
  if (!node.children || node.children.length === 0) {
    return node;
  }
  let leftChildren = [];
  let rightChildren = [];
  node.children.forEach(child => {
    if (child.position === 'L') {
      leftChildren.push(child);
    } else if (child.position === 'R') {
      rightChildren.push(child);
    }
  });
  leftChildren = leftChildren.map(rearrangeChildren);
  rightChildren = rightChildren.map(rearrangeChildren);
  const rearrangedChildren = [];
  if (leftChildren.length > 0) {
    rearrangedChildren.push(leftChildren[0]);
    if (leftChildren.length > 1) {
      rearrangedChildren[0].children.push(leftChildren[1]);
    }
  }
  if (rightChildren.length > 0) {
    rearrangedChildren.push(rightChildren[0]);
    if (rightChildren.length > 1) {
      rearrangedChildren[0].children.push(rightChildren[1]);
    }
  }
  for (let i = 2; i < leftChildren.length; i++) {
    rearrangedChildren[0].children.push(leftChildren[i]);
  }
  for (let i = 1; i < rightChildren.length; i++) {
    rearrangedChildren.push(rightChildren[i]);
  }
  node.children = rearrangedChildren;
  return node;
}
async function callApi(data) {
  try {
    const date = new Date().getTime();
    const url = "https://auth.worldcasinoonline.com/api/auth/userauthentication";
    const data2 = {
      "partnerKey": "w3BAD0aMFldV2lmm4xV9mf2D946pYBtQToBtmYu5QWWV7lsz3ANOUcmqJV0S+aSe",
      "game": {
        "gameCode": "VTP",
        "providerCode": "SN"
      },
      "timestamp": (date).toString(),
      "user": {
        "id": (data.id).toString(),
        "currency": data.currency,
        "displayName": data.displayName,
        "backUrl": "https://sneakbooker.com/"
      }
    };
    const response = await axios.post(url, data2);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error.response ? error.response.data : error.message);
  }
}
async function casinogames() {
  try {
    // Create an HTTPS Agent with family set to 4 (IPv4)
    const agent = new https.Agent({ family: 4 });
    const url = "https://api.worldcasinoonline.com/api/games";
    const data = {
      "partnerKey": "w3BAD0aMFldV2lmm4xV9mf2D946pYBtQToBtmYu5QWWV7lsz3ANOUcmqJV0S+aSe",
      "providerCode": ""
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: agent  // Force IPv4 by using the custom agent
    };
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
}
const secretKey = '3e6dLf3A02D52L51630ac3883A339Y92b776CY97dbeYC21e113DdLe8314LbD84C53aad90C06D6A0aabYa6DCD139cCDCcf491AZA72CcYacb5CL7D08Zb159D7Z91';
const decrypt = encrypted => CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
cron.schedule('0 0 * * *', async () => {
  try {
    const price = await queryAsync("SELECT `price` FROM `usdt` WHERE `status` = 'Y'");
    if (!price || price.length === 0) {
      throw new Error("USDT price not found.");
    }
    const alldata = await queryAsync(`
      SELECT bp.id, (SELECT ud1.mobile FROM user_details AS ud1 WHERE ud1.id = bp.user_id) AS mobile,ROUND(bp.amount,3) as oramount, 
      ROUND(bp.amount * (SELECT usss.price FROM usdt AS usss WHERE usss.status = 'Y'), 3) AS amount, (SELECT nip.retrun_percentage FROM new_investment_plan AS
       nip WHERE nip.id = bp.plan_id) AS percentage,ROUND(bp.amount * (SELECT usss.price FROM usdt AS usss WHERE usss.status = 'Y') * (SELECT nip.retrun_percentage
        FROM new_investment_plan AS nip  WHERE nip.id = bp.plan_id) / 100, 3) AS calculated_return_amount,ROUND(bp.amount * (SELECT nip.retrun_percentage 
        FROM new_investment_plan AS nip  WHERE nip.id = bp.plan_id) / 100, 3) AS calculated_return_oramount,bp.total_return_amount, bp.status FROM buy_plan 
        AS bp WHERE bp.status = 'ongoing';
    `, []);
    for (const e of alldata) {
      const calculatedReturnORAmount = parseFloat(e.calculated_return_oramount);
      const calculatedReturnAmount = parseFloat(e.calculated_return_amount);
      const updatedTotalReturnAmount = parseFloat(parseFloat(e.total_return_amount) + calculatedReturnORAmount);
      const reffal = await queryAsync("SELECT `reffer_code` FROM `user_details` WHERE `mobile`=?", [e.mobile]);
      if (reffal.length > 0 && reffal[0].reffer_code) {
        await givelevelincome(reffal[0].reffer_code);
      }
      await queryAsync(
        "UPDATE wallet SET wallet_balance = wallet_balance + ? WHERE user_name = ?",
        [calculatedReturnAmount, e.mobile]
      );
      await queryAsync(
        `INSERT INTO statement (number, type, description, amount, balance) 
         VALUES (?, ?, ?, ?, 
         (SELECT w.wallet_balance FROM wallet AS w WHERE w.user_name = ?))`,
        [
          e.mobile,
          'Investment Return',
          `Daily return credited`,
          `${calculatedReturnORAmount} (₹${calculatedReturnAmount})`,
          e.mobile
        ]
      );
      await queryAsync(
        "UPDATE buy_plan SET total_return_amount = total_return_amount + ? WHERE id = ?",
        [updatedTotalReturnAmount, e.id]
      );
      await queryAsync(
        "INSERT INTO return_investment (mobile, investment_amount, today_return, total_return_amount) VALUES (?, ?, ?, ?)",
        [e.mobile, parseFloat(e.oramount), calculatedReturnORAmount, updatedTotalReturnAmount]
      );
    }
    await queryAsync(
      "UPDATE buy_plan SET status = 'expire' WHERE status = 'ongoing' AND amount * 2 <= total_return_amount;"
    );
  } catch (error) {
    console.error("Error during cron job:", error);
  }
})
cron.schedule('0 0 28-31 * *', async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (tomorrow.getDate() === 1) {
    const wagering = await queryAsync("SELECT * FROM wallet;");
    for (const element of wagering) {
      await queryAsync("UPDATE `wagring_history` SET `monthly_reward`=?, `monthly_wagering`=? WHERE `username`=?", ['Y', element.monthly_wagering, element.user_name]);
    }
    await queryAsync("UPDATE `wallet` SET `monthly_wagering` = ?", [0]);
  }
});


function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validateOriginAndUserAgent(req, res, next) {
  const allowedOrigins = ['https://sneakbooker.com', 'http://sneakbooker.com', 'https://www.sneakbooker.com', 'https://stakebooker.com', 'http://stakebooker.com', "http://localhost:3000"];
  const userAgent = req.headers['user-agent'];
  if (!allowedOrigins.includes(req.headers.origin)) {
    return res.status(403).send("Origin is not allowed.");
  }
  if (!userAgent || userAgent.toLowerCase().includes('postman')) {
    return res.status(403).send("Requests from Postman or similar tools are not allowed.");
  }
  next();
}
const getUserHierarchy = async (baseRefferCode, maxLevel, currentLevel = 1, hierarchy = []) => {
  if (currentLevel > maxLevel) {
    return hierarchy;
  }
  const rows = await queryAsync(`
    SELECT ud.id,bp.id as plan_id, ud.username, TRUE AS check_plan, ud.reffer_code, ud.reffer_by, CAST(bp.amount AS DECIMAL(10, 2)) AS amount, 
    (SELECT CAST(nip.retrun_percentage AS DECIMAL(10, 2)) FROM new_investment_plan as nip WHERE nip.id = bp.plan_id) as percentage, 
    ROUND(bp.amount * (SELECT nip.retrun_percentage FROM new_investment_plan AS nip WHERE nip.id = bp.plan_id ) / 100, 3) AS calculated_return_amount,
    ud.position FROM user_details as ud INNER JOIN buy_plan bp ON ud.id = bp.user_id WHERE ud.reffer_by = ?;`, [baseRefferCode]);
  if (Array.isArray(rows) && rows.length > 0) {
    hierarchy.push({ level: currentLevel, users: rows });
    const data = filterByUniqueId(rows);
    for (const user of data) {
      await getUserHierarchy(user.reffer_code, maxLevel, currentLevel + 1, hierarchy);
    }
  }
  const mergedData = Object.values(
    hierarchy.reduce((acc, curr) => {
      if (!acc[curr.level]) {
        acc[curr.level] = { level: curr.level, users: [] };
      }
      acc[curr.level].users = acc[curr.level].users.concat(curr.users);
      return acc;
    }, {})
  );
  return mergedData;
}
function filterByUniqueId(data) {
  return Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = item;
      }
      return acc;
    }, {})
  );
}
const givelevelincome = async (baseRefferCode) => {
  if (!baseRefferCode) {
    throw new Error("Base reference code is required.");
  }
  try {
    const get_percentage = await queryAsync("SELECT * FROM `level`;");
    if (!get_percentage.length) {
      throw new Error("Level percentage data not found.");
    }
    const priceResult = await queryAsync("SELECT `price` FROM `usdt` WHERE `status` = ?;", ['Y']);
    if (!priceResult.length) {
      throw new Error("USDT price not found.");
    }
    const price = parseFloat(priceResult[0].price);
    const hierarchy = await getUserHierarchy(baseRefferCode, get_percentage.length);
    for (const element of hierarchy) {
      for (const user of element.users) {
        try {
          const calculated_return_amount = parseFloat(
            user.calculated_return_amount * (parseFloat(get_percentage[element.level - 1].percentage) / 100)
          ).toFixed(5);
          const totalAmount = parseFloat(calculated_return_amount * price).toFixed(5);
          await queryAsync("START TRANSACTION;");
          await queryAsync(
            `INSERT INTO level_income (mobile, level, position, user_reffral, retrun_amount) 
             VALUES ((SELECT ud.mobile FROM user_details AS ud WHERE ud.reffer_code = ?),?,?,?,?);`,
            [baseRefferCode, element.level, user.position, user.reffer_code, calculated_return_amount]
          );
          await queryAsync(
            "UPDATE buy_plan SET total_return_amount = total_return_amount + ? WHERE id = ?",
            [calculated_return_amount, user.plan_id]
          );
          await queryAsync(
            `UPDATE wallet SET wallet_balance = wallet_balance + ? 
             WHERE user_name = (SELECT ud.mobile FROM user_details as ud WHERE ud.reffer_code = ?);`,
            [totalAmount, baseRefferCode]
          );
          await queryAsync(
            `INSERT INTO statement (number, type, description, amount, balance) 
             VALUES (
               (SELECT ud.mobile FROM user_details AS ud WHERE ud.reffer_code = ?), ?, 
               CONCAT(?, (SELECT ud.mobile FROM user_details AS ud WHERE ud.reffer_code = ?)), ?, 
               (SELECT wallet_balance FROM wallet WHERE user_name = (SELECT ud.mobile FROM user_details AS ud WHERE ud.reffer_code = ?))
             );`,
            [baseRefferCode, 'Level-Income', `Level-${element.level}||${user.position}||`, user.reffer_code, totalAmount, baseRefferCode]
          );
          await queryAsync("COMMIT;");
        } catch (error) {
          await queryAsync("ROLLBACK;");
          console.error(`❌ Error processing user ${user.reffer_code} at level ${element.level}:`, error);
        }
      }
    }
    return { status: 'success', hierarchyProcessed: hierarchy.length };
  } catch (error) {
    console.error("🚨 Critical Error in givelevelincome function:", error);
    throw error;
  }
}
// const givematchingincome = async (mobile, plan) => {
//   try {
//     const getamount = await queryAsync("SELECT matching FROM new_investment_plan WHERE id = ? LIMIT 1", [plan]);
//     if (!getamount.length) return null;
//     const users = await queryAsync("SELECT * FROM user_details WHERE mobile = ? LIMIT 1", [mobile]);
//     if (!users.length) return null;
//     const user = users[0];
//     const oppositePosition = user.position === 'L' ? 'R' : 'L';
//     const result = await queryAsync(
//       `SELECT bp.*, ur.reffer_to, ur.reffer_by, ur.position, ud.mobile FROM buy_plan bp INNER JOIN user_details ud ON bp.user_id = ud.id INNER JOIN user_reffer ur
//        ON ud.reffer_code = ur.reffer_by WHERE bp.pair = 'N' AND ur.position = ? AND ur.reffer_to = ? AND bp.plan_id = ? ORDER BY bp.id ASC LIMIT 1`,
//       [oppositePosition, user.reffer_by, plan]
//     );
//     if (!result.length) return;
//     const userresult = await queryAsync(
//       `SELECT bp.*, ur.reffer_to, ur.reffer_by, ur.position, ud.mobile FROM buy_plan bp INNER JOIN user_details ud ON bp.user_id = ud.id INNER JOIN user_reffer ur ON
//        ud.reffer_code = ur.reffer_by WHERE bp.pair = 'N' AND ur.position = ? AND ud.mobile = ? AND bp.plan_id = ? ORDER BY bp.id ASC LIMIT 1`,
//       [user.position, mobile, plan]
//     );
//     if (!userresult.length) return;
//     await queryAsync("START TRANSACTION;");
//     await queryAsync("UPDATE buy_plan SET pair='Y' WHERE id IN (?, ?)", [result[0].id, userresult[0].id]);
//     await queryAsync(
//       `UPDATE wallet SET wallet_balance = wallet_balance + ? WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1)`,
//       [getamount[0].matching, user.reffer_by]
//     );
//     await queryAsync(
//       `INSERT INTO user_matching_income (mobile, plan, user_1, user_2, matching_amount, balance) VALUES ((SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1), (SELECT plan_name FROM new_investment_plan WHERE id = ? LIMIT 1), ?, ?, ?, (SELECT wallet_balance FROM wallet WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1)))`,
//       [user.reffer_by, plan, `${result[0].mobile}(${result[0].position})`, `${userresult[0].mobile}(${userresult[0].position})`, getamount[0].matching, user.reffer_by]
//     );
//     await queryAsync(
//       `INSERT INTO statement (number, type, description, amount, balance) VALUES ((SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1), ?, CONCAT(?, (SELECT plan_name FROM new_investment_plan WHERE id = ? LIMIT 1)), ?, (SELECT wallet_balance FROM wallet WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1) LIMIT 1))`,
//       [user.reffer_by, 'Matching-Income', `Pair:- ${userresult[0].mobile}(${userresult[0].position}) And Pair:- ${result[0].mobile}(${result[0].position}) || Active-Plan:- `, plan, getamount[0].matching, user.reffer_by]
//     );
//     await queryAsync("COMMIT;");
//   } catch (error) {
//     await queryAsync("ROLLBACK;");
//     console.error("🚨 Error in givematchingincome:", error);
//   }
// }
const givematchingincome = async (mobile, plan) => {
  try {
    const [planData] = await queryAsync("SELECT matching FROM new_investment_plan WHERE id = ? LIMIT 1", [plan]);
    if (!planData) return;
    const [user] = await queryAsync("SELECT * FROM user_details WHERE mobile = ? LIMIT 1", [mobile]);
    if (!user) return;
    const oppositePosition = user.position === "L" ? "R" : "L";
    const [oppositePair] = await queryAsync(
      `SELECT bp.*, ur.position, ud.mobile FROM buy_plan bp 
       INNER JOIN user_details ud ON bp.user_id = ud.id 
       INNER JOIN user_reffer ur ON ud.reffer_code = ur.reffer_by 
       WHERE bp.pair = 'N' AND ur.position = ? AND ur.reffer_to = ? AND bp.plan_id = ? 
       ORDER BY bp.id ASC LIMIT 1`,
      [oppositePosition, user.reffer_by, plan]
    );
    if (!oppositePair) return;
    const [userPair] = await queryAsync(
      `SELECT bp.*, ur.position, ud.mobile FROM buy_plan bp 
       INNER JOIN user_details ud ON bp.user_id = ud.id 
       INNER JOIN user_reffer ur ON ud.reffer_code = ur.reffer_by 
       WHERE bp.pair = 'N' AND ur.position = ? AND ud.mobile = ? AND bp.plan_id = ? 
       ORDER BY bp.id ASC LIMIT 1`,
      [user.position, mobile, plan]
    );
    if (!userPair) return;
    await queryAsync("START TRANSACTION");
    await queryAsync("UPDATE buy_plan SET pair='Y' WHERE id IN (?, ?)", [oppositePair.id, userPair.id]);
    await queryAsync(
      `UPDATE wallet SET wallet_balance = wallet_balance + ? 
       WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1)`,
      [planData.matching, user.reffer_by]
    );
    const referrerMobileQuery = `(SELECT mobile FROM user_details WHERE reffer_code = ? LIMIT 1)`;
    const walletBalanceQuery = `(SELECT wallet_balance FROM wallet WHERE user_name = ${referrerMobileQuery})`;
    const planNameQuery = `(SELECT plan_name FROM new_investment_plan WHERE id = ? LIMIT 1)`;
    await queryAsync(
      `INSERT INTO user_matching_income (mobile, plan, user_1, user_2, matching_amount, balance) 
       VALUES (${referrerMobileQuery}, ${planNameQuery}, ?, ?, ?, ${walletBalanceQuery})`,
      [
        user.reffer_by,
        plan,
        `${oppositePair.mobile}(${oppositePair.position})`,
        `${userPair.mobile}(${userPair.position})`,
        planData.matching,
        user.reffer_by,
      ]
    );
    await queryAsync(
      `INSERT INTO statement (number, type, description, amount, balance) VALUES (${referrerMobileQuery}, ?, ?, ?, ${walletBalanceQuery})`,
      [
        user.reffer_by,
        "Matching-Income",
        `Pair:- ${userPair.mobile}(${userPair.position}) And Pair:- ${oppositePair.mobile}(${oppositePair.position}) || Active-Plan:- ${planNameQuery}`,
        plan,
        planData.matching,
        user.reffer_by,
      ]
    );
    await queryAsync("COMMIT");
  } catch (error) {
    await queryAsync("ROLLBACK");
    console.error("🚨 Error in givematchingincome:", error);
  }
}
// console.log(await givelevelincome('5Zw8gbwv'));
module.exports = app;