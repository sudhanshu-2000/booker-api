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
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
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
    const result = await queryAsync("SELECT * FROM `user`");
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.post("/del-user", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("DELETE FROM `user` WHERE `id` = ?", [req.body.id]);
    res.status(200).send({ error: false, status: true, message: 'Your User has been Deleted Successfully' });
  } catch (err) {
    res.status(500).send({ error: true, status: false, message: 'An error occurred while deleting the user' });
  }
});
app.post("/status-user", verifytoken, async (req, res) => {
  try {
    await queryAsync(
      "UPDATE `user` SET `status` = ? WHERE `id` = ?",
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
    let query = "SELECT *, ud.mobile FROM `userbankdeatils` as ubd INNER JOIN user_details as ud on ubd.user_id = ud.id";
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
  await queryAsync("UPDATE `user_details` SET `bank_status`='Y' WHERE `id` = (SELECT udd.`user_id` FROM `userbankdeatils` as udd WHERE udd.`id`=?)", [req.body.id])
  await queryAsync("UPDATE `userbankdeatils` SET `status`='Y',`approved_or_denied_by`=? WHERE `id` = ?", [req.body.username, req.body.id])
  res.status(200).send({
    error: false,
    status: true,
    massage: "Approved Bank SuccessFully",
  });
});
app.post("/decline-bank-details", verifytoken, async (req, res) => {
  await queryAsync("UPDATE `user_details` SET `bank_status`='F' WHERE `id` = (SELECT udd.`user_id` FROM `userbankdeatils` as udd WHERE udd.`id`=?)", [req.body.id])
  await queryAsync("UPDATE `userbankdeatils` SET `status`=?,`reason`=?,`approved_or_denied_by`=? WHERE `id` = ?", ["F", req.body.reason, req.body.username, req.body.id],)
  res.status(200).send({
    error: false,
    status: true,
    massage: "Decline Bank Details!",
  });
});


app.post("/add-role", verifytoken, async (req, res) => {
  try {
    const existingRoles = await queryAsync("select * from role where display_name = ?", [req.body.display_name]);
    if (existingRoles.length > 0) {
      return res.send("Display name is already exist");
    }
    await queryAsync(
      "INSERT INTO `role`(`name`, `display_name`, `view`, `delete_d`, `update_d`, `play_btn`) VALUES (?,?,?,?,?,?)",
      [req.body.name, req.body.display_name, req.body.view_d.toString(), req.body.delete_d.toString(), req.body.update_d.toString(), req.body.play_d.toString()]
    );
    res.status(200).json({
      error: false,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: 'An error occurred while adding the role',
    });
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
    await queryAsync("UPDATE `role` SET `name` = ?, `display_name` = ?, `view` = ?, `delete_d` = ?, `update_d` = ?, `play_btn` = ? WHERE `id` = ?",
      [req.body.name, req.body.dname, (req.body.view_d).toString(), (req.body.delete_d).toString(), (req.body.update_d).toString(), (req.body.play_d).toString(), req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
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
    let query = "SELECT cd.id,cd.user_name,cd.balance as amount,cd.image,cd.upi_id,cd.image_path,cd.`Approved_declined_By`,cd.reason,cd.price_at_that_time,cd.transaction_id,cd.payment_type, cd.status,pd.name,pd.upi_id,pd.qr_code,pd.number,pd.ac_holder_name,pd.ac_no,cd.bank_name as ubank_details, cd.ifsc_code as uifsc_code, cd.ac_no as uac_no, cd.ac_name as uac_holder_name, pd.ac_type,cd.currency, pd.ifsc_code,cd.cypto,pd.bank_name,pd.type,cd.date FROM `deposit` as cd LEFT JOIN `new_payment_details` as pd on cd.paymethod_id = pd.id WHERE cd.transaction_id IS NOT NULL;";
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
app.post("/approve-deposit-request", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `deposit` SET `status` = 'Success', `Approved_declined_By` = ? WHERE `id` = ?", [req.body.username, req.body.id]);
    const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
    if (checkusdt[0].payment_type == 'USDT') {
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = wallet_balance + (SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?", [req.body.id, req.body.mobile]);
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,(SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?))", [req.body.mobile, 'Deposit', `Approve By ${req.body.username}`, req.body.id]);
    } else {
      await queryAsync("UPDATE `wallet` SET `wallet_balance` = wallet_balance + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = ?", [req.body.id, req.body.mobile]);
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ?))', [req.body.mobile, 'Deposit', `Approve By ${req.body.username}`, req.body.id]);
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Wallet updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
app.post("/decline-deposit-request", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `deposit` SET `status` = ?, `reason` = ?, `Approved_declined_By` = ? WHERE `id` = ?", ["Cancelled", req.body.reason, req.body.username, req.body.id]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Details updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.post("/get-withdrawal-request", verifytoken, async (req, res) => {
  try {
    let query = "SELECT cd.id,cd.user_name,cd.balance as amount,cd.image,cd.upi_id,cd.image_path,cd.`Approved_declined_By`,cd.reason,cd.price_at_that_time,cd.transaction_id,cd.payment_type, cd.status,pd.name,pd.upi_id,pd.qr_code,pd.number,pd.ac_holder_name,pd.ac_no,cd.bank_name as ubank_details, cd.ifsc_code as uifsc_code, cd.ac_no as uac_no, cd.ac_name as uac_holder_name, pd.ac_type,cd.currency, pd.ifsc_code,cd.cypto,pd.bank_name,pd.type,cd.date FROM `deposit` as cd LEFT JOIN `new_payment_details` as pd on cd.paymethod_id = pd.id WHERE cd.transaction_id IS NULL;";
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
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/approve-withdrawal-request", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `deposit` SET `Approved_declined_By` = ?, `status` = 'Success' WHERE `id` = ? AND `user_name` = ?", [req.body.username, req.body.id, req.body.mobile]);
    const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
    if (checkusdt[0].payment_type == 'USDT') {
      await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,(SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE  `id` = ?))", [req.body.mobile, 'USDT', `Approve By ${req.body.username}`, req.body.id]);
    } else {
      await queryAsync('INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES (?,?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ? AND `user_name` = ?))', [req.body.mobile, 'Withdrawal', `Approve By ${req.body.username}`, req.body.id, req.body.mobile]);
    }
    res.status(200).json({
      error: false,
      status: true,
      message: "Approved User Details Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
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
          message: "Already Successfully Withdrawn",
        });
      } else {
        const updateQuery = "UPDATE `deposit` SET `reason` = ?, `Approved_declined_By` = ?, `status` = 'Cancelled' WHERE `id` = ?";
        const updateParams = [req.body.reason, req.body.username, req.body.id];
        await queryAsync(updateQuery, updateParams);
        const checkusdt = await queryAsync("SELECT * FROM `deposit` WHERE  `id` = ?;", [req.body.id]);
        if (checkusdt[0].payment_type == 'USDT') {
          await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + (SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?) WHERE `user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)", [req.body.id, req.body.id]);
          await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES ((SELECT `user_name` FROM `deposit` WHERE `id` = ?),?,?,(SELECT (`balance`*`price_at_that_time`) FROM `deposit` WHERE `id` = ?))", [req.body.id, 'Deposit', `Decliend By ${req.body.username}`, req.body.id]);
        } else {
          await queryAsync("UPDATE `wallet` SET `wallet_balance` = `wallet_balance` + (SELECT `balance` FROM `deposit` WHERE `id` = ?) WHERE `user_name` = (SELECT `user_name` FROM `deposit` WHERE `id` = ?)", [req.body.id, req.body.id]);
          await queryAsync("INSERT INTO `statement`(`number`, `type`, `description`, `amount`) VALUES ((SELECT `user_name` FROM `deposit` WHERE `id` = ?),?,?,(SELECT `balance` FROM `deposit` WHERE `id` = ?))", [req.body.id, 'Deposit', `Decliend By ${req.body.username}`, req.body.id]);
        }
        res.status(200).json({
          error: false,
          status: true,
          message: "Wallet Updated Successfully",
        });
      }
    }
  } catch (err) {
    console.log(err);    
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


app.post("/add-usdt", upload.single('image'), verifytoken, async (req, res) => {
  try {
    await queryAsync("INSERT INTO `usdt`(`currency`, `price`, `address`, `qr_code`) VALUES (?,?,?,?)",
      [req.body.currency, req.body.price, req.body.address, req.file.filename]);
    res.status(200).json({
      error: false,
      status: true,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/status-usdt", verifytoken, async (req, res) => {
  try {
    await queryAsync(
      "UPDATE `usdt` SET `status` = ? WHERE `id` = ?",
      [req.body.status, req.body.id]
    );
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/get-usdt", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `usdt`");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/update-usdt", upload.single("image"), verifytoken, async (req, res) => {
  try {
    if (req.file === undefined) {
      await queryAsync(
        "UPDATE `usdt` SET `currency`=?,`price`=?,`address`=? WHERE `id` = ?",
        [req.body.currency, req.body.price, req.body.address, req.body.id]
      );
      res.status(200).json({
        error: false,
        status: true,
        message: "Gallery Updated Successfully."
      });
    } else {
      await queryAsync(
        "UPDATE `usdt` SET `currency`=?,`price`=?,`address`=?,`qr_code`=? WHERE WHERE `id` = ?",
        [req.body.currency, req.body.price, req.body.address, req.file.filename, req.body.id]
      );
      deleteImage("img/" + req.body.old_image);
      res.status(200).json({
        error: false,
        status: true,
        message: "Gallery Updated Successfully."
      });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/del-usdt", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `usdt` WHERE `id` = ?", [req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


app.post("/add-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("INSERT INTO `investment_plans`(`plan_name`, `title`, `times`, `percentage`, `day_count`) VALUES (?,?,?,?,?)",
      [req.body.plan_name, req.body.title, req.body.times, req.body.percentage, req.body.day_count]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Investment-Plan Added SuccessFully!"
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/status-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `investment_plans` SET `status` = ? WHERE `id` = ?", [req.body.status, req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/get-investment-plan", verifytoken, async (req, res) => {
  try {
    const result = await queryAsync("SELECT * FROM `investment_plans`");
    res.status(200).json({
      error: false,
      status: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/update-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("UPDATE `investment_plans` SET `plan_name` = ?, `title` = ?, `times` = ?, `percentage` = ? , `day_count` = ? WHERE `id` = ?",
      [req.body.plan_name, req.body.title, req.body.times, req.body.percentage, req.body.day_count, req.body.id]);
    res.status(200).json({
      error: false,
      status: true,
      message: "Investment-Plan Updated Successfully."
    });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
app.post("/del-investment-plan", verifytoken, async (req, res) => {
  try {
    await queryAsync("DELETE FROM `investment_plans` WHERE `id` = ?", [req.body.id]);
    res.status(200).json({ error: false, status: true });
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

const agent = async (amount, user) => {
  const percentage2 = ((5 / 100) * parseFloat(amount)).toFixed(2);
  const percentage3 = ((3 / 100) * parseFloat(amount)).toFixed(2);
  const percentage4 = ((2 / 100) * parseFloat(amount)).toFixed(2);
  const percentage5 = ((2 / 100) * parseFloat(amount)).toFixed(2);
  const percentage6 = ((1 / 100) * parseFloat(amount)).toFixed(2);
  const percentage7 = ((1 / 100) * parseFloat(amount)).toFixed(2);
  try {
    const result = await queryAsync("SELECT `reffer_code` as rc FROM `user_details` WHERE `user_name` = ?", [user]);
    if (result.length > 0) {
      const level1 = await queryAsync("SELECT * FROM `user_level` WHERE `user_reffral` = ?", [result[0].rc]);
      if (level1[0].level_1) {
        await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage2, level1[0].level_1]);
        await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, percentage2, 'Level 1']);
        if (level1[0].level_2 != null) {
          await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage3, level1[0].level_2]);
          await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_2, percentage3, 'Level 2']);
          if (level1[0].level_3 != null) {
            await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage4, level1[0].level_3]);
            await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_3, percentage4, 'Level 3']);
            if (level1[0].level_4 != null) {
              await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage5, level1[0].level_4]);
              await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_4, percentage5, 'Level 4']);
              if (level1[0].level_5 != null) {
                await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage6, level1[0].level_5]);
                await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_5, percentage6, 'Level 5']);
                if (level1[0].level_6 != null) {
                  await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [percentage7, level1[0].level_6]);
                  await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_6, percentage7, 'Level 6']);
                } else {
                  await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage7).toFixed(2), level1[0].level_1]);
                  await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage7).toFixed(2), 'Level 1']);
                }
              } else {
                await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage6).toFixed(2), level1[0].level_1]);
                await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage6).toFixed(2), 'Level 1']);
              }
            } else {
              await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage5).toFixed(2), level1[0].level_1]);
              await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage5).toFixed(2), 'Level 1']);
            }
          } else {
            await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage4).toFixed(2), level1[0].level_1]);
            await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage4).toFixed(2), 'Level 1']);
          }
        } else {
          await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage3).toFixed(2), level1[0].level_1]);
          await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage3).toFixed(2), 'Level 1']);
        }
      } else {
        await queryAsync("UPDATE `wallet` SET `agents_wallet` = `agents_wallet` + ? WHERE `user_name` = (SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?)", [((parseFloat(amount)) - percentage2).toFixed(2), level1[0].level_1]);
        await queryAsync("INSERT INTO `agents_statement`(`mobile`, `amount`, `discription`) VALUES ((SELECT `user_name` FROM `user_details` WHERE `reffer_code` = ?), ?, ?)", [level1[0].level_1, ((parseFloat(amount)) - percentage2).toFixed(2), 'Level 1']);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteImage = async (relativeImagePath) => {
  const imagePath = path.resolve(__dirname, '../../assets', relativeImagePath);
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
    await fs.promises.unlink(imagePath);
  } catch (err) {
    // Handle the error if needed

  }
};

module.exports = app;