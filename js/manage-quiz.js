let questions = [];
async function displayQuizzes()  {
    // Get quizzes
    let quizzes = await getQuizzes()
    // Display quizzes
    let quizzesList = document.querySelector('.premade-quizzes')
    quizzesList.innerHTML = ''
    quizzes.forEach(quiz => quizzesList.innerHTML += `<button class="quizzes" href="#">${quiz}</button>`)
    // Add eventListener
    document.querySelectorAll('.quizzes').forEach(btn => btn.addEventListener('click', async () => {
        let quizName = btn.innerText
        document.querySelector('#quiz-name').innerText = "Quiz:" + quizName;
        let quiz = await fetch(`http://127.0.0.1:3000/quizzes/${quizName}`).then(res => res.json())
        questions = quiz.questions
        document.querySelectorAll('.hide').forEach(div => div.style.display = "flex")
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
}
displayQuizzes()

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

async function getQuizzes() {
    return fetch('http://127.0.0.1:3000/quizzes').then(res => res.json())
}

let deleteBtn = document.querySelector('.remove-quiz')
    deleteBtn.addEventListener('click', async (e) => {
        removeQuiz(deleteBtn)
        await fetch(`http://127.0.0.1:3000/quizzes/${document.querySelector('#quiz-name').innerText}`, {method: "DELETE"})
        .then(res => console.log(res))
        await displayQuizzes()
        console.log('realoded')
    })