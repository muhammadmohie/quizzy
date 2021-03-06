let oldT ="";

function removeQ(btn){  //Remove a whole question.
    questions.splice(questions.findIndex(x => x.title.trim() === String(btn.closest(".question").innerText.trim())),1);oldT ="";
    (btn.closest(".question").parentNode).remove(btn.parentNode);
    if (questions.length == 0)
        document.querySelectorAll('.hide').forEach(el => el.style.display = "none")
    
}

    //temp for the old value to get the index of the changed question.
function editTitle(btn){    //edit the title in HTML only.
    if(oldT ===""){ //handle when two edit button are clicked at the same time

        oldT = String((btn.closest(".question-title").innerText.trim()));
        btn.closest(".question-title").firstElementChild.setAttribute("contenteditable","true");
        btn.closest(".question-title").firstElementChild.setAttribute("style","border:1px solid; border-radius:5px;");

    }
    else
    {
        alert("Please Edit the marked field first before editing another.")
    }
}
function upDArrayT(field){  //edit the title in Array using outoffoucs attribute.
    questions[questions.findIndex(x => x.title.trim() === oldT)].title = String(field.innerText.trim());
    field.setAttribute("contenteditable","false")
    field.setAttribute("style","border:none;")
    oldT =""; 
}
function editA(btn){    //edit the answer in HTML only.
    //console.log(oldT = String((btn.parentNode).firstElementChild.innerText.trim()));
    if(oldT ===""){ //handle the error when two edit button are clicked at the same time

        oldT = String((btn.parentNode).firstElementChild.innerText.trim());    //get the text of the list item in the same div as the edit button.
        (btn.parentNode).firstElementChild.setAttribute("contenteditable","true");
        (btn.parentNode).firstElementChild.setAttribute("style","border:1px solid; border-radius:5px;")
    }
    else
    {
        alert("Please Edit the marked field first before editing another.")
    }
}
function upDArrayA(field){  //edit answer in Array using outoffocus attribute.
    let qIndex = parseInt(questions.findIndex(x => x.title.trim() === String(field.closest(".question").firstElementChild.firstElementChild.innerText.trim())));  //question index
    let aIndex = parseInt(questions[qIndex].answers.findIndex(x => x === oldT));    //answer index
    questions[qIndex].answers[aIndex] = String(field.innerText.trim());
    field.setAttribute("contenteditable","false")
    field.setAttribute("style","border:none;")
    oldT =""; 
}
function removeQuiz(btn){
    questions.splice(0,questions.length);
    btn.closest(".container").style.display = "none";
}