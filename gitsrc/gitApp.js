const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const static = require('serve-static');
let date = new Date();

app.use(static(path.join(__dirname + '//public')));

const page404Error = (response) => {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("404 error!");
  response.end();
};

const page200 = (req, res) => {
  if (req.method == "GET" && req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream("./public/index.html").pipe(res);
    console.log("user connect");
  } else {
    page404Error(res);
  }
};

http.createServer(page200).listen(8080);
console.log("-----Server created!-----");
console.log(__dirname);
console.log(`----- WebServer start time ${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()} -----`);