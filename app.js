const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { UserModel } = require("./user_model");

function hasher(s) {
  const { createHash } = require('node:crypto');
  return createHash('SHA256').update(s).digest('hex');
}

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended:true
}))

mongoose.connect("mongodb://localhost:27017/dormDB", {
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('error', () => console.log("error in connection"));
db.once('open', () => console.log("connected to db"));


app.get("/", (req, res) => {
  return res.redirect("/index.html");
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    console.log(`[ERROR] username does not exist: ${username}`);
    res.sendStatus(500);
    return;
  }

  const pass_hash = hasher(password);

  if (user.password != pass_hash) {
    console.log('[ERROR] given password is incorrect');
    res.sendStatus(500);
    return;
  }

  console.log('checks succeeded');
  res.sendStatus(200);
})

app.patch("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  UserModel.db.transaction(async (session) => {
    const usertype = new UserModel({
      username, email,
      password: hasher(password)
    });

    if(await UserModel.findOne({ email })) {
      console.log(`[ERROR] email already exists: ${email}`);
      session.abortTransaction();
      throw new Error("email already exists");
    }

    if (await UserModel.findOne({ username })) {
      console.log(`[ERROR] username already exists: ${username}`);
      session.abortTransaction();
      throw new Error("username already exists");
    }

    usertype.save();
  }).then(() => {
    console.log('transaction succeeded...');
    res.sendStatus(200);
  }).catch((err) => {
    console.log("some error occured...", err);
    res.sendStatus(500);
  });
})