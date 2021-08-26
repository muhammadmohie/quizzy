const mainContainer = document.querySelector('.main-container');
const confirmation = document.querySelector('.confirmation');
const quizContainer = document.querySelector('.quiz-container');

let time_counter = 81;
let requiredQuiz;

document.querySelector('.main-container').addEventListener("click",
  event => {
    if (event.target.tagName === 'BUTTON')
    {
      requiredQuiz = event.target.textContent;
      mainContainer.style.display = "none";
      confirmation.style.display = "block";
    }
  }
);

document.querySelector('.confirmation').addEventListener("click",
  event => {
    if (event.target.tagName === 'BUTTON')
    {
      if (event.target.id === 'change') {
        mainContainer.style.display = "block";
        confirmation.style.display = "none";
      } else {
        startQuiz(requiredQuiz);
      }
    }
  }
);

function startQuiz(quiz) {
  console.log(requiredQuiz);
  mainContainer.style.display = "none";
  confirmation.style.display = "none";
  quizContainer.style.display = "block";
  timer(time_counter);
}

function timer(time_counter) {

  const countdown = setInterval(() => {
    time_counter--;
    allTime(time_counter);
    if (time_counter < 1) {
      clearInterval(countdown);
      finshed();
    }
  }, 1000);

  function allTime(second) {
    let min = Math.floor(second / 60);
    let sec = Math.floor(second % 60);
    hello.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  function finshed() {
    quizContainer.style.display = 'none';
    html.parentNode.parentNode.style.display = "block";
  }
}

const question = document.querySelector(".cc");
const answers = document.querySelector(".answers"); 
let proceed = document.getElementById("proceed");

fetch("./Questions.json")
               .then(Response=>Response.json())
               .then(data => {

      

               proceed.addEventListener("click",()=>{
                 
                question.innerHTML=data[0].questions[0];
              
                              
                for(var i = 0 ; i < answers.childElementCount ; i++){
                  
                  //answers.children.item(i).innerHTML = i + 
                
                  answers.children.item(i).innerHTML = i + "-    " +  data[0].answers[0][i];
                      

                }
            

     
               })

 })