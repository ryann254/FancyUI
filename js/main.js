//Question Array

const questions = [
  { question: "Enter First Name" },
  { question: "Enter Last Name" },
  { question: "Enter Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create Your Password", type: "password" }
];

//Transition Times

const shakeTime = 100;
const switchTime = 200;

//Initialize Position At First Question
let position = 0;

//Initialize DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progressBar = document.querySelector("#progress-bar");

//EVENTS
document.addEventListener("DOMContentLoaded", getQuestion);
nextBtn.addEventListener("click", validate);
inputField.addEventListener("keyup", e => {
  if (e.keyCode == 13) {
    validate();
  }
});

//FUNCTIONS
//Get Question From Array & Mark Up
function getQuestion() {
  //Get Question
  inputLabel.innerHTML = questions[position].question;
  //Get Current Type
  inputField.type = questions[position].type || "text";
  //Get Current Answer
  inputField.value = questions[position].answer || "";
  //Focus Element
  inputField.focus();

  //Set Prgress Bar
  progressBar.style.width = (position * 100) / questions.length + "%";

  //Add User Icon or Back Arrow
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

//Display Question
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

//Hide The Question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

//Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//Validate Field
function validate() {
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

function inputFail() {
  formBox.className = "error";
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  //Store answers
  questions[position].answer = inputField.value;

  position++;

  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = "close";
    progressBar.style.width = "100%";

    formComplete();
  }
}

function formComplete() {
  console.log(questions);
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      }. You have been registered successfully on your email ${
        questions[2].answer
      }`
    )
  );

  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}
