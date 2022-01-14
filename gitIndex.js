// 시간 가져오기
const time = () => {
  let date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let time = document.getElementById("time");
  const checkSec = 'input[name="checkSec"]:checked';
  const selectedElements = document.querySelectorAll(checkSec);
  if (selectedElements.length === 1) {
    time.innerText = `${hours} : ${min < 10 ? `0${min}` : min} : ${
      sec < 10 ? `0${sec}` : sec
    }`;
  } else {
    time.innerText = `${hours} : ${min < 10 ? `0${min}` : min}`;
  }
};

const nowTime = () => {
  setInterval(() => {
    time();
  }, 100);
};

nowTime();

// 현재 날씨 가져오기
const getJson = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = () => {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
      console.log("성공");
    } else {
      callback(status, xhr.response);
      console.log("에러");
    }
  };
  xhr.send();
};

const callK_cityJson = (callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./Json/K_city.json", true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
};

const wea = document.getElementById("weather");
const pTag = document.createElement("p");
wea.appendChild(pTag);

const cityTem = (name, tem) => {
  let city = document.createTextNode(`${name} * `);
  let temp = document.createTextNode(tem);
  const br = document.createElement("br");
  pTag.appendChild(city);
  pTag.appendChild(temp);
  pTag.appendChild(br);
};

callK_cityJson((json) => {
  // K_city.json 안에 있는 데이터 개수 확인
  console.log(Object.keys(json).length);

  jsonLength = Object.keys(json).length;
  const jsonData = Object.keys(json);
  console.log(jsonData);
  let JsonArray = new Array();
  JsonArray.push(jsonData);

  for (i = 0; i < jsonLength; i++) {
    console.log(JsonArray);
    getJson(`${JsonArray[0][0 + i]}`, function (err, data) {
      if (err !== null) {
        alert(err);
      } else {
        cityTem(data.name, data.main.temp);
      }
    });
  }
});
