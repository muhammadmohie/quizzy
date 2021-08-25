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
            <h2  "class="question-title">${title}</h2><button class ="trash-can" onclick="removeQ(this);" style = "all:unset;"><i class="fas fa-trash"></i></button></div>`

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