const path = require('path')
const fs = require('fs')

const express = require('express')
const api = express()

api.use(express.urlencoded({extended: false}))
api.use(express.json())
api.use(require('cors')({origin: '*', optionsSuccessStatus: 200}))

api.get('/quizzes', (req, res) => {
    let quizzes = getQuizzes()
    return res.json(quizzes.map(quizz => quizz.name))
})

api.post('/quizzes', (req, res) => {
    let quiz = req.body
    let quizzes = getQuizzes()
    let index = quizzes.map(element => element.name).indexOf(quiz.name)
    if(index > -1) {
        quizzes.splice(index, 1, quiz)
    }
    else {
        quizzes.push(quiz)
    }
    saveQuizzes(quizzes)
    res.sendStatus(200)
})

api.get('/quizzes/:quiz', (req, res) => {
    let name = req.params.quiz
    let quizzes = getQuizzes()
    res.json(quizzes.filter(quizz => quizz.name == name)[0])
})

api.delete('/quizzes/:quiz', (req, res) => {
    let name = req.params.quiz
    let quizzes = getQuizzes()
    let index = quizzes.findIndex(quiz => quiz.name == name)
    if (index == -1)
        return res.sendStatus(404)
    quizzes.splice(index, 1)
    saveQuizzes(quizzes)
    res.sendStatus(200)
})

const port = 3000

api.listen(port, () => console.log(`Server running at port ${port}`))

function getQuizzes() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'quizzes.json'), {encoding: 'utf8'}))   
}

function saveQuizzes(quizzes) {
    fs.writeFileSync(path.join(__dirname, 'quizzes.json'), JSON.stringify(quizzes), {encoding: 'utf8'})
}
