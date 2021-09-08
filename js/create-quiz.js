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
    if (questions.length > 0)
        document.querySelector('.hide').style.display = "initial"
})


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
    postData('https://project-quizzy.herokuapp.com/quizzes', {
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

