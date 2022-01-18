// import './widget';
// import './papago';

const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('../css/index.css'));

const page404Error = (response) => {
    response.writeHead(404, {"Content-Type":'text/plain'})
    response.write('404 error!');
    response.end();
}

const page200 = (req, res) => {
    if(req.method == 'GET' && req.url  == '/') {
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream('../index.html').pipe(res);
        console.log('user connect');
    } else {
        page404Error(res);
    }
}

http.createServer(page200).listen(8080);
console.log("-----Server created!-----");