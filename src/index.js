const express = require('express');
const app = express();
const admin = require('./admin-api-folder/admin');
const user = require('./user-api-folder/user');
const casino = require('./casino/casino');
const game = require('./color-game/color');
app.use("/assets", express.static('assets'));
app.use("/image", express.static('image'));
PORT= 5999;

app.use('/admin', admin);
app.use('/user', user);
app.use('/casino', casino);
app.use('/game', game);

const listener = app.listen(PORT || 4500, () => {
  console.log("Your app is listening on port " + listener.address().port +" (Booker)");
});
