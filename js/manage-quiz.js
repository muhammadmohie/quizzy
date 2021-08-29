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
        console.log(questions)
        let quizQuestions = document.querySelector('.questions')
        quizQuestions.innerHTML = ''
        quiz.questions.forEach(question => {
            quizQuestions.innerHTML += createQuestion(question.title, question.answers, question["correct-answer"])
        })
    }))
})()



