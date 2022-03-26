// Ишем переменные в HTML и обозначаем ссылку на эхо-сервер
const incertArea = document.querySelector('.incert');
const input = document.querySelector('.input');
const sendMessageBtn = document.querySelector('.sendMessage');
const GeoBtn = document.querySelector('.getGeolocation');
const wssUrl = 'wss://echo-ws-service.herokuapp.com';


// определяем геолокацию
const success = (position) => {
const longitude = position.coords.longitude;
const latitude = position.coords.latitude;
writeToScreen(`<span class='userMsg'>Ваше местоположение, широта: ${longitude}, долгота: ${latitude}.</span>`)   
}

const error = () => {
  alert(`Отказано в доступе к вашей геолокации, предоставьте браузеру доступ к вашему местоположению.` )
}

GeoBtn.addEventListener('click', () => {
  
 if (!navigator.geolocation){
   alert('Геолокация не поддерживается вашим браузером');
  } else {
navigator.geolocation.getCurrentPosition(success, error)   
}
})
// конец блока поиска геолокации


/// создаем функцию вывода сообщений на экран чата

function writeToScreen(message) {
  let newLine = document.createElement('p');
  //newLine.style.wordWrap = 'break-word';
  newLine.innerHTML = message;
  incertArea.appendChild(newLine);
};

// Создаем веб сокет
let webSocket; 

//Пишем функцию для установки соединения с это-сервером, функция будет начинать работать, при клике на поле input

input.addEventListener('click', () => {
 webSocket = new WebSocket(wssUrl);
  webSocket.onopen = function(event) {
   console.log('connected');
     };
   
  webSocket.onclose = function(event){
    console.log('disconnected');
  };
  
  webSocket.onmessage = function(event){
   writeToScreen(`<span class="serverMsg">Сервер: ${event.data}</span>`);
    }
  });

//Создаем функцию для отправки сообщения на эхо-сервер
sendMessageBtn.addEventListener("click", () => {
let userMessage = input.value; 
webSocket.send(userMessage);
writeToScreen(`<span class="userMsg">Ваше сообщение: ${userMessage}</span>`);
 input.value = '';
})
