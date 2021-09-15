const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const request = require("request");
var request = require("node-fetch");

const app = express();
const port = 9000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get-token", (req, res) => {
  const API_KEY = process.env.ZUJONOW_API_KEY;
  const SECRET_KEY = process.env.ZUJONOW_SECRET_KEY;
  const options = { expiresIn: "10m", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod", "ask_join"], // Trigger permission.
  };
  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
  console.log(token);
});


 
  
    app.route("/")
      .get((req, res) => {
           res.render('home');
      });
  
  
  app.route("/main")
  .get((req, res) => {
    res.render('main');
  });
  
  
  app.route("/meet")
  .get((req, res) => {
    const API_KEY = process.env.ZUJONOW_API_KEY;
    const SECRET_KEY = process.env.ZUJONOW_SECRET_KEY;
    const option = { expiresIn: "10m", algorithm: "HS256" };
    const payload = {
      apikey: API_KEY,
    };
    let token = jwt.sign(payload, SECRET_KEY, option);
  
    console.log(token);
  
    
  
    var options = {
      method: "POST",
      url: "https://api.zujonow.com/v1/meetings",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    
    request(url, options)
      .then((res) => {
        res.json()})
      .then((json) => {
        console.log(json)})
      .catch((err) => console.error("error:" + err));
      
    
    res.redirect("/main")
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  
  