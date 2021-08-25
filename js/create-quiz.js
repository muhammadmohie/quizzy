questions = []
const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    let question = form.querySelector('.question-title')
    let firstAnswer = form.querySelector('.first-answer')
    let secondAnswer = form.querySelector('.second-answer')
    let thirdAnswer = form.querySelector('.third-answer')
    let fourthAnswer = form.querySelector('.fourth-answer')
    let correctAnswer = parseInt(form.querySelector('#correct-answer').value) // Index of answer 0:3
    let answers = [firstAnswer.value, secondAnswer.value, thirdAnswer.value, fourthAnswer.value]
    questions.push({
        title: question.value,
        answers: answers,
        "correct-answer": correctAnswer
    })
    const list = document.querySelector('.questions')
    let createdQuestion = createQuestion(question.value, answers, correctAnswer)
    list.innerHTML += createdQuestion
    question.value = ''
    firstAnswer.value = ''
    secondAnswer.value = ''
    thirdAnswer.value = ''
    fourthAnswer.value = ''
    question.focus()
    console.log(questions)
})

function createQuestion(title, answers, correctAnswer) {
    let html = `<div><li>
        <div class="question"><div class = "question-title">
            <h2  "class="question-title">${title}</h2><button class ="trash-can" onclick="removeQ(this);" style = "all:unset;"><i class="fas fa-trash" data-html2canvas-ignore="true"></i></button></div>`

    html += '<ol class="answer-list">'
    for(let answer of answers) {
        if (answer)
        html += `<li>${answer}</li>`
    }
    html += '</ol>'
    html += `<div class="correct-answer-div" data-html2canvas-ignore="true">
        correct answer: <span class="correct-answer">${String.fromCharCode(65 + correctAnswer)}</span>
        </div>`
    html += '</div>'
    html += '</li></div>'
    return html
}
function removeQ(btn){
    (((btn.parentNode).parentNode).parentNode).remove(btn.parentNode);
}
document.querySelector('#print-quiz').onclick = () => {
    let questions = document.querySelector('.questions')
    html2pdf(questions, {filename: 'questions.pdf'})
}

document.querySelector('#print-answers').onclick = () => {
    let answers = document.querySelectorAll('.correct-answer')
    let html = '<ol>'
    answers.forEach((answer) => {
        html += `<li>${answer.innerText}</li>`
    })
    html += '</ol>'
    html2pdf(html, {filename: 'answers.pdf'})
}

document.querySelector('#save-quiz').onclick = () => {
    let quizzName = document.querySelector('#quiz-name').value
    postData('http://127.0.0.1:3000/quizzes', {
        name: quizzName,
        questions: questions
    })
    .then(response => {
        if (response.ok)
            alert('Quiz saved successfully.')
        else {
            alert('Something went wrong.')
        }
    })
}


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response;
  }