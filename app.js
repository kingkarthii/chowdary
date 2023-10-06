const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
let db = null;
const path = require("path");
const dbPath = path.join(__dirname, "userData.db");
app.use(express.json());
const initializationDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("server is running at 3001");
    });
  } catch (e) {
    console.log(`error is :${e.message}`);
    process.exit(1);
  }
};
initializationDbServer();

app.post("/register", async (request, response) => {
  let { username, name, password, gender, location } = request.body;
  console.log(password);
  const getQuery = `select * from user where username='${username}';`;
  const result = await db.get(getQuery);
  console.log(result);
  if (result !== undefined) {
    response.status(400);
    response.send("user already exits");
  } else if (password.length < 5) {
    response.status(400);
    response.send("Password is too short");
  } else {
    response.status(200);
    response.send("user created successfully");
  }
});
