//setting references to the HTML DOM elements
const generateQuestionButton = document.getElementById("genButton");
generateQuestionButton.addEventListener("click", generateQuestion);

//buttons in HTML whitch will display the possible answers
const butA = document.getElementById("ansA");
const butB = document.getElementById("ansB");
const butC = document.getElementById("ansC");
const butD = document.getElementById("ansD");


const genDiv = document.getElementById("genDiv");

//used to mark excluded questions
const excluded = [];

let score = 0;

//number of displayed questions
let counter = 0;

let answer
let numberOfQuesitons

function exclude(number) {
  excluded.push(number);
}

async function getQuestions(){
  try{
    const response = await fetch("questions.json");
    const data = await response.json();
    return data;
  }catch(error){
    console.log(error);
  }
}

async function generateQuestion() {
  try {
    let data = await getQuestions()
    counter++;
    numberOfQuesitons = data.questions.length;
    do {
      randomNumber = Math.floor(Math.random() * numberOfQuesitons);
    } while (excluded.includes(randomNumber));
    exclude(randomNumber);

    const question = data.questions[randomNumber];
    answer = question.answer;

    display(question);
  } catch (error) {
    console.error("Error fetching", error);
  }
}

function display(question) {
  //modifying the contents of the html elements
  genDiv.textContent = counter + ". " + question.question;
  butA.textContent = question.options.a;
  butB.textContent = question.options.b;
  butC.textContent = question.options.c;
  butD.textContent = question.options.d;
}

//every button has onclick="validate('')" 
//with the paramenter being the letter of the corresponding button position 
//this function also calculates the score
function validate(letter) {
  if (letter == answer) {
    score++;
  }
  if (excluded.length === numberOfQuesitons) {
    redirectToScore();
  } else {
    generateQuestion();
  }
}

function redirectToScore() {
  console.log(score);
  document.cookie = score;
  window.location.href = "./score.html";
}
function redirectToQuiz() {
  window.location.href = "./quiz.html";
}

generateQuestion();
