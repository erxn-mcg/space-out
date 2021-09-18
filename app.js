
let pageDisplayBool = [false, false, false, false];

const displayer = () => {
  $(".todo").hide();
  $(".settings").hide();
  $(".weather").hide();
  $(".timedate").hide();

  if (pageDisplayBool[0]) {
    $(".todo").show();
  }
  if (pageDisplayBool[1]) {
    $(".settings").show();
  }
  if (pageDisplayBool[2]) {
    $(".weather").show();
  }
  if (pageDisplayBool[3]) {
    $(".timedate").show();
  }
};

displayer();
$(document).on("click", ".buttonTodo", function() {
  if (pageDisplayBool[0]) {
    pageDisplayBool[0] = false; 
  } else {
    pageDisplayBool[0] = true; 
  }
  (pageDisplayBool[1] = false),
    (pageDisplayBool[2] = false),
    (pageDisplayBool[3] = false); 

  displayer(); 
});

$(document).on("click", ".buttonSettings", function() {
  if (pageDisplayBool[1]) {
    pageDisplayBool[1] = false; 
  } else {
    pageDisplayBool[1] = true; 
  }
  (pageDisplayBool[0] = false),
    (pageDisplayBool[2] = false),
    (pageDisplayBool[3] = false);

  displayer(); 
});

$(document).on("click", ".buttonWeather", function() {
  if (pageDisplayBool[2]) {
    pageDisplayBool[2] = false; 
  } else {
    pageDisplayBool[2] = true; 
  }
  (pageDisplayBool[1] = false),
    (pageDisplayBool[0] = false),
    (pageDisplayBool[3] = false); 

  displayer(); 
});

$(document).on("click", ".buttonClose", function() {
  for (let i = 0; i < pageDisplayBool.length; i++) {
    pageDisplayBool[i] = false;
  } 

  displayer();
});

let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const audio = new Audio("./assets/audio/timerEnd.mp3");
const audioAlert = document.getElementsByName("audio");
let selectedAudioAlert = false;
const visualAlert = document.getElementsByName("visual");
let selectedVisualAlert = false;

function timer(seconds) {
  
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    
    if (
      secondsLeft < 0 &&
      selectedAudioAlert == "1" &&
      selectedVisualAlert == "1"
    ) {
      clearInterval(countdown);
      
      audio.play();
      document.title = "The Timer is Done!";
      alert("Your Timer has Finished! Time to move to the next task.");
      return;
    } else if (secondsLeft < 0 && selectedAudioAlert == "1") {
      clearInterval(countdown);
      audio.play();
      return;
    } else if (secondsLeft < 0 && selectedVisualAlert == "1") {
      clearInterval(countdown);
      document.title = "The Timer is Done!";
      alert("Your Timer has Finished! Time to move to the next task.");
      return;
    } else if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
   
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}


function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Your Timer will End at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}!`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));

const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = todo => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
    `;

  list.innerHTML += html;
};

addForm.addEventListener("submit", e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    if (localStorage.getItem("todos")) {
      const todos = localStorage.getItem("todos").split(",");
      todos.push(todo);
      localStorage.setItem("todos", todos.join(","));
    } else {
      localStorage.setItem("todos", todo);
    }
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const removeTodo = e.target.parentElement.textContent.trim();
    e.target.parentElement.remove();
    const todos = localStorage.getItem("todos").split(",");
    const newTodos = todos.filter(todo => todo !== removeTodo);
    localStorage.removeItem("todos");
    localStorage.setItem("todos", newTodos);
  }
});

const filterTodos = term => {
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove("filtered"));
};

// search todo
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

if (localStorage.getItem("todos")) {
  const todos = localStorage.getItem("todos").split(",");
  todos.forEach(todo => {
    if (todo.length > 0) {
      generateTemplate(todo);
    }
  });
}

if (!localStorage.getItem("todos")) {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <span>This is a really important task!</span>
  <i class="far fa-trash-alt delete"></i>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
<span>Be sure to complete this thing too!</span>
<i class="far fa-trash-alt delete"></i>
</li>
  `;

  list.innerHTML += html;
}


  



 


document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  for (let i = 0; i < visualAlert.length; i++) {
    if (visualAlert[i].checked) {
      selectedVisualAlert = visualAlert[i].value;
    }

    for (let i = 0; i < audioAlert.length; i++) {
      if (audioAlert[i].checked) {
        selectedAudioAlert = audioAlert[i].value;
      }
    }
  }
});

const clock = document.querySelector(".clock");
const date = document.querySelector(".date");

const tick = () => {
  const now = new Date();

  const h = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
  const m =
    now.getMinutes() < 10
      ? "0" + JSON.stringify(now.getMinutes())
      : now.getMinutes();
  const s =
    now.getSeconds() < 10
      ? "0" + JSON.stringify(now.getSeconds())
      : now.getSeconds();
 
  const AMPM = now.getHours() > 11 ? "PM" : "AM";

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const time = `
  <span>${h}</span> :
    <span>${m}</span> :
    <span>${s}</span>
    <span>${AMPM}</span>
    `;

  clock.innerHTML = time;

  const today = `<div><span>${month}</span> / <span>${day}</span> / <span>${year}</span></div>`;
  date.innerHTML = today;
};

setInterval(tick, 1000);

const background = document.querySelector(".background");
const icon1 = document.querySelector(".buttonTodo");
const icon2 = document.querySelector(".buttonWeather");
const icon3 = document.querySelector(".buttonSettings");
const icon4 = document.querySelector(".buttonTimedate");

const t1 = new TimelineMax();

t1.fromTo(
  background,
  2.2,
  { width: "0%" },
  { width: "100%", ease: Power2.easeInOut }
)
  .fromTo(
    timerDisplay,
    2.2,
    { x: "100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=2.2"
  )
  .fromTo(buttons, 1.7, { opacity: 0, y: 200 }, { opacity: 1, y: 0 }, "-=1.5")
  .fromTo(icon1, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.2")
  .fromTo(icon2, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7")
  .fromTo(icon3, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7")
  .fromTo(icon4, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7");

