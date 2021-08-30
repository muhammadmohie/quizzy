let questions = [];
(async () => {
    // Get quizzes
    let quizzes = await fetch('http://127.0.0.1:3000/quizzes').then(res => res.json())
    // Display quizzes
    let quizzesList = document.querySelector('.premade-quizzes')
    quizzes.forEach(quiz => quizzesList.innerHTML += `<button class="quizzes" href="#">${quiz}</button>`)
    // Add eventListener
    document.querySelectorAll('.quizzes').forEach(btn => btn.addEventListener('click', async () => {
        let quizName = btn.innerText
        let quiz = await fetch(`http://127.0.0.1:3000/quizzes/${quizName}`).then(res => res.json())
        questions = quiz.questions
        document.querySelectorAll('.hide').forEach(div => div.style.visibility = "visible")
        let quizQuestions = document.querySelector('.questions')
        quizQuestions.innerHTML = ''
        quiz.questions.forEach(question => {
            quizQuestions.innerHTML += createQuestion(question.title, question.answers, question["correct-answer"])
        })
        // Add button click events
        
        document.querySelector('#save-quiz').onclick = () => {
            postData('http://127.0.0.1:3000/quizzes', {
                name: quizName,
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
        
    }))
})()

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
