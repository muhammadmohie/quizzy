



const mainContainer = document.querySelector(".main-container");
const confirmation = document.querySelector(".confirmation");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const time = document.querySelector(".time");
let timeCounter = 1000;
let elapsedTime=0;
let requiredQuiz;
let loadedQuiz;
let score;
let displayed = false;
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
let proceed = document.getElementById("proceed");
let quizzes;

const answer = document.querySelector(".answer");
(async function fetchQuizzes() {
  try {
    const url = 'http://127.0.0.1:3000/quizzes';
    let response = await fetch(url);
    quizzes = await response.json();

    const premadeQuizzes = document.querySelector('.premade-quizzes')
    for (let i = 0; i < quizzes.length; i++) {
      let quiz = document.createElement('button');
      quiz.textContent = quizzes[i];
      quiz.classList.add('quizzes');
      premadeQuizzes.appendChild(quiz);
    }
    // Add code here
    let q = 0; // the current question
    let c = -1; // the current answer
    let results = [];
    let cor = [];
    let arrange = ["A", "B", "C", "D"];
    score = 0;
    //======================================================================================

    mainContainer.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        requiredQuiz = event.target.textContent;
        mainContainer.style.display = "none";
        confirmation.style.display = "block";
        loadRequiredQuiz();
      }
    });
    async function loadRequiredQuiz() {
      const urlq = `http://127.0.0.1:3000/quizzes/${requiredQuiz}`;
      let response = await fetch(urlq);
      loadedQuiz = await response.json();
      // push the correct answers of the loaded quiz in cor array
      for (let i = 0; i < loadedQuiz.questions.length; i++) {
        cor.push(loadedQuiz.questions[i]["correct-answer"])
      }
    }

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

    function startQuiz(quizName) {
      mainContainer.style.display = "none";
      confirmation.style.display = "none";
      quizContainer.style.display = "block";
      const quizTitle = document.querySelector('.quiz-title');
      quizTitle.innerText = `${quizName.toUpperCase()} quiz.`;
      startTimer(timeCounter);
    }

    //============================== Timer function =================================================
    function startTimer(counter) {
      const countdown = setInterval(() => {
        counter--;
        elapsedTime++;
        printTime(counter);
        if (counter < 1) {
          clearInterval(countdown);
          timeOut();
        }
      }, 1000);
    }
    function printTime(seconds) {
      let min = Math.floor(seconds / 60);
      let sec = Math.floor(seconds % 60);
      time.textContent = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
    function timeOut() {
      quizContainer.style.display = "none";
      mainContainer.style.display = "none";
      resultContainer.style.display = 'block'
      if (!displayed)
        displayQuizResult(elapsedTime-1);
    }

    //==============================================================================
    function addActivClass(){
      //========================== Active class ================================================================
      answers.children.item(0).addEventListener("click", () => {    // save the correct answer
            
        answers.children.item(1).classList.remove('choice');
        answers.children.item(2).classList.remove('choice');
        answers.children.item(3).classList.remove('choice');
        answers.children.item(0).classList.add('choice');
       
      })
      
      answers.children.item(1).addEventListener("click", () => {    // save the correct answer
      
        answers.children.item(0).classList.remove('choice');
        answers.children.item(2).classList.remove('choice');
        answers.children.item(3).classList.remove('choice');
        answers.children.item(1).classList.add('choice');
       
      })
      answers.children.item(2).addEventListener("click", () => {    // save the correct answer
      
        answers.children.item(0).classList.remove('choice');
        answers.children.item(1).classList.remove('choice');
        answers.children.item(3).classList.remove('choice');
        answers.children.item(2).classList.add('choice');
     
      })
      
      
      //==========================================================================================
      
          }


    //===============================================================================
    proceed.addEventListener("click", () => {
      // load the first quetion
      question.textContent = `Q${q + 1}: ${loadedQuiz.questions[0].title}`;
      for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.textContent = arrange[i] + '. ' + loadedQuiz.questions[0].answers[i];
        answers.appendChild(ansr);

        answers.children.item(i).addEventListener("click", () => {    // save the correct answer
          // c = i;
          // answers.children.item(i).classList.add('choice');
          // results[q] = c;
          c = i;
          answers.children.item(i).classList.add('choice');
           results[q] = c;
           answers.querySelector('.choice').classList.remove('choice');
           answers.children.item(i).classList.add('choic');
        })
       
      }
      addActivClass();
   
    });
    
    next.addEventListener('click', () => {
     // results[q] = -1;
      if (q === loadedQuiz.questions.length - 2) {
        next.textContent = 'Finish attempt';
      
      }
      if (q === loadedQuiz.questions.length - 1) {
        // show results from here
        quizContainer.style.display = "none";
        resultContainer.style.display = 'block';
        displayed = true;
        displayQuizResult(elapsedTime-1);
        return;
      }

      

      answers.innerHTML = '';
      q++;
      if (q <= loadedQuiz.questions.length - 1) {
        question.textContent = `Q${q + 1}: ${loadedQuiz.questions[q].title}`;
        for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
          let ansr = document.createElement('div');
          ansr.classList.add('answer');
          ansr.textContent = arrange[i] + '. ' + loadedQuiz.questions[q].answers[i];
          answers.appendChild(ansr);

          answers.children.item(i).addEventListener("click", () => {     // save trhe correct answers 
            c = i;
            results[q] = c;
            answers.children.item(i).classList.add('choice');
            answers.querySelector('.choice').classList.remove('choice');
            answers.children.item(i).classList.add('choice');
          });
        }
        addActivClass();  // adding active class
        if(results[q]!=undefined){
          answers.children.item(results[q]).classList.add('choice');
        }
      }
      // c = results[q];
    });

    previous.addEventListener('click', () => {

      if (q < loadedQuiz.questions.length)    // change the name of the button
      {
        next.textContent = 'Next';
      }
      if (q === 0)
        return;
      answers.innerHTML = '';
      q--;
      question.textContent = `Q${q + 1}: ${loadedQuiz.questions[q].title}`;
      for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.textContent = arrange[i] + '. ' + loadedQuiz.questions[q].answers[i];
        answers.appendChild(ansr);

        answers.children.item(i).addEventListener("click", () => {
          c = i;
          results[q] = c;
          answers.querySelector('.choice').classList.remove('choice');
          answers.children.item(i).classList.add('choice');
        })
      }
      addActivClass();
      answers.children.item(results[q]).classList.add('choice');
    });



    function displayQuizResult(timeTaken) {
      let total = loadedQuiz.questions.length;
      let answered=0;
      let unanswered;
      let correctAnswers=0;
      let wrongAnswers;

      if (timeTaken<=0)
        timeTaken=1;

      for (let i = 0; i < results.length; i++) {
        if (results[i] == cor[i]) {
          answered++;
          correctAnswers++;
        }
        else
          answered++;
      }
      unanswered = total-answered;
      wrongAnswers = answered - correctAnswers;
      let percentage = (correctAnswers/total)*100;
      percentage = percentage.toFixed(2);

      let status = (percentage>=70) ? 'Passed' : 'Failed';

      const resultTitle = document.createElement('h1');
      resultTitle.textContent = `Your ${requiredQuiz} quiz result.`
      resultTitle.classList.add('result-title');
      resultContainer.appendChild(resultTitle);

      const gradeReport = document.createElement('div');
      gradeReport.classList.add('grade-report');

      const rowItem1 = document.createElement('p');
      rowItem1.innerText = `Your status: ${status}`;
      rowItem1.classList.add('grade-report-item');
      const rowItem2 = document.createElement('p');
      rowItem2.innerText = `Passing grade: 70%.`;
      rowItem2.classList.add('grade-report-item');

      const rowItem3 = document.createElement('p');
      rowItem3.innerText = `Quiz questions: ${total}.`;
      rowItem3.classList.add('grade-report-item');
      const rowItem4 = document.createElement('p');
      rowItem4.innerText = `Answered question: ${answered}.`;
      rowItem4.classList.add('grade-report-item');

      const rowItem5 = document.createElement('p');
      rowItem5.innerText = `Correct answers: ${correctAnswers}.`;
      rowItem5.classList.add('grade-report-item');
      const rowItem6 = document.createElement('p');
      rowItem6.innerText = `Wrong answers: ${wrongAnswers}.`;
      rowItem6.classList.add('grade-report-item');

      const rowItem7 = document.createElement('p');
      rowItem7.innerText = `Unanswered: ${unanswered}.`;
      rowItem7.classList.add('grade-report-item');
      const rowItem8 = document.createElement('p');
      rowItem8.innerText = `Your score is: ${correctAnswers} points`;
      rowItem8.classList.add('grade-report-item');

      const rowItem9 = document.createElement('p');
      rowItem9.innerText = `Percentage form: ${percentage}%.`;
      rowItem9.classList.add('grade-report-item');
      const rowItem10 = document.createElement('p');
      rowItem10.innerText = `Taken time: ${timeTaken} s.`;
      rowItem10.classList.add('grade-report-item');

      gradeReport.appendChild(rowItem1);
      gradeReport.appendChild(rowItem2);
      gradeReport.appendChild(rowItem3);
      gradeReport.appendChild(rowItem4);
      gradeReport.appendChild(rowItem5);
      gradeReport.appendChild(rowItem6);
      gradeReport.appendChild(rowItem7);
      gradeReport.appendChild(rowItem8);
      gradeReport.appendChild(rowItem9);
      gradeReport.appendChild(rowItem10);

      resultContainer.appendChild(gradeReport);

      const showResult = document.createElement('div');
      for (let i=0; i < loadedQuiz.questions.length; i++) {
        const question = document.createElement('div');
        question.classList.add('question-text');
        question.textContent = `Q${i + 1}: ${loadedQuiz.questions[i].title}`;
        const answers = document.createElement('div');
        answers.classList.add('answers');
        for (let j = 0; j < loadedQuiz.questions[i].answers.length; j++) {
          let ansr = document.createElement('div');
          ansr.classList.add('answer');
          ansr.textContent = arrange[j] + '. ' + loadedQuiz.questions[i].answers[j];
          if (results[i] == undefined)
            question.classList.add('left-question');
          if (results[i] === j)
            ansr.classList.add('wrong-answer');
          if (loadedQuiz.questions[i]["correct-answer"] === j)
            ansr.classList.add('correct-answer');
          answers.appendChild(ansr);
        }
        showResult.appendChild(question);
        showResult.appendChild(answers);
      }
      resultContainer.appendChild(showResult);
    }




  } catch (error) {
    console.log(error);
  }

})();
