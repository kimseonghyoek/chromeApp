const express = require('express');
const app = express();
const client_id = '클라디언트 아이디';
const client_secret = '클라디언트 코드';
const query = "언어를 감지할 문구";

app.get('/detectLangs', (req, res) => {
    const api_url = 'https://openapi.naver.com/v1/papago/detectLangs';
    const request = require('request');
    let options = {
        url: api_url,
        form: {'query': query},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.post(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
          } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            alert(response.statusCode)
          }
    });
});
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000/detectLangs app listening on port 3000!');
})