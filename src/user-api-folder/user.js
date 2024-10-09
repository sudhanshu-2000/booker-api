const express = require("express");
const app = express.Router();
exports.app = app;
const { con, queryAsync, con2, queryAsync2 } = require('../db/conn');
var jwt = require("jsonwebtoken");
var atob = require('atob');
var btoa = require('btoa');
const cors = require("cors");
const verifytoken = require('../middle/user-auth');
app.use(cors());
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var multer = require("multer");
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
const fs = require('fs');
const nodemailer = require("nodemailer");
function deleteImage(imagePath) {
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) { return; }
    fs.unlink(imagePath, (err) => {
      if (err) { return; }
    });
  });
}
// const transporter = nodemailer.createTransport({
//   name: "mail.earnkrobharat.com",
//   host: "mail.earnkrobharat.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "otp2@earnkrobharat.com",
//     pass: "h6%yI4Q;HnIe",
//   },
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'developercreazy@gmail.com',
    pass: 'zqqy kvcu krov gizz'
  },
});
app.post("/register", async (req, res) => {
  try {
    let coded = await coded();
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
    let result = await queryAsync("SELECT * FROM `user_details` WHERE `email` = ?;", [req.body.email]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Email Id is Already Exist",
      });
    }
    result = await queryAsync("SELECT * FROM `user_details` WHERE `mobile` = ?;", [req.body.mobile]);
    if (result.length > 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Mobile Number is Already Exist",
      });
    }
    const newId = parseInt((await queryAsync("SELECT IFNULL(MAX(uid), 100000) + 1 AS id FROM user_details"))[0].id);
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    await queryAsync("INSERT INTO `user_details`(`mobile`, `username`, `password`, `email`, `uid`, `reffer_by`, `reffer_code`) VALUES (?,?,?,?,?,?,?)", [req.body.mobile, req.body.name, hash, req.body.email, newId, req.body.reffer_by || '5Zw8gbwv', coded]);
    await queryAsync('INSERT INTO `wallet`(`user_name`) VALUES(?)', [req.body.mobile]);
    const checkMobileResult = await queryAsync2('SELECT COUNT(*) as count FROM `wallet` WHERE `user_name` = ?', [req.body.mobile]);
    if (checkMobileResult[0].count === 0) {
      await queryAsync2('INSERT INTO `wallet`(`user_name`) VALUES(?)', [req.body.mobile]);
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred. Please try again later.",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    if (typeof req.body.password === 'number') {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Password Must be require String value",
      });
    }
    const userResult = await queryAsync("SELECT * FROM user_details WHERE mobile = ?", [req.body.mobile]);
    if (userResult.length > 0) {
      const status = bcrypt.compareSync(req.body.password, userResult[0].password);
      if (status) {
        const token = jwt.sign({ username: userResult[0].mobile }, process.env.SECRET_KEY_USER, { expiresIn: '1d' });
        const balance = await queryAsync("SELECT `wallet_balance` FROM `wallet` WHERE `user_name` = ?", [req.body.mobile]);
        return res.status(200).json({
          error: false,
          status: true,
          ID: userResult[0].uid,
          username: userResult[0].username,
          mobile: userResult[0].mobile,
          balance: balance[0].wallet_balance,
          message: "Login Successfully",
          token,
        });
      } else {
        return res.status(404).json({
          error: true,
          status: false,
          message: "Mobile Or Password is Wrong",
        });
      }
    } else {
      return res.status(404).json({
        error: true,
        message: "Mobile Number is Not Exist",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred",
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
});
app.post('/check-user-existence', async (req, res) => {
  try {
    const emailResult = await queryAsync("SELECT * FROM user_details WHERE email = ?", [req.body.email]);
    if (emailResult.length > 0) {
      return res.status(200).json({
        error: true,
        status: false,
        message: "Email Id is Already Exist",
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
    console.log(err);

    return res.status(500).json({
      error: true,
      status: false,
      message: "An error occurred",
    });
  }
});

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
});
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
});
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
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error",
    });
  }
});
// app.post("/change-pin", verifytoken, async (req, res) => {
//   try {
//     const result = await queryAsync("SELECT * FROM `user_pin` WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?)", [req.body.mobile]);
//     if (result.length > 0) {
//       const status = bcrypt.compareSync(req.body.pin, result[0].pin);
//       if (status) {
//         const hash = bcrypt.hashSync(req.body.new_pin, bcrypt.genSaltSync(12));
//         await queryAsync("UPDATE `user_pin` SET `pin` = ? WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?)", [hash, req.body.mobile]);
//         res.status(200).json({
//           error: false,
//           status: true,
//           message: "Reset Pin Successfully",
//         });
//       } else {
//         res.status(200).json({
//           error: true,
//           message: "Pin is Wrong",
//         });
//       }
//     } else {
//       res.status(200).json({
//         error: true,
//         message: "User Not Found",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// })


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
});
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
});

app.post("/user-details", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT ud.id, ud.username AS uname, ud.mobile, (SELECT us.`currency` FROM `usdt` AS us WHERE us.`status` = 'Y') AS currency,(SELECT uss.`price` FROM `usdt` AS uss WHERE uss.`status` = 'Y') AS currency_rate, ud.email, ud.user_pin, ud.pincode, ud.uid, ud.bank_status, ud.upi_id, ud.reffer_code, wa.wallet_balance, ud.date FROM `user_details` AS ud INNER JOIN `wallet` AS wa ON ud.mobile = wa.user_name WHERE ud.mobile = ?;", [req.body.mobile]);
    const wallet = await queryAsync2("SELECT `wallet_balance` as wb FROM `wallet` WHERE `user_name` = ?", [req.body.mobile]);
    const bank = await queryAsync("SELECT CASE WHEN `status` = 'Y' THEN `account_no` ELSE NULL END as ac_no, CASE WHEN `status` = 'Y' THEN `ifsc_code` ELSE NULL END as ifsc_code, CASE WHEN `status` = 'Y' THEN `account_holder_name` ELSE NULL END as ac_name, CASE WHEN `status` = 'Y' THEN `bankname` ELSE NULL END as bank_name, CASE WHEN `status` = 'Y' THEN `account_type` ELSE NULL END as ac_type, `reason`, `status`FROM `userbankdeatils`WHERE `user_id` = (SELECT `id` FROM `user_details` WHERE `mobile` = ?);", [req.body.mobile])
    Object.assign(result[0], { color_wallet_balnace: wallet.length == 0 ? 0 : wallet[0].wb });
    if (bank.length > 0) {
      Object.assign(result[0], bank[0]);
    }
    res.status(200).json({ error: false, status: true, data: result });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
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
});

app.post("/get-otp", async (req, res) => {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    const hash = bcrypt.hashSync(val.toString(), bcrypt.genSaltSync(12));
    const email = req.body.email;
    let result = await queryAsync("SELECT * FROM `otp` WHERE `number` = ?", [email]);
    const mailOptions = {
      // from: 'otp2@earnkrobharat.com',
      from: 'developercreazy@gmail.com',
      to: email,
      subject: "OTP Verification",
      text: "To Create your Account",
      html: `Your OTP is <b>${val.toString()}</b>, valid for 10 min`,
    };
    await transporter.sendMail(mailOptions);
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
    res.status(500).json({
      error: true,
      status: false,
      msg: "Internal Server Error",
    });
  }
});
app.post("/verify-otp", async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    let result = await queryAsync("SELECT * FROM `otp` WHERE `number` = ?", [email]);
    if (result.length > 0) {
      const match = bcrypt.compareSync(otp.toString(), result[0].otp);
      if (match) {
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
});

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
});
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
});
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
});

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
});
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
});
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
});
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
});
app.post("/get-rental-items", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `rental_items` WHERE `status` = 'Y'");
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
});
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
});

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
});
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
});

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
});
app.post("/deposit-request", upload.single("image"), async (req, res) => {
  try {
    const { mobile, amount, deposit_id, transection_id } = req.body;
    if (parseInt(amount) < 100) {
      return res.status(302).json({ error: true, status: false, message: "Minimum Balance withdrawal is 100." });
    }
    const depositExists = await queryAsync("SELECT * FROM `deposit` WHERE `user_name` = ? AND `payment_type` = 'Deposit' AND `status` = 'Pending'", [mobile]);
    if (depositExists.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "A deposit request has already been submitted. Please check your requests.",
      });
    }
    if (!req.file) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "An image file is required to proceed with the deposit request.",
      });
    }
    const insertResult = await queryAsync(
      "INSERT INTO `deposit`(`user_name`, `balance`, `image`, `image_path`, `payment_type`, `paymethod_id`, `transaction_id`) VALUES (?,?,?,?,?,?,?)",
      [mobile, amount, req.file.filename, req.file.destination + '/', 'Deposit', deposit_id, transection_id]
    );
    if (insertResult) {
      res.status(200).json({
        error: false,
        status: true,
        message: "Add Deposit Request",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
app.post("/deposit-usdt-request", upload.single("image"), async (req, res) => {
  try {
    const { mobile, amount, deposit_id, transection_id, price_at_time, currency } = req.body;
    if (parseInt(amount) < 10) {
      return res.status(302).json({ error: true, status: false, message: "Minimum Balance Deposit is 10(USDT)." });
    }
    const depositExists = await queryAsync("SELECT * FROM `deposit` WHERE`user_name` = ? AND (`payment_type` = 'USDT' OR`payment_type` = 'Deposit') AND(`transaction_id` IS NOT NULL AND`transaction_id` != '') AND`status` = 'Pending'",
      [mobile]);
    if (depositExists.length > 0) {
      if (req.file) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: "A Deposit Request has already been submitted. Please check your requests.",
      });
    }
    if (!req.file) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "An image file is required for the deposit request.",
      });
    }
    const usdt = await queryAsync("SELECT * FROM `usdt` WHERE `status` = 'Y'");
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
      "INSERT INTO `deposit`(`user_name`, `balance`, `image`, `image_path`, `payment_type`, `cypto`, `transaction_id`, `currency`, `price_at_that_time`) VALUES (?,?,?,?,?,?,?,?,?)",
      [mobile, amount, req.file.filename, req.file.destination + '/', 'USDT', deposit_id, transection_id, currency, price_at_time]
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
});
app.post("/get-deposit-request", verifytoken, async (req, res) => {
  try {
    if (!req.body.mobile) {
      res.status(302).json({
        error: true,
        status: false,
        massage: "Mobile Number Required",
      });
    }
    const result = await queryAsync("SELECT cd.id,cd.user_name,cd.balance as amount,cd.image,cd.upi_id,cd.image_path,cd.reason,cd.price_at_that_time,cd.transaction_id,cd.payment_type, cd.status,pd.name,pd.upi_id,pd.qr_code,pd.number,pd.ac_holder_name,pd.ac_no,cd.bank_name as ubank_details, cd.ifsc_code as uifsc_code, cd.ac_no as uac_no, cd.ac_name as uac_holder_name, pd.ac_type,cd.currency, pd.ifsc_code,cd.cypto,pd.bank_name,pd.type,cd.date FROM `deposit` as cd LEFT JOIN `new_payment_details` as pd on cd.paymethod_id = pd.id where cd.`user_name` = ?;", [req.body.mobile]);
    if (result) {
      res.status(200).json({
        error: false,
        status: true,
        data: result,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: true,
      status: false,
      message: "Internal Server Error"
    });
  }
});

//Bank Details
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
});
app.post("/add-withdrawal-request", async (req, res) => {
  try {
    const { mobile, amount, pin } = req.body;
    if (!pin) {
      return res.status(302).json({ error: true, status: false, message: "You must provide the required secret code." });
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
        await queryAsync("INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`, `bank_name`, `ifsc_code`, `ac_no`, `ac_name`,`ac_type`) VALUES (?, ?, 'Withdrawal', ?, ?, ?, ?, ?)",
          [mobile, parseInt(amount), bank_name, ifsc_code, ac_no, ac_name, ac_type]);
        await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)",
          [req.body.mobile, 'Withdrawal', `Withdrawal Amount Is ₹ ${parseInt(amount)} `, amount]);
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
});
app.post("/add-usdt-withdrawal-request", async (req, res) => {
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
    await queryAsync("INSERT INTO `deposit`(`user_name`, `balance`, `payment_type`, `price_at_that_time`, `cypto`, `currency`) VALUES (?, ?, 'USDT', ?, ?, ?)",
      [mobile, parseInt(amount), price_at_time, address, currency]);
    await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)",
      [req.body.mobile, 'USDT', `Withdrawal Amount Is ${parseInt(amount)} * ${parseInt(price_at_time)} = ₹ ${parseInt(amount) * parseInt(price_at_time)}`, parseInt(amount) * parseInt(price_at_time)]);
    return res.status(200).json({ error: false, status: true, message: "Added withdrawal Request Successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});
app.post("/decline-withdrawal-request", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `deposit` WHERE `payment_type` = 'Withdrawal' AND `id` = ?;", [req.body.id]);
    if (result.length > 0) {
      if (result[0].status == 'Cancelled') {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already Declined Withdrawal Request",
        });
      } if (result[0].status == 'Success') {
        res.status(302).json({
          error: true,
          status: false,
          massage: "Already SuccessFully Withdrawal",
        });
      } else {
        const updateResult = await queryAsync("UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Cancelled' WHERE `id` = ? AND `user_name` = ?",
          ['.', 'By User', req.body.id, req.body.mobile]);
        if (updateResult) {
          const walletUpdateResult = await queryAsync(
            "UPDATE `wallet` SET `winning_wallet` = winning_wallet + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?;",
            [req.body.id, req.body.mobile]);
          if (walletUpdateResult) {
            res.status(200).json({
              error: false,
              status: true,
              massage: "Wallet Update SuccessFully",
            });
          }
        }
      }
    } else {
      res.status(302).json({
        error: true,
        status: false,
        massage: "This is an withdrawal Request.you can't decline Deposit Request",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error"
    });
  }
});

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
});
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
                await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)', [mobile, 'Money Transfer', `Transfer To ${user_mobile}`, parseInt(amount)])
                await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)', [user_mobile, 'Money Transfer', `Transfer from ${mobile}`, parseInt(amount)])
                await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
                await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?", [parseInt(amount), user_mobile]);
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
});
app.post("/get-plans", async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `investment_plans`");
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
app.post("/get-statement", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `statement` where `number`=?", [req.body.mobile]);
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
app.post("/make-new-investment", verifytoken, async (req, res) => {
  try {
    const { mobile, plan, amount, pin } = req.body;
    if (parseInt(amount) <= 99) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Investsment amount must be at least 100 Rupees.",
      });
    }
    if (!mobile || !pin || !plan || !amount) {
      return res.status(400).json({
        error: true,
        status: false,
        message: !mobile ? "Mobile number is required" : !pin ? "Secret Pin is required" : !plan ? "Plan ID is required" : "Amount is required"
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
        const check = await queryAsync('SELECT * FROM `investment_plans` WHERE `id` = ?', [plan]);
        if (check.length == 0) {
          return res.status(302).json({
            error: true,
            status: false,
            message: "Plan Is not Found. Please Select Another Plan.",
          });
        } else {
          const owner = await queryAsync("SELECT w.* FROM `wallet` as w WHERE w.`user_name` = ?", [mobile]);
          if (parseInt(owner[0].wallet_balance) >= parseInt(amount)) {
            await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)', [mobile, 'Investment', '', parseInt(amount)])
            await queryAsync("UPDATE `wallet` as w SET w.`wallet_balance` = w.`wallet_balance` - ? WHERE w.`user_name` = ?", [parseInt(amount), mobile]);
            await queryAsync("INSERT INTO `buy_plan`(`user_id`, `plan_id`, `amount`,`expire_date`) VALUES ((SELECT ud.`id` FROM `user_details` as ud WHERE ud.`mobile` = ?), ?, ?,(SELECT DATE_ADD(CURDATE(), INTERVAL (SELECT `day_count` FROM `investment_plans` WHERE `id` = ?) DAY)))", [mobile, plan, amount, plan]);
            return res.status(200).json({
              error: false,
              status: true
            });
          } else {
            return res.status(302).json({
              error: true,
              status: false,
              message: "Insufficient wallet balance. Transfer cannot be completed.",
            });
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
});
app.post("/get-investment-plan", async (req, res) => {
  try {
    const result = await queryAsync(`SELECT bp.id, bp.amount, ip.plan_name,ip.title,ip.day_count, ip.times, ip.percentage, bp.status, bp.date FROM buy_plan AS bp INNER JOIN investment_plans AS ip ON bp.plan_id = ip.id WHERE bp.user_id = (SELECT ud.id FROM user_details AS ud WHERE ud.mobile = ?);`, [req.body.mobile]);
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
});
app.post("/color-money-transfer", verifytoken, async (req, res) => {
  try {
    const { mobile, amount, pin, type } = req.body;
    const check = await queryAsync('SELECT * FROM `user_pin` WHERE `user_id` = (SELECT ud.id FROM `user_details` as ud WHERE ud.`mobile` = ?)', [mobile]);
    if (!check.length) return res.status(302).json({ error: true, status: false, message: "Secret PIN not found. Please create your PIN to proceed." });
    if (!bcrypt.compareSync(pin, check[0].pin)) return res.status(302).json({ error: true, status: false, message: "Incorrect PIN. Please enter the correct PIN." });

    const owner = await queryAsync("SELECT * FROM `wallet` WHERE `user_name` = ?", [mobile]);
    const checkwallet = await queryAsync2("SELECT * FROM `wallet` WHERE `user_name` = ?", [mobile]);
    if (!checkwallet.length) await queryAsync2("INSERT INTO `wallet`(`user_name`, `wallet_balance`) VALUES (?,'0')", [mobile]);

    if (type == '1') {
      if (parseInt(owner[0].wallet_balance) < parseInt(amount)) return res.status(302).json({ error: true, status: false, message: "Insufficient wallet balance." });
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)', [mobile, 'Money Transfer', `Sent To ColorGame`, parseInt(amount)]);
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
      await queryAsync2("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
      return res.status(200).json({ error: false, status: true, message: "Transfer successful." });
    }
    if (type == '2') {
      const colorGameBalance = await queryAsync2("SELECT * FROM `wallet` WHERE `user_name` = ?", [mobile]);
      if (parseInt(colorGameBalance[0].wallet_balance) < parseInt(amount)) return res.status(302).json({ error: true, status: false, message: "Insufficient balance in ColorGame." });
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,?)', [mobile, 'Money Transfer', `Received from ColorGame`, parseInt(amount)]);
      await queryAsync2("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` - ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + ? WHERE `user_name` = ?", [parseInt(amount), mobile]);
      return res.status(200).json({ error: false, status: true, message: "Transfer successful." });
    }
    return res.status(302).json({ error: true, status: false, message: "Invalid transfer type." });

  } catch (err) {
    console.log(err);

    res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});



async function sendMail(name, email, mobile, message) {
  try {
    let mailOptions2 = {
      from: 'developercreazy@gmail.com',
      // from: 'otp2@earnkrobharat.com',
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
async function reffer(ba, ab) {
  try {
    await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
  } catch (error) {
    throw error;
  }
}
async function reffer1(ba, ab) {
  try {
    await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
  } catch (error) {
    throw error;
  }
}
async function reffer2(ba, ab) {
  try {
    const level1 = await queryAsync("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab]);
    if (level1[0].ref == '') {
      await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      const level2 = await queryAsync("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref]);
      if (level2[0].reff == '') {
        await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
      } else {
        await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
      }
    }
  } catch (error) {
    throw error;
  }
}
async function reffer3(ba, ab) {
  try {
    const level1 = await queryAsync("SELECT IFNULL(ud.`reffer_by`, 0) as ref FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [ab]);
    if (level1[0].ref == '') {
      await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`) VALUES (?,?)', [ba, ab]);
    } else {
      const level2 = await queryAsync("SELECT IFNULL(ud.`reffer_by`, 0) as reff FROM `user_details` as ud WHERE ud.`reffer_code` = ?", [level1[0].ref]);
      if (level2[0].reff == '') {
        await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`) VALUES (?,?,?)', [ba, ab, level1[0].ref]);
      } else {
        await queryAsync('INSERT INTO `user_level`(`user_reffral`, `level_1`, `level_2`, `level_3`) VALUES (?,?,?,?)', [ba, ab, level1[0].ref, level2[0].reff]);
      }
    }
  } catch (err) {
    throw err;
  }
}
async function reffer_bonus(ba) {
  try {
    const result1 = await queryAsync("SELECT IFNULL(ul.`level_1`,0) as level_1,IFNULL(ul.`level_2`,0) as level_2,IFNULL(ul.`level_3`,0) as level_3 FROM `user_level` as ul WHERE ul.user_reffral = (SELECT ud.`reffer_code` FROM `user_details` as ud WHERE ud.`mobile` = ?);", [ba]);
    if (result1) {
      let a = Object.values(result1[0]);
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        const resultt1 = await queryAsync("SELECT COUNT(*) as c FROM `buy_plan` WHERE `user_id` = (select mobile from user_details where reffer_code = ?) and `plan_id` != '1'", [element]);
        if (resultt1[0].c > 0) {
          await queryAsync(`UPDATE user_level as ul SET ul.status${index + 1} = 'Success' WHERE ul.user_reffral = (SELECT reffer_code FROM user_details as ud WHERE ud.mobile = ?)`, [ba]);
          await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + (SELECT `price` FROM `level` WHERE `name` = ? UNION ALL SELECT 0 FROM DUAL WHERE NOT EXISTS(SELECT`price` FROM`level` WHERE`name` = ?)) WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)", [index + 1, index + 1, element]);
        }
      }
    }
  } catch (error) {
    throw error;
  }
}

async function aaaa(){
  let aaa = await coded();
  console.log(aaa);
}
// console.log(aaaa());

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

cron.schedule('0 0 * * *', async () => {
  console.log('running a task every day at 12:00 AM');
  await queryAsync("UPDATE `buy_plan` SET `status`='expire' WHERE `status` = 'ongoing' and `expire_date` < CURRENT_DATE()");
});
module.exports = app;