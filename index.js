const mainClock = document.querySelector(".main-clock");
const setAlarm = document.querySelector(".set-alarm");
const hourInput = document.querySelector(".hour");
const minuteInput = document.querySelector(".minute");
const secondInput = document.querySelector(".second");
const meridiemInput = document.querySelector(".set-meridiem");
const alarmList = document.querySelector(".alarm-list");

// a variable to store all alarm timings
var alarmTimings = [];

// create main clock using setInterval method which gets refreshed every 10ms
setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  //meridiemType - to determine AM/PM, also adding 0 to numbers less than 10
  let meridiemType = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let currentTime = `${hours} : ${minutes} : ${seconds} ${meridiemType}`;
  if (alarmTimings.includes(currentTime)) {
    alert("Hey Buddy! time is up!");
  }
  mainClock.innerHTML = currentTime;
});

// setting the alarm and storing the alarm value
setAlarm.addEventListener("click", (e) => {
  e.preventDefault();
  let hoursValue =
    hourInput.value < 10 ? "0" + hourInput.value : hourInput.value;
  let minutesValue =
    minuteInput.value < 10 ? "0" + minuteInput.value : minuteInput.value;
  let secondsValue =
    secondInput.value < 10 ? "0" + secondInput.value : secondInput.value;

  //clearing the alarm input box
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";
  let alarmInput = `${hoursValue} : ${minutesValue} : ${secondsValue} ${meridiemInput.value}`;
  createSelectedAlarmElement(alarmInput);
  alarmTimings.push(alarmInput);
});

// creating a div and appending it to last of alarm-list
function createSelectedAlarmElement(alarmInput) {
  let alarmSelectedItem = document.createElement("div");
  alarmSelectedItem.innerHTML = `${alarmInput} <button class='clear-alarm-button'>Delete</button>`;
  alarmList.appendChild(alarmSelectedItem);
}

// clear alarm by clicking on delete button
alarmList.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-alarm-button"))
    e.target.parentElement.remove();
});
