const express = require('express');
const app = express();
const admin = require('./admin-api-folder/admin');
const user = require('./user-api-folder/user');
const casino = require('./casino/casino');
app.use("/assets", express.static('assets'));
PORT= 5999;

app.use('/admin', admin);
app.use('/user', user);
app.use('/casino', casino);

const listener = app.listen(PORT || 4500, () => {
  console.log("Your app is listening on port " + listener.address().port +" (ecommerce)");
});