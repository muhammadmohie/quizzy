const mainContainer = document.querySelector(".main-container");
const confirmation = document.querySelector(".confirmation");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const time = document.querySelector(".time");
let timeCounter = 10;
let requiredQuiz;
let loadedQuiz;
let score;
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

    let premadeQuizzes = document.querySelector('.premade-quizzes')
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
    let cor=[];
    let arrange=["A","B","C","D"];
    score = 0;
    // previous.disabled = true;          // disable the previous button in the first question

    //======================================================================================

    mainContainer.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        requiredQuiz = event.target.textContent;
        mainContainer.style.display = "none";
        confirmation.style.display = "block";
        loadRequiredQuiz();
      }
    });
    async function loadRequiredQuiz(){
      let res = await fetch(`http://127.0.0.1:3000/quizzes/${requiredQuiz}`);
      loadedQuiz = await res.json();
      //     for(let i =0; i< loadedQuiz.questions.length;i++){
      //   cor.push(loadedQuiz.questions[i].correct-answer)
      // }
      // console.log( cor);

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
      console.log(quizName);
      quizTitle.innerText = `${quizName.toUpperCase()} quiz.`;
      timer(timeCounter);
    }

    //============================== Timer function =================================================
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
        mainContainer.style.display = "none";
      if(time.id != '00'){
        for (let i = 0; i < results.length; i++) {          // calculat the sore if the timer finshed
          if (results[i] == cor[i])
            score++;
        }
        console.log(cor);
        console.log(results);
        console.log(score);
      }
    }
  }
    //==============================================================================
    proceed.addEventListener("click", () => {
      // next.disabled = true;
      question.textContent = `Q${q+1}: ${loadedQuiz.questions[0].title}`;
      for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent =arrange[i] +'- '+ loadedQuiz.questions[0].answers[i];
        answers.appendChild(ansr);
        
       
        answers.children.item(i).addEventListener("click", () => {    // save the correct answer
          c = i;
        

          ansr.classList.add("choic");
         
    
          // next.disabled = false;
        })
        // const ansr = document.querySelector('.ansr');
     
      }
      results.push(c);                                           // push the correct anwser in the array
      results.shift();
      

     

      for(let i=0;i<loadedQuiz.questions.length;i++){

        cor.push(loadedQuiz.questions[i]["correct-answer"])

      }
  
    });
  
    next.addEventListener('click', () => {

      // next.disabled = true;
      // previous.disabled = false;

    
      if (q === loadedQuiz.questions.length - 2) {
        next.textContent = 'Finish attempt';
       
      }
      if (q === loadedQuiz.questions.length - 1) {
        // show results from here
        quizContainer.style.display = "none";
        resultContainer.style.display = 'block';
        time.setAttribute('id', '00');
        //return;
      }
      answers.innerHTML = '';
      q++;
     
     if(q<=loadedQuiz.questions.length-1){
        question.textContent = `Q${q+1}: ${loadedQuiz.questions[q].title}`; 
      for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent =arrange[i] +'- '+ loadedQuiz.questions[q].answers[i];
        answers.appendChild(ansr);
       
        answers.children.item(i).addEventListener("click", () => {     // save trhe correct answers 
         c = i;
         ansr.classList.add("choic");
        })

      }
    }
    results.push(c);
      if (q == loadedQuiz.questions.length) {                     // calculat the total socre 
        console.log(cor);
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          if (results[i] == cor[i])
            score++;
        }
        console.log(score);
      }
      
    });

    previous.addEventListener('click', () => {

      if (q < loadedQuiz.questions.length)    // change the name of the button
      {
        next.textContent = 'Next'
      }

      if (q === 0)
        return;

      answers.innerHTML = '';
      q--;
      question.textContent =`Q${q+1}: ${loadedQuiz.questions[q].title}`;
      for (let i = 0; i < loadedQuiz.questions[0].answers.length; i++) {
        let ansr = document.createElement('div');
        ansr.classList.add('answer');
        ansr.setAttribute('id', `${i}`);
        ansr.textContent = loadedQuiz.questions[q].answers[i];
        answers.appendChild(ansr);

        answers.children.item(i).addEventListener("click", () => {
          c = i;
          //next.disabled = false;
          
        })

      }
      answers.children.item(results.pop()).classList.add('choic');
      results.pop(); // remove the answer from the array
//console.log(results);
    });
  } catch (error) {
    console.log(error);
  }


})();





        // answers.children.item(0).addEventListener("click",()=>{     
          
        //     c =0;
        //     next.disabled=false;
          
        // })
        // answers.children.item(1).addEventListener("click",()=>{     
          
        //     c = 1;
        //     next.disabled=false;
          
        // })
        // answers.children.item(2).addEventListener("click",()=>{     
          
        //     c = 2;
        //     next.disabled=false;
          
        // })
        // answers.children.item(3).addEventListener("click",()=>{     
          
        //     c = 3;
        //     next.disabled=false;
          
        // })
