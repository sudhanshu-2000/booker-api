const express = require("express");
const app = express.Router();
const { con, queryAsync } = require('../db/conn');
const multer = require("multer");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const path = require('path');
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
const verifytoken = require('../middle/admin-auth')
const cron = require('node-cron');
app.use(cors());
const https = require('https');
const axios = require('axios');
app.use(bodyParser.json({ limit: "50mb" }));
const Joi = require('joi');
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 5000,
}));
SECRET_KEY_SUPERADMIN = '5e0+&:e3%bcc4<f7:1f%.08x4-9:a8$*$&?&a9_a46c!2.:<^b&^f?4*&7a*>b!.f:_7>8:c-77@>&4*@3_e4,-f:$93?0$-,+*.&4c%1*d$<_481_,-_>4:0@&5e@*615bc54*!2.8cc679>319%.+:!b562>a4,@7$eaad?1!e!3:-c25f+d^a%$%0e7^^ef1c,5&.5d3%@b&&<?!&.4@27:>_-+$@3+911&7&0$9^,.4c,3:8d:c6a39!.?!7a$@%16*d&7187?<*0.,6%2!da9-f<81ca+>5@>_.5<+d,*_!@+<e.-8++ed&,b95-!.?2_&3$97587,:.&5$:*83045!&^23?b:89c-?6>0^f,<4fb&<2*b39?>!c4_d2!8,,d>2e!4?.&3<3e34@<4087>f3:>&08.b@%,!-!2ced9a9e.?a-$&+48<ee.e+<0d!c71?5*5.e8$605>@c!9bd<?b:5:_<_+c:*4*f83,5c4<:&0*b&e8d7fdc,bebd92f-cf?:59_+5c&1$%-<9bc_3+28+@+3&4!?8!2@<?*-d>7170-+?43b3.a9%4,+8>_?@5:+^8^2c@+1bd99aa346*c185c.9*,e36fa&0,%b>:d2!+?6624%,-6_7_8:23?4*4c&-add+26@52229+5^*b>c._0-d0*bc*_@be6a+_f8$aa854!3$a,a^.@10<f.>+@:1::.fa,68010a<f-@e60_8f9:55d>62f@+!:18!@a-,c@+9>>8?<5bd<1--8e163_156%&d_%32*,40-*02$+165_-*&.5!82_5d^a,_!96e_3*+31<&>--?c4a%a7+?>6*,<:-?e:+2$8<?%e+&*d78%_@e>2>1.!48ca$^8+%3b>6$+@-&*&,0&$c054_d7&4-!d7d._:>&81-41:<1d,f0aa2:4a?8_>?,f1_,&77+!7&!9d^@_e?02$d69^-a__3bc2,@1<%.4e0$7&f>3?&1c03e9+a-+b9*7?d$eb$>3>%c!b<.';
SECRET_KEY_ADMIN = '%35ea7>+bc3c+b4-b42+9@!-e%5.:e3>xf$:50%>95>!4c3^$*68!6+3>@2@_b9$^1*6!0<%a6?-.5_0c,1:29d<,--!0?->ce!5ba3d!3&b_9&_3$*e_8a:%,>?&2.d_0-f2e$_:96%9429-:3c!?d4!48.4f7@-0^6-53_?f555>>a$>8e,:-c++%:d_&83&%*a9%e_130:_!98:-@-$0?2!1c9$d<9*@58e^%+e77caf?b8!1+%?%a.^9@&-&c!@c!3&_117+&%&_7<9%&.@,e_56:a1!9519%.&e.e%_@02_2^!.5882%.&a%07+f6_322?_d<4+3>@:6-_!c+e0*%cc$0-4!0a!a.,^6@1*^9a8+1fa%6%%32$@668-5a$%*.^f712*$4*^180,,3a,?ac3e69@3a*f^+^,b509*&.a6%07be:5_+$.%b1:9323^+1+^+1a:-%0ecfa7!?2?1:6:!1+44%980.!+fdce,,!^53^9+:-9fd22+0d@:^e&&d1^33387-2c2,@@<2_e@f1@65^0c_e83%?.2.b8?<7&?&-+-e$*a7.42$.?e?<fd?>*b2b%c4,8>ab5>9<e-8d!:b567!dd+3&$>&9:fe$d773%!ee<9<*@97@-&3c3%93?c5&+6^f0e,!<-<,958+d+5$,f3634.+9>%*2?b6?9+c:4%_<7!^@%5.21f26edd,5_<%c_,>17&e4>@4b&,:&_!a1a?b::!:1*>_?3-?ec+1:e!-_e6@>ec6299_6<!-$841b08^7-<a&4f?880e:%4@a$*1?f61-&3$d,e^.,%5*c7*>&a-1_@1b0@?08^,?<:+97>*4%e9d8-5>361$-c3b$-*+b,%6d7f90!6a-c?*d&a&:&+&12!2<<7ba>6&^.>:c$_,a8&e4$<e93.*a,88+b-b.>_:*+<-2?*d*_^^2d7+:@?7f!b6*.*2:a:-18b7d+d@4a5800,&_<c46:9&2d?30f:281^d,^b.@-7^a3&^c+@^%f6';
app.use("../../assets", express.static("assets"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "image") {
      cb(null, "assets/img");
    } else {
      cb(new Error("Invalid field name"), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 25 * 1024 * 1024,
    fieldSize: 50 * 1024 * 1024,
    fields: 10,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
    }
  },
});

app.post("/login", async (req, res) => {
  try {
    const roleResult = await queryAsync("select (select name from role where id = role_id) as role from role_assign where user_id = (SELECT id FROM `login` where `username` = ?);", [req.body.username]);
    if (roleResult.length > 0) {
      const role = roleResult[0].role;
      const loginResult = await queryAsync("select * from login where username = ?", [req.body.username]);
      if (loginResult[0] != null) {
        const match = bcrypt.compareSync(req.body.password, loginResult[0].password);
        if (match) {
          const secretKey = role === "Super Admin" ? SECRET_KEY_SUPERADMIN : SECRET_KEY_ADMIN;
          const token = await new Promise((resolve, reject) => {
            jwt.sign(
              { username: loginResult[0].username },
              secretKey,
              { expiresIn: '3h' },
              (err, token) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(token);
                }
              }
            );
          });
          await queryAsync("UPDATE `login` SET `is_active` = 'Y' WHERE `username` = ?", [req.body.username]);
          res.status(200).json({
            status: true,
            username: loginResult[0].username,
            token,
          });
        } else {
          res.status(401).send("Username And Password is Wrong!");
        }
      } else {
        res.status(404).send("Username does not exist");
      }
    } else {
      res.status(404).json({
        error: true,
        status: false,
        message: "This user is not assigned a role"
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
app.post("/logout", async (req, res) => {
  try {
    const result = await queryAsync("UPDATE `login` SET `is_active` = 'N' WHERE `username` = ?", [req.body.username]);
    if (result) {
      res.status(200).send({ error: false, status: true });
    }
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: err.message });
  }
});
app.post("/change", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync(
      "select * from login where username = ?",
      [req.body.username]
    );
    if (result.length > 0) {
      const status = bcrypt.compareSync(
        req.body.password,
        result[0].password
      );
      if (status) {
        const hash = bcrypt.hashSync(
          req.body.new_password,
          bcrypt.genSaltSync(12)
        );
        const updateResult = await queryAsync(
          "UPDATE `login` SET `password` = ? WHERE `username` = ?",
          [hash, req.body.username]
        );
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
      res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
app.get("/get-map", verifytoken, async (req, res) => {
  try {
    const sql =
      "SELECT module.module_name AS name from module JOIN activity_maping ON module.id = activity_maping.show_manu";
    const result = await queryAsync(sql);
    res.send(result);
  } catch (err) {
    res.status(500).send("An error occurred while retrieving the map.");
  }
});


app.post("/add-admin", verifytoken, async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const module = await queryAsync(
      "select m.module_name FROM assign_module as am INNER join module as m on am.module = m.id WHERE am.role = (select role_id from role_assign where user_id = (SELECT id FROM `login` where `username` = ?))",
      [req.body.username]
    );
    if (!module || !module.length) {
      return res.status(403).send({ error: true, status: false, message: 'You are not capable to create Admin' });
    }
    const f = module.find(element => element.module_name == 'Sub-Admin');
    if (!f) {
      return res.status(403).send({ error: true, status: false, message: 'You are not capable to create Admin' });
    }
    const result = await queryAsync("select * from login where username = ?", [req.body.nusername]);
    if (result && result.length > 0) {
      return res.status(302).send("Username already exists");
    }
    const insertLogin = await queryAsync(
      "INSERT INTO `login`(`name`, `username`, `password`) VALUES (?,?,?)",
      [req.body.name, req.body.nusername, hash]
    );
    if (insertLogin) {
      await queryAsync(
        "INSERT INTO `role_assign`(`role_id`, `user_id`) VALUES (?, (select `id` from login where username = ?))",
        [req.body.role, req.body.nusername]
      );
      res.status(200).send({ error: false, status: true, message: 'New Admin Created Successfully' });
    }
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: 'Internal Server Error' });
  }
});
app.post("/update-admin", verifytoken, async (req, res) => {
  try {
    const module = await queryAsync("SELECT m.module_name FROM assign_module AS am INNER JOIN module AS m ON am.module = m.id WHERE am.role = (SELECT role_id FROM role_assign WHERE user_id = (SELECT id FROM `login` WHERE `username` = ?))", [req.body.username]);
    if (module) {
      const arr = module;
      const f = arr.find(element => element.module_name == 'Sub-Admin');
      if (f === undefined) {
        return res.status(403).send({ error: true, status: false, message: 'You are not capable to create Admin' });
      }
      const check = await queryAsync("SELECT `id` FROM `login` WHERE `username` = ?", [req.body.nusername]);
      if (check.length > 0) {
        if (check[0].id == req.body.id) {
          await queryAsync("UPDATE `login` SET `username` = ?, `name` = ? WHERE `id` = ?", [req.body.nusername, req.body.name, req.body.id]);
          await queryAsync("UPDATE `role_assign` SET `role_id` = ? WHERE `user_id` = ?", [req.body.role, req.body.id]);
          return res.status(200).send({ error: false, status: true, message: 'Admin details updated successfully' });
        } else {
          return res.status(302).send({ error: true, status: false, message: 'Username already exists' });
        }
      } else {
        await queryAsync("UPDATE `login` SET `username`= ?,`name`= ? WHERE `id` = ?", [req.body.nusername, req.body.name, req.body.id]);
        await queryAsync("UPDATE `role_assign` SET `role_id` = ? WHERE `user_id` = ?", [req.body.role, req.body.id]);
        return res.status(200).send({ error: false, status: true, message: 'Admin details updated successfully' });
      }
    }
  } catch (err) {
    return res.status(500).send({ error: true, status: false, message: 'Internal server error' });
  }
});
app.post("/get-admin", verifytoken, async (req, res) => {
  try {
    const sql = "SELECT l.id, l.name, l.username, (IFNULL((select role.display_name FROM role WHERE role.id = ra.role_id), 'Not Assign')) as role, l.date,l.is_active, l.status FROM `login` as l LEFT JOIN role_assign as ra on l.id = ra.user_id;";
    const result = await queryAsync(sql);
    res.status(200).send({ error: false, status: true, data: result });
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: err.message });
  }
});
app.post("/del-admin", verifytoken, async (req, res) => {
  try {
    const deleteRoleAssignResult = await queryAsync("DELETE FROM `role_assign` WHERE `user_id` = ?", [req.body.id]);
    if (deleteRoleAssignResult.affectedRows > 0) {
      const deleteLoginResult = await queryAsync("DELETE FROM `login` WHERE `id` = ?", [req.body.id]);

      if (deleteLoginResult.affectedRows > 0) {
        res.status(200).send({ error: false, status: true, message: 'Your Admin has been Deleted Successfully' });
      } else {
        res.status(404).send({ error: true, status: false, message: 'Admin not found' });
      }
    } else {
      const deleteLoginResult = await queryAsync("DELETE FROM `login` WHERE `id` = ?", [req.body.id]);
      if (deleteLoginResult.affectedRows > 0) {
        res.status(200).send({ error: false, status: true, message: 'Your Admin has been Deleted Successfully' });
      } else {
        res.status(404).send({ error: true, status: false, message: 'Admin not found' });
      }
    }
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: 'An error occurred while deleting the admin', details: err.message });
  }
});


app.post("/get-user", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `user_details`");
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.post("/del-user", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("DELETE FROM `user_details` WHERE `id` = ?", [req.body.id]);
    res.status(200).send({ error: false, status: true, message: 'Your User has been Deleted Successfully' });
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: 'An error occurred while deleting the user' });
  }
});
app.post("/update-user-password", verifytoken, async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    const userupdate = await queryAsync("UPDATE `user_details` SET `password`=? WHERE `email` = ?", [hashedPassword, req.body.id]);
    if (userupdate) {
      res.status(200).send({ error: false, status: true });
    }
  } catch (error) {

  }
})
app.post("/get-user-statement", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `statement` where `number`=? ORDER BY `statement`.`id` ASC", [req.body.id]);
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true, status: false, message: 'Internal Server Error' });
  }
})
app.post("/get-wallet-statement", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `game_statement` where `username`=? ORDER BY `game_statement`.`id` ASC", [req.body.id]);
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true, status: false, message: 'Internal Server Error' });
  }
})
app.post("/status-user", verifytoken, async (req, res) => {
  try {
    await queryAsync(
      "UPDATE `user_details` SET `status` = ? WHERE `id` = ?",
      [req.body.status, req.body.id]
    );
    res.status(200).send(true);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
app.post("/get-total-data", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync(
      "SELECT (SELECT IFNULL(COUNT(*), 0) FROM user_details) AS total_user, (SELECT IFNULL(COUNT(*), 0) FROM user_details WHERE is_active = 'Y') AS active_user"
    );
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
app.post("/get-menu", verifytoken, async (req, res) => {
  try {
    const roleResult = await queryAsync(
      "SELECT role_id FROM role_assign WHERE user_id = (SELECT id FROM `login` WHERE `username` = ?);",
      [req.body.username]
    );
    if (roleResult.length > 0) {
      const menuResult = await queryAsync(
        "SELECT am.id, m.module_name, m.child, m.toggle, m.url, am.status, am.date FROM assign_module AS am INNER JOIN module AS m ON am.module = m.id WHERE role = ? ORDER BY am.position ASC;",
        [roleResult[0].role_id]
      );
      menuResult.forEach(x => {
        x.child = JSON.parse(x.child);
      });
      res.status(200).json({
        error: false,
        status: true,
        data: menuResult
      });
    } else {
      res.status(404).json({
        error: true,
        status: false,
        message: "This user is not assigned a role"
      });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

app.post("/get-bank-details", verifytoken, async (req, res) => {
  try {
    let query = "SELECT ubd.*,ud.username, ud.mobile FROM `userbankdeatils` as ubd INNER JOIN user_details as ud on ubd.user_id = ud.id";
    let queryParams = [];
    if (["P", "Y", "F"].includes(req.body.status)) {
      query += " WHERE `status` = ?";
      queryParams.push(req.body.status);
    }
    const result = await queryAsync(query, queryParams);
    res.status(200).send({ error: false, status: true, data: result });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});
app.post("/approve-bank-details", verifytoken, async (req, res) => {
  await queryAsync("UPDATE `user_details` SET `bank_status`='Y' WHERE `id` = ?", [req.body.id])
  await queryAsync("UPDATE `userbankdeatils` SET `status`='Y',`approved_or_denied_by`=? WHERE `user_id` = ?", [req.body.username, req.body.id])
  res.status(200).send({
    error: false,
    status: true,
    massage: "Approved Bank SuccessFully",
  });
});
app.post("/decline-bank-details", verifytoken, async (req, res) => {
  await queryAsync("UPDATE `user_details` SET `bank_status`='F' WHERE `id` = ?", [req.body.id])
  await queryAsync("UPDATE `userbankdeatils` SET `status`=?,`reason`=?,`approved_or_denied_by`=? WHERE `user_id` = ?", ["F", req.body.reason, req.body.username, req.body.id],)
  res.status(200).send({
    error: false,
    status: true,
    massage: "Decline Bank Details!",
  });
});


app.post("/add-role", verifytoken, async (req, res) => {
  try {
    const { name, display_name, delete_d, update_d, add_d, status_d } = req.body;
    const missingFields = [];
    if (!name) missingFields.push('Role name');
    if (!display_name) missingFields.push('Display name');
    if (missingFields.length) {
      return res.status(400).json({ error: true, message: `${missingFields.join(', ')} is/are required` });
    }
    const existingRoles = await queryAsync("SELECT * FROM role WHERE display_name = ?", [display_name]);
    if (existingRoles.length > 0) {
      return res.status(400).json({ error: true, message: 'Display name already exists' });
    }
    await queryAsync(
      "INSERT INTO `role`(`name`, `display_name`, `view`, `delete_d`, `update_d`, `add_d`, `status_d`) VALUES (?,?,?,?,?,?,?)",
      [name, display_name, 'true', delete_d.toString(), update_d.toString(), add_d.toString(), status_d.toString()]
    );
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: 'An error occurred while adding the role' });
  }
});
app.post("/get-role", verifytoken, async (req, res) => {
  try {
    const roles = await queryAsync("select * from role");
    res.status(200).json({ data: roles });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: 'An error occurred while retrieving the roles',
    });
  }
});
app.post("/status-role", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `role` SET `status`= ? WHERE `id` = ?", [req.body.status, req.body.id]);
    res.status(200).send({ error: false, status: true });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});
app.post("/update-role", verifytoken, async (req, res) => {
  try {
    const { name, dname, delete_d, update_d, add_d, status_d, id } = req.body;
    const missingFields = [];
    if (!name) missingFields.push('Role name');
    if (!dname) missingFields.push('Display name');
    if (!id) missingFields.push('Role ID');
    if (missingFields.length) {
      return res.status(400).json({ error: true, message: `${missingFields.join(', ')} is/are required` });
    }
    const result = await queryAsync(
      "UPDATE `role` SET `name` = ?, `display_name` = ?, `view` = ?, `delete_d` = ?, `update_d` = ?, `add_d` = ?, `status_d` = ? WHERE `id` = ?",
      [name, dname, 'true', delete_d.toString(), update_d.toString(), add_d.toString(), status_d.toString(), id]
    );
    if (result) {
      res.status(200).send({ error: false, status: true });
    } else {
      res.status(404).json({ error: true, message: 'Role not found' });
    }
  } catch (err) {
    res.status(500).send({ error: true, message: 'An error occurred while updating the role' });
  }
});

app.post("/del-role", verifytoken, async (req, res) => {
  try {
    const value = await queryAsync('SELECT * FROM `assign_module` WHERE `role` = ?', req.body.id);
    if (value.length == 0) {
      const result = await queryAsync("DELETE FROM `role` where `id` = ?", [req.body.id]);
      if (result) {
        res.status(200).json({ error: false, status: true });
      }
    } else {
      res.status(302).json({
        error: true,
        status: false,
        message: "This role is already assigned and cannot be deleted."
      });
    }
  } catch (error) {
    res.status(500).send({ error: true, status: false, message: 'Internal Server Error' });
  }
});
app.post("/get-role-not-assign", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM role WHERE role_assign = 'N'");
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});
app.post("/get-role-assign", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM role WHERE role_assign = 'Y'");
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});


app.post("/add-module", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("select * from module where module_name = ?", [req.body.module_name]);
    if (result.length == 0) {
      // if (req.body.array.length == 0) {
      await queryAsync("INSERT INTO `module`(`url`, `module_name`) VALUES (?,?)", [req.body.url, req.body.module_name]);
      // } else {
      //   await queryAsync(
      //     "INSERT INTO `module`(`url`, `module_name`, `toggle`, `child`) VALUES (?,?,?,?)",
      //     [req.body.url, req.body.module_name, 'false', JSON.stringify(req.body.array)]
      //   );
      // }
      res.status(200).send(true);
    } else {
      res.status(200).send("Module name already exists");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/get-module", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("select * from `module`");
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/status-module", verifytoken, async (req, res) => {
  try {
    await queryAsync(
      "UPDATE `module` SET `status` = ? WHERE `id` = ?",
      [req.body.status, req.body.id]
    );
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/get-module-id", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync(
      "select * from `module` where id = ?",
      [req.body.id]
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/update-module", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `module` SET `module_name` = ?, `url` = ? WHERE `id` = ?", [req.body.module_name, req.body.url, req.body.id]);
    res.status(200).send(true);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(403).send("Module name already exists");
    } else {
      res.status(500).send(err.message);
    }
  }
});
app.post("/del-module", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `module` where id = ?", [req.body.id]);
    res.status(200).send(true);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post("/assign-module", verifytoken, async (req, res) => {
  const { role_id, module } = req.body;
  const conn = con;
  try {
    for (const mod of module) {
      await queryAsync("INSERT INTO `assign_module`(`role`, `module`, `position`) VALUES (?,?,(SELECT MAX(m.`position`)+1 FROM `assign_module` as m))", [role_id, mod], conn);
    }
    await queryAsync("UPDATE `role` SET `role_assign` = 'Y' WHERE `id` = ?", [role_id], conn);
    res.status(200).json({
      error: false,
      status: true,
      message: "Module Assigned Successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
app.post("/get-assign-module", verifytoken, async (req, res) => {
  const { id } = req.body;
  const conn = con;
  try {
    const result = await queryAsync('SELECT am.id, m.module_name, r.display_name FROM `assign_module` am INNER JOIN module m ON am.module = m.id INNER JOIN role r ON am.role = r.id WHERE am.role = ? ORDER BY position', [id], conn);
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
app.post("/update-assign-module", verifytoken, async (req, res) => {
  const { role_id, module } = req.body;
  const conn = con;
  try {
    await queryAsync("DELETE FROM `assign_module` WHERE `role` = ?", [role_id], conn);
    const [{ max }] = await queryAsync('SELECT MAX(`position`) as max FROM `assign_module`', [], conn);
    let position = max + 1;
    for (const mod of module) {
      await queryAsync("INSERT INTO `assign_module`(`role`, `module`, `position`) VALUES (?,?,?)", [role_id, mod, position], conn);
      position += 1;
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Module Assign Updated Successfully"
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
app.post("/get-assign-module-id", verifytoken, async (req, res) => {
  const { id } = req.body;
  const conn = con;
  try {
    const result = await queryAsync('SELECT am.module FROM `assign_module` am INNER JOIN module m ON am.module = m.id INNER JOIN role r ON am.role = r.id WHERE am.role = ?', [id], conn);
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
app.post("/update-position", verifytoken, async (req, res) => {
  const { username, data } = req.body;
  const conn = con;
  try {
    const [{ role_id }] = await queryAsync("SELECT role_id FROM role_assign WHERE user_id = (SELECT id FROM `login` WHERE `username` = ?)", [username], conn);
    const role_result = await queryAsync("SELECT am.id, m.module_name, m.url, am.position, am.status, am.date FROM assign_module AS am INNER JOIN module AS m ON am.module = m.id WHERE role = ? ORDER BY am.position ASC", [role_id], conn);
    for (const item of data) {
      await queryAsync("UPDATE `assign_module` SET `position` = ? WHERE `id` = ?", [item.position, item.id], conn);
    }
    res.status(200).json({
      error: false,
      status: true
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});


app.post("/get-user-details", verifytoken, async (req, res) => {
  try {
    const sql = `SELECT ud.id AS id, ud.mobile, ud.username, ud.email, ud.uid, ud.reffer_by, ud.reffer_code, w.id AS wid, w.wallet_balance, ubd.account_no as ac_no, ubd.ifsc_code as ifsc,ubd.account_holder_name as ac_name,ubd.bankname as bank_name,ubd.account_type as ac_type,ud.status, ud.date FROM user_details AS ud INNER JOIN wallet AS w ON ud.mobile = w.user_name LEFT JOIN userbankdeatils AS ubd ON ubd.user_id = ud.id AND ud.status = 'Y' AND ubd.status = 'Y';`;
    const result = await queryAsync(sql);
    res.status(200).send({
      error: false,
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "An error occurred while fetching user details.",
    });
  }
});
app.post("/status-user-details", verifytoken, async (req, res) => {
  try {
    const sql = "UPDATE `user_details` SET `status` = ? WHERE `id` = ?";
    await queryAsync(sql, [req.body.status, req.body.id]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Status Changed Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "An error occurred while updating user status.",
    });
  }
});
app.post("/del-user-details", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `user_details` WHERE id = ?", [req.body.id]);
    await queryAsync("DELETE FROM `wallet` WHERE id = ?", [req.body.wid]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Your Details have been deleted.",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "An error occurred while deleting user details.",
    });
  }
});

app.post("/get-deposit-request", verifytoken, async (req, res) => {
  try {
    let query = "SELECT *,(SELECT ud.username from user_details as ud where ud.mobile = cd.user_name) as uname FROM `deposit` as cd WHERE cd.transaction_id IS NOT NULL;";
    if (req.body.status === "Pending") {
      query += " AND cd.`status` = 'Pending'";
    } else if (req.body.status === "Success") {
      query += " AND cd.`status` = 'Success'";
    } else if (req.body.status === "Cancelled") {
      query += " AND cd.`status` = 'Cancelled'";
    }
    const result = await queryAsync(query, []);
    res.status(200).json({
      error: false,
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
// app.post("/approve-deposit-request", verifytoken, async (req, res) => {
//   const { id, username, mobile } = req.body;
//   if (!id || !username || !mobile) {
//     return res.status(400).json({ error: true, message: "Invalid input data" });
//   }
//   try {
//     const deposit = await queryAsync("SELECT * FROM `deposit` WHERE `id` = ?", [id]);
//     if (!deposit.length) {
//       return res.status(404).json({ error: true, message: "Deposit not found" });
//     }
//     if (deposit[0].status !== "Pending") {
//       return res.status(302).json({
//         error: true,
//         status: false,
//         message: "Deposit request is already updated",
//       });
//     }
//     await queryAsync(
//       "UPDATE `deposit` SET `status` = 'Success', `Approved_declined_By` = ? WHERE `id` = ?",
//       [username, id]
//     );
//     const referral = await queryAsync(
//       "SELECT * FROM `user_reffer` WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)",
//       [mobile]
//     );
//     if (referral.length && referral[0].status === "N") {
//       await queryAsync(
//         "UPDATE `user_reffer` SET `status` = 'Y' WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)",
//         [mobile]
//       );
//       const referralBonus = await queryAsync(
//         "SELECT `reffer_to`, `reffer_by` FROM `reffer_bonus` WHERE `status` = 'Y'"
//       );
//       if (referralBonus.length > 0) {
//         const { reffer_to, reffer_by } = referralBonus[0];
//         await queryAsync(
//           "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = ?",
//           [reffer_by, mobile]
//         );
//         await queryAsync(
//           "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)",
//           [reffer_to, referral[0].reffer_to]
//         );
//         await queryAsync(
//           `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
//            VALUES (?, ?, ?, ?, (SELECT wallet_balance FROM wallet WHERE user_name = ?))`,
//           [mobile, "Referral Bonus", `Referred by ${referral[0].reffer_by}`, reffer_by, mobile]
//         );
//         await queryAsync(
//           `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
//            VALUES ((SELECT mobile FROM user_details WHERE reffer_code = ?), ?, ?, ?, 
//            (SELECT wallet_balance FROM wallet WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ?)))`,
//           [referral[0].reffer_to, "Referral Bonus", `Referred to ${mobile}`, reffer_to, referral[0].reffer_to]
//         );
//       }
//     }
//     const walletUpdateQuery =
//       deposit[0].payment_type === "USDT"
//         ? "UPDATE `wallet` SET `wallet_balance` = wallet_balance + (SELECT (`balance` * `price_at_that_time`) FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?"
//         : "UPDATE `wallet` SET `wallet_balance` = wallet_balance + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?";
//     await queryAsync(walletUpdateQuery, [id, mobile]);
//     const statementQuery = deposit[0].payment_type === "USDT"
//       ? `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
//          VALUES (?, ?, ?, (SELECT (\`balance\` * \`price_at_that_time\`) FROM \`deposit\` WHERE \`id\` = ?), 
//          (SELECT wallet_balance FROM wallet WHERE user_name = ?))`
//       : `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
//          VALUES (?, ?, ?, (SELECT \`balance\` FROM \`deposit\` WHERE \`id\` = ?), 
//          (SELECT wallet_balance FROM wallet WHERE user_name = ?))`;
//     await queryAsync(statementQuery, [mobile, "Deposit", `Approved by ${username}`, id, mobile, a]);
//     res.status(200).json({
//       error: false,
//       status: true,
//       message: "Wallet updated successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// })
app.post('/approve-deposit-request', verifytoken, async (req, res) => {
  const schema = Joi.object({ id: Joi.number().required(), username: Joi.string().alphanum().required(), mobile: Joi.string().regex(/^[0-9]{10}$/).required() });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: true, message: error.details[0].message });
  }
  const { id, username, mobile } = req.body;
  try {
    await queryAsync("START TRANSACTION");
    const deposit = await queryAsync("SELECT * FROM `deposit` WHERE `id` = ?", [id]);
    if (!deposit.length) {
      await queryAsync("ROLLBACK");
      return res.status(404).json({ error: true, message: "Deposit not found" });
    }
    if (deposit[0].status !== "Pending") {
      await queryAsync("ROLLBACK");
      return res.status(400).json({
        error: true,
        message: "Deposit request is already updated",
      });
    }
    await queryAsync(
      "UPDATE `deposit` SET `status` = 'Success', `Approved_declined_By` = ? WHERE `id` = ?",
      [username, id]
    );
    const referral = await queryAsync(
      "SELECT * FROM `user_reffer` WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)",
      [mobile]
    );
    if (referral.length && referral[0].status === "N") {
      await queryAsync(
        "UPDATE `user_reffer` SET `status` = 'Y' WHERE `reffer_by` = (SELECT `reffer_code` FROM `user_details` WHERE `mobile` = ?)",
        [mobile]
      );
      const referralBonus = await queryAsync(
        "SELECT `reffer_to`, `reffer_by` FROM `reffer_bonus` WHERE `status` = 'Y'"
      );
      if (referralBonus.length > 0) {
        const { reffer_to, reffer_by } = referralBonus[0];
        await queryAsync(
          "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = ?",
          [reffer_by, mobile]
        );
        await queryAsync(
          "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = (SELECT `mobile` FROM `user_details` WHERE `reffer_code` = ?)",
          [reffer_to, referral[0].reffer_to]
        );
        await queryAsync(
          `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
           VALUES (?, ?, ?, ?, (SELECT wallet_balance FROM wallet WHERE user_name = ?))`,
          [mobile, "Referral Bonus", `Referred by ${referral[0].reffer_by}`, reffer_by, mobile]
        );
        await queryAsync(
          `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
           VALUES ((SELECT mobile FROM user_details WHERE reffer_code = ?), ?, ?, ?, 
           (SELECT wallet_balance FROM wallet WHERE user_name = (SELECT mobile FROM user_details WHERE reffer_code = ?)))`,
          [referral[0].reffer_to, "Referral Bonus", `Referred to ${mobile}`, reffer_to, referral[0].reffer_to]
        );
      }
    }
    const walletUpdateAmount = deposit[0].payment_type === "USDT" ? deposit[0].balance * deposit[0].price_at_that_time : deposit[0].balance;

    await queryAsync(
      "UPDATE `wallet` SET `wallet_balance` = wallet_balance + ? WHERE `user_name` = ?",
      [walletUpdateAmount, mobile]
    );
    await queryAsync(
      `INSERT INTO \`statement\` (\`number\`, \`type\`, \`description\`, \`amount\`, \`balance\`)
       VALUES (?, ?, ?, ?, (SELECT wallet_balance FROM wallet WHERE user_name = ?))`,
      [mobile, "Deposit", `Approved by ${username}`, walletUpdateAmount, mobile]
    );
    await queryAsync("COMMIT");
    res.status(200).json({
      error: false,
      status: true,
      message: "Wallet updated successfully",
    });
  } catch (err) {
    await queryAsync("ROLLBACK");
    console.error(err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
app.post("/decline-deposit-request", verifytoken, async (req, res) => {
  try {
    const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
    if (checkusdt[0].status == 'Pending') {
      await queryAsync("UPDATE `deposit` SET `status` = ?, `reason` = ?, `Approved_declined_By` = ? WHERE `id` = ?", ["Cancelled", req.body.reason, req.body.username, req.body.id]);
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES ((SELECT `user_name` FROM `deposit` WHERE `id` = ?),?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ?),(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)))", [req.body.id, 'Deposit', `Decliend By ${req.body.username}`, req.body.id, req.body.id]);
      res.status(200).json({
        error: false,
        status: true,
        message: "Details updated successfully",
      });
    } else {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Deposit Request is already Updated",
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

app.post("/get-withdrawal-request-date", verifytoken, async (req, res) => {
  try {
    let query = "SELECT *,(SELECT ud.username from user_details as ud where ud.mobile = cd.user_name) as uname FROM `deposit` as cd WHERE cd.transaction_id IS NULL AND date BETWEEN ? AND ?";
    if (req.body.status === "Pending") {
      query += " AND cd.status = 'Pending'";
    } else if (req.body.status === "Success") {
      query += " AND cd.status = 'Success'";
    } else if (req.body.status === "Cancelled") {
      query += " AND cd.status = 'Cancelled'";
    }
    const result = await queryAsync(query, [req.body.start, req.body.end]);
    res.status(200).json({ error: false, status: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/get-withdrawal-request", verifytoken, async (req, res) => {
  try {
    let query = "SELECT *,(SELECT ud.username from user_details as ud where ud.mobile = cd.user_name) as uname FROM `deposit` as cd WHERE cd.transaction_id IS NULL ";
    if (req.body.status === "Pending") {
      query += " AND cd.status = 'Pending'";
    } else if (req.body.status === "Success") {
      query += " AND cd.status = 'Success'";
    } else if (req.body.status === "Cancelled") {
      query += " AND cd.status = 'Cancelled'";
    }
    const result = await queryAsync(query, []);
    res.status(200).json({ error: false, status: true, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/add-inprocess-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const { id, username, mobile } = req.body;
    const [check] = await queryAsync("SELECT * FROM `deposit` WHERE `id` = ?", [id]);
    if (!check) {
      return res.status(404).json({ error: true, status: false, message: "Request not found" });
    }
    switch (check.status) {
      case "Pending":
        await queryAsync(
          "UPDATE `deposit` SET `Approved_declined_By` = ?, `status` = 'Inprocess' WHERE `id` = ? AND `user_name` = ?",
          [username, id, mobile]
        );
        return res.status(200).json({
          error: false,
          status: true,
          message: "Set to Inprocess successfully",
        });
      case "Cancelled":
        return res.status(302).json({
          error: true,
          status: false,
          message: "Request already cancelled",
        });
      default:
        return res.status(302).json({
          error: true,
          status: false,
          message: "Request already processed successfully",
        });
    }
  } catch (error) {
    res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});
app.post("/add-rollback-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
    if (checkusdt[0].status === "Cancelled") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Already Declined Withdrawal Request",
      });
    } else if (checkusdt[0].status === "Success") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Already Successfully Withdrawal",
      });
    } else if (checkusdt[0].status === "Pending") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Please set the withdrawal request to 'In Process' before it can be Rollback.",
      });
    }
    await queryAsync("UPDATE `deposit` SET `Approved_declined_By` = '', `status` = 'Pending' WHERE `id` = ? AND `user_name` = ?", [req.body.id, req.body.mobile]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Rollback User Details Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});
app.post("/approve-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
    if (checkusdt[0].status === "Cancelled") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Already Declined Withdrawal Request",
      });
    } else if (checkusdt[0].status === "Success") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Already Successfully Withdrawal",
      });
    } else if (checkusdt[0].status === "Pending") {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Please set the withdrawal request to 'In Process' before it can be approved.",
      });
    }
    await queryAsync("UPDATE `deposit` SET `Approved_declined_By` = ?, `status` = 'Success' WHERE `id` = ? AND `user_name` = ?", [req.body.username, req.body.id, req.body.mobile]);
    if (checkusdt[0].payment_type == 'USDT') {
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,(SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE  `id` = ?),(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))", [req.body.mobile, 'USDT', `Approve By ${req.body.username}`, req.body.id, req.body.mobile]);
    } else {
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES (?,?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ? AND `user_name` = ?),(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = ?))', [req.body.mobile, 'Withdrawal', `Approve By ${req.body.username}`, req.body.id, req.body.mobile, req.body.mobile]);
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Approved User Details Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: true, status: false, message: "Internal Server Error" });
  }
});
app.post("/decline-withdrawal-request", verifytoken, async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM `deposit` WHERE `id` = ?";
    const result = await queryAsync(selectQuery, [req.body.id]);
    if (result.length > 0) {
      if (result[0].status === "Cancelled") {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Already Declined Withdrawal Request",
        });
      } else if (result[0].status === "Success") {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Already Successfully Withdrawal",
        });
      } else if (result[0].status === "Inprocess") {
        return res.status(302).json({
          error: true,
          status: false,
          message: "Please set the withdrawal request to 'Pending' before it can be decline.",
        });
      } else {
        const updateQuery = "UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Cancelled' WHERE `id` = ?";
        const updateParams = [req.body.reason, req.body.username, req.body.id];
        await queryAsync(updateQuery, updateParams);
        const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
        if (checkusdt[0].payment_type == 'USDT') {
          await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + (SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?) WHERE `user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)", [req.body.id, req.body.id]);
          await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES ((SELECT `user_name` FROM `deposit` WHERE `id` = ?),?,?,(SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?),(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)))", [req.body.id, 'Withdrawal', `Decliend By ${req.body.username}`, req.body.id, req.body.id]);
        } else {
          await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)", [req.body.id, req.body.id]);
          await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`,`balance`) VALUES ((SELECT `user_name` FROM `deposit` WHERE `id` = ?),?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ?),(select w.`wallet_balance` from `wallet` as w where  w.`user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)))", [req.body.id, 'Withdrawal', `Decliend By ${req.body.username}`, req.body.id, req.body.id]);
        }
        res.status(200).json({
          error: false,
          status: true,
          message: "Wallet Updated Successfully",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.post("/add-wagering", upload.single('image'), verifytoken, async (req, res) => {
  try {
    const { title, minimumrebetamount, monthyreward, levelreward } = req.body;
    if (!req.file) {
      return res.status(302).json({
        error: true,
        message: "Image is required",
      });
    }
    if (!title || !minimumrebetamount || !monthyreward || !levelreward) {
      if (req.file) {
        deleteImage(req.file.destination + '/' + req.file.filename);
      }
      return res.status(302).json({
        error: true,
        message: "All fields are required (title, minimumrebetamount, monthyreward, levelreward)",
      });
    }
    await queryAsync(
      "INSERT INTO `plans`(`title`, `bgimage`, `minimumrebetamount`, `monthyreward`, `levelreward`) VALUES (?,?,?,?,?)",
      [title, req.file.filename, minimumrebetamount, monthyreward, levelreward]
    );
    res.status(200).json({
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error:", err);
    if (req.file) {
      deleteImage(req.file.destination + '/' + req.file.filename);
    }
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
});
app.post("/status-wagering", verifytoken, async (req, res) => {
  try {
    await queryAsync(
      "UPDATE `plans` SET `status` = ? WHERE `id` = ?",
      [req.body.status, req.body.id]
    );
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/del-wagering", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `plans` WHERE `id` = ?", [req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/update-wagering", upload.single("image"), verifytoken, async (req, res) => {
  const { title, minimumrebetamount, monthyreward, levelreward, id } = req.body;
  if (!title || !minimumrebetamount || !monthyreward || !levelreward || !id) {
    return res.status(302).json({
      error: true,
      status: false,
      message: "All fields except image are required.",
    });
  }
  try {
    const results = await queryAsync("SELECT bgimage FROM plans WHERE id = ?", [id]);
    if (results.length === 0) {
      return res.status(302).json({
        error: true,
        status: false,
        message: "Record not found.",
      });
    }

    const oldImage = results[0].bgimage;

    const query = req.file
      ? `UPDATE plans SET title = ?, bgimage = ?, minimumrebetamount = ?, monthyreward = ?, levelreward = ? WHERE id = ?`
      : `UPDATE plans SET title = ?, minimumrebetamount = ?, monthyreward = ?, levelreward = ? WHERE id = ?`;

    const params = req.file
      ? [title, req.file.filename, minimumrebetamount, monthyreward, levelreward, id]
      : [title, minimumrebetamount, monthyreward, levelreward, id];

    // Update the record
    const updateResult = await queryAsync(query, params);

    if (updateResult.affectedRows > 0) {
      // Delete the old image if a new image was uploaded
      if (req.file && oldImage) {
        deleteImage(req.file.destination + `/${oldImage}`);
      }
      return res.status(200).json({
        error: false,
        status: true,
        message: "Update successful.",
      });
    }

    return res.status(302).json({
      error: true,
      status: false,
      message: "Record not found.",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (req.file) {
        deleteImage(req.file.destination + '/' + req.file.filename);
      }
      return res.status(302).json({
        error: true,
        status: false,
        message: "The title name already exists. Please choose a different one.",
      });
    }

    console.error("Error occurred:", err);
    return res.status(500).json({
      error: true,
      status: false,
      message: "Internal server error.",
    });
  }
});


app.post("/add-investment-plan", verifytoken, async (req, res) => {
  try {
    const { plan_name, amount_start, amount_end, retrun_percentage } = req.body;
    const existingPlan = await queryAsync("SELECT `plan_name` FROM `new_investment_plan` WHERE `plan_name` = ?", [plan_name]);
    if (existingPlan.length > 0) {
      return res.status(400).json({
        error: true,
        status: false,
        message: "Investment Plan already exists!",
      });
    }
    await queryAsync(
      "INSERT INTO `new_investment_plan`(`plan_name`, `amount_start`, `amount_end`, `retrun_percentage`) VALUES (?,?,?,?)",
      [plan_name, amount_start, amount_end, retrun_percentage]
    );
    res.status(200).json({
      error: false,
      status: true,
      message: "Investment Plan Added Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/update-investment-plan", verifytoken, async (req, res) => {
  try {
    const { plan_name, amount_start, amount_end, retrun_percentage, id } = req.body;
    const existingPlan = await queryAsync("SELECT `id` FROM `new_investment_plan` WHERE `id` = ?", [id]);
    if (existingPlan.length === 0) {
      return res.status(404).json({
        error: true,
        status: false,
        message: "Investment Plan not found!",
      });
    }
    const duplicatePlan = await queryAsync("SELECT `id` FROM `new_investment_plan` WHERE `plan_name` = ? AND `id` != ?", [plan_name, id]);

    if (duplicatePlan.length > 0) {
      return res.status(400).json({
        error: true,
        status: false,
        message: "Investment Plan with this name already exists!",
      });
    }
    await queryAsync(
      "UPDATE `new_investment_plan` SET `plan_name` = ?, `amount_start` = ?, `amount_end` = ?, `retrun_percentage` = ? WHERE `id` = ?",
      [plan_name, amount_start, amount_end, retrun_percentage, id]
    );
    res.status(200).json({
      error: false,
      status: true,
      message: "Investment Plan Updated Successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/status-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `new_investment_plan` SET `status` = ? WHERE `id` = ?", [req.body.status, req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/get-investment-plan", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `new_investment_plan`");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/del-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `new_investment_plan` WHERE `id` = ?", [req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

app.post("/get-payment-details", verifytoken, async (req, res) => {
  try {
    if (req.body.type == 'UPI') {
      const result1 = await queryAsync("SELECT * FROM `new_payment_details` WHERE `upi_id` IS NOT null");
      res.status(200).json({
        error: false,
        status: true,
        data: result1
      });
    } else if (req.body.type == 'Bank') {
      const result2 = await queryAsync("SELECT * FROM `new_payment_details` WHERE `upi_id` IS null");
      res.status(200).json({
        error: false,
        status: true,
        data: result2
      });
    } else if (req.body.type == 'USDT') {
      const result3 = await queryAsync("SELECT * FROM `usdt`");
      res.status(200).json({
        error: false,
        status: true,
        data: result3
      });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
})
app.post("/add-payment-details", upload.single("image"), verifytoken, async (req, res) => {
  const { type, name, number, upi, account_holder_name, account_no, bank_name, ifsc_code, account_type } = req.body;
  const qrCodeFile = req.file?.filename || null;
  try {
    let existingQuery, insertQuery, insertParams;
    if (upi) {
      existingQuery = "SELECT * FROM new_payment_details WHERE upi_id = ?";
      insertQuery = "INSERT INTO `new_payment_details`(`name`, `upi_id`, `qr_code`, `number`, `type`) VALUES (?,?,?,?,?)";
      insertParams = [name, upi, qrCodeFile, number, type];
    } else if (account_no) {
      existingQuery = "SELECT * FROM new_payment_details WHERE ac_no = ?";
      insertQuery = "INSERT INTO `new_payment_details`(`name`, `ac_no`, `ac_type`, `ifsc_code`, `bank_name`, `type`) VALUES (?,?,?,?,?,?)";
      insertParams = [account_holder_name, account_no, account_type, ifsc_code, bank_name, type];
    } else {
      if (qrCodeFile) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(400).json({ error: true, status: false, message: "Invalid input data" });
    }
    const existing = await queryAsync(existingQuery, [upi || account_no]);
    if (existing.length > 0) {
      if (qrCodeFile) deleteImage(req.file.destination + '/' + req.file.filename);
      return res.status(302).json({
        error: true,
        status: false,
        message: `${upi ? "UPI ID" : "Account Number"} already exists`,
      });
    }

    await queryAsync(insertQuery, insertParams);
    res.status(200).json({
      error: false,
      status: true,
      message: `${upi ? "UPI" : "Bank"} details added successfully`,
    });
  } catch (err) {
    if (qrCodeFile) deleteImage(req.file.destination + '/' + req.file.filename);
    console.error("Error occurred:", err);
    res.status(500).json({ error: true, status: false, message: "Internal server error" });
  }
}
);
app.post("/status-payment-details", verifytoken, (req, res) => {
  con.query(
    "UPDATE `new_payment_details` SET `status`=? WHERE `id`= ?",
    [req.body.method, req.body.id],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          error: false,
          status: true,
          massage: " Status Changed SuccessFully",
        });
      }
    }
  );
});
app.post("/del-payment-details", verifytoken, (req, res) => {
  con.query(
    "DELETE FROM `new_payment_details` where id=?",
    [req.body.id],
    (err, result) => {
      if (err) {
        if (true == (err.sqlMessage == "Cannot delete or update a parent row: a foreign key constraint fails (`colorgame`.`deposit`, CONSTRAINT `paymethod_id` FOREIGN KEY (`paymethod_id`) REFERENCES `payment_details` (`id`))")) {
          res.status(405).json({
            error: true,
            status: false,
            massage: "This payment method is already Used",
          });
        } else {
          throw err;
        }
      }
      else {
        res.status(200).json({
          error: false,
          status: true,
          massage: "Your file has been deleted.",
        });
      }
    }
  );
});


app.post("/add-reffer", verifytoken, async (req, res) => {
  try {
    const { reffer_to, reffer_by } = req.body;
    await queryAsync("INSERT INTO `reffer_bonus`(`reffer_to`, `reffer_by`) VALUES (?,?)", [reffer_to, reffer_by]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Reffer Added Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/update-reffer", verifytoken, async (req, res) => {
  try {
    const { reffer_to, reffer_by, id } = req.body;
    await queryAsync(
      "UPDATE `reffer_bonus` SET `reffer_to` = ?, `reffer_by` = ? WHERE `id` = ?",
      [reffer_to, reffer_by, id]
    );
    res.status(200).json({
      error: false,
      status: true,
      message: "Investment Plan Updated Successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/status-reffer", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `reffer_bonus` SET `status` = 'N' WHERE `status` = 'Y'");
    await queryAsync("UPDATE `reffer_bonus` SET `status` = ? WHERE `id` = ?", [req.body.status, req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/get-reffer", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `reffer_bonus`");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/del-reffer", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `reffer_bonus` WHERE `id` = ?", [req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

function deleteImage(imagePath) {
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) { return; }
    fs.unlink(imagePath, (err) => {
      if (err) { return; }
    });
  });
}

cron.schedule('0 8,15 * * *', async () => {
  try {
    const agent = new https.Agent({ family: 4 });
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=inr";
    const response = await axios.get(url, { httpsAgent: agent });
    if (response.data && response.data.tether && response.data.tether.inr) {
      const usdtPriceInInr = response.data.tether.inr;
      await queryAsync("UPDATE `usdt` SET `price` = ? WHERE `status` = 'Y'", [usdtPriceInInr]);
    } else {
      console.warn("USDT price not found in API response.");
    }
  } catch (error) {
    console.error("Error during cron job:", error);
  }
});
module.exports = app;