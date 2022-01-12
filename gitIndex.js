// 시간 가져오기
const time = () => {
    let date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let time = document.getElementById('time');  
    const checkSec = 'input[name="checkSec"]:checked';
    const selectedElements = document.querySelectorAll(checkSec);
    if(selectedElements.length === 1) {
        time.innerText = `${hours} : ${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
    } else {
        time.innerText = `${hours} : ${min < 10 ? `0${min}` : min}`;
        
    }
}

const nowTime = () => {
    setInterval(() => {
        time();
    }, 100);
}

nowTime();

// 현재 날씨 가져오기
const getJson = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        const status = xhr.status;
        if(status === 200) {
            callback(null, xhr.response);
            console.log('성공');
        } else {
            callback(status, xhr.response);
            console.log('에러');
        }
    }
    xhr.send();
};

const callK_cityJson = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './Json/K_city.json', true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}


callK_cityJson((json) => {
    // K_city.json 안에 있는 데이터 개수 확인
    console.log(Object.keys(json).length);

    for(i = 0; i < Object.keys(json).length; i++) {
        const jsonData =(Object.keys(json));
        console.log(json);
        let JsonArray = new Array();
        JsonArray.push(jsonData);
        console.log(jsonData);
        console.log(JsonArray[0][0+i].cityName);
        getJson(`${JsonArray[0][0+i]}`, function(err, data) {
        const wea = document.getElementById('weather');
        if(err !== null) {
            alert(err);
        } else {
            wea.innerText = (`${JsonArray[0][0+i]} * ${data.main.temp}`);
            // if(i >= 1) {
            //     let addWeather = document.createElement(`<p>${json.Seoul.k_cityName} * ${data.main.temp}</p>`)
            // }
        }
    });
    }
})