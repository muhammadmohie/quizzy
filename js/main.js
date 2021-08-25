const mainContainer = document.querySelector(".main-container");
const confirmation = document.querySelector(".confirmation");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const time = document.querySelector(".time");
let timeCounter = 61;
let requiredQuiz;
let loadedQuiz;
let score;

mainContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    requiredQuiz = event.target.textContent;
    mainContainer.style.display = "none";
    confirmation.style.display = "block";
  }
});

confirmation.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    if (event.target.id === "change") {
      mainContainer.style.display = "block";
      confirmation.style.display = "none";
    } else {
      startQuiz(requiredQuiz);
    }
  }
});

function startQuiz(quiz) {
  mainContainer.style.display = "none";
  confirmation.style.display = "none";
  quizContainer.style.display = "block";
  timer(timeCounter);
}

function timer(timeCounter) {
  const countdown = setInterval(() => {
    timeCounter--;
    printTime(timeCounter);
    if (timeCounter < 1) {
      clearInterval(countdown);
      finshed();
    }
  }, 1000);

  function printTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    time.textContent = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  function finshed() {
    quizContainer.style.display = "none";
    resultContainer.style.display = 'block'
    // Display quiz result
    mainContainer.style.display = "block";
  }
}

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const url = './Questions.json';
let proceed = document.getElementById("proceed");
let loadedQuizzes;

(async function fetchQuizzes(){
  try {
    let response = await fetch(url);
    let json = await response.json();
    loadedQuizzes = json;
    // Add code here
    let q=0; // the current question
    proceed.addEventListener("click", () =>
    {
      for (let i=0; i<loadedQuizzes.length; i++)
        if (requiredQuiz === loadedQuizzes[i].title)
          loadedQuiz = loadedQuizzes[i];
      
      question.textContent = loadedQuiz.questions[0];
  
      for (let i = 0; i < loadedQuiz.answers[0].length; i++)
      {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent = loadedQuiz.answers[0][i];
        answers.appendChild(ansr);
      }
    });
    next.addEventListener('click', () => {
      if(q === loadedQuiz.questions.length-2)
      {
        next.textContent = 'Finish attempt'
      }
      if(q === loadedQuiz.questions.length-1)
      {
        // show results from here
        quizContainer.style.display = "none";
        resultContainer.style.display = 'block'
      }
      answers.innerHTML = '';
      question.textContent = loadedQuiz.questions[++q];
      for (let i = 0; i < loadedQuiz.answers[q].length; i++)
      {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent = loadedQuiz.answers[q][i];
        answers.appendChild(ansr);
      }
    });
    previous.addEventListener('click', () => {
      if(q === 0)
        return;
      answers.innerHTML = '';
      question.textContent = loadedQuiz.questions[--q];
      for (let i = 0; i < loadedQuiz.answers[q].length; i++)
      {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent = loadedQuiz.answers[q][i];
        answers.appendChild(ansr);
      }
    });

  } catch (error) {
    console.log(error);
  }
})();
