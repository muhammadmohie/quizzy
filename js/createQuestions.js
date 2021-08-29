function createQuestion(title, answers, correctAnswer) {
    let html = `<div><li>
        <div class="question"><div class = "question-title">
            <h2  "class="question-title" contenteditable="false" onfocusout ="upDArrayT(this)">${title}</h2><div class = "title-buttons"><button class = "answer-edit" onclick="editTitle(this);"><i class=" fas fa-edit" data-html2canvas-ignore="true"></i></button><button class ="trash-can" onclick="removeQ(this);"><i class="fas fa-trash" data-html2canvas-ignore="true"></i></button></div></div>`

    html += '<ol class="answer-list">'
    for(let answer of answers) {
        if (answer)
        html += `<div class="answer-row-cont"><li contenteditable="false"  onfocusout ="upDArrayA(this)">${answer}</li><button class = "answer-edit" onclick="editA(this)"; ><i class="fas fa-edit" data-html2canvas-ignore="true"></i></button></div>`

    }
    html += '</ol>'
    html += `<div class="correct-answer-div" data-html2canvas-ignore="true">
        correct answer: <span class="correct-answer">${String.fromCharCode(65 + correctAnswer)}</span>
        </div>`
    html += '</div>'
    html += '</li></div>'
    return html
}