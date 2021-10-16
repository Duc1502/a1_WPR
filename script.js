let attempt_id;
//move to screen 2
function startQuiz() {
    const openQuiz= document.querySelector('#quiz');
    const hideIntro= document.querySelector('#introduction');
    openQuiz.classList.remove('hidden');
    hideIntro.classList.add('hidden');

    fetch('https://wpr-quiz-api.herokuapp.com/attempts',{
        method: 'POST',
    }).then(onResponse).then(onJson);
    }   

    const start = document.querySelector('.blue');
    start.addEventListener('click', startQuiz); 
    

function onJson(json){
    attempt_id = json._id;
    const allQuestion = json.questions;
    console.log(allQuestion)
    const quest = allQuestion.map(function(question, index){
        return`<div id="${question._id}">
            <h2>Question ${index+1} of 10</h2>
            <p> ${question.text}</p>
            ${question.answers.map(function(answer, index1){
                return` <div id="${index1}" class="option" onclick="highlight(event)">
                    <input type="radio" name="${question._id}" value="${index1}">&nbsp;${convert(answer)}
                </div>`
            }).join('')}
        </div>`
    })
    let addQuestion= quest.join('');
    document.querySelector('#questions').innerHTML+=addQuestion;
}
function convert(convert) {
    return convert.replace(/</g, "&lt").replace(/>/g, "&gt");
}

// move to screen 3
function submitAnswer(){
    const result = document.querySelector('#review-quiz');
    const erase = document.querySelector('.submit_answer');
    result.classList.remove('hidden');
    erase.classList.add('hidden');

    const listques = document.querySelectorAll('.option');
    fetch('https://wpr-quiz-api.herokuapp.com/attempts/'+ attempt_id + '/submit',{
        method: 'POST',
        headers: { 'Content Type': 'application/json'
            }
    }).then(onResponse).then(onResult);
    }

     const submit = document.querySelector('.green');
     submit.addEventListener('click', submitAnswer);

function onResult(result){
    const corAns = result.answers;
}
function onResponse(response){
    return response.json();
}

function highlight(event){
    event.currentTarget.querySelector('input[type="radio"]').checked==true;
    const options = document.querySelectorAll('.option');
    for(let i = 0; i < options.length; i++){
        if(options[i].querySelector('input[type="radio"]').checked==true){
            options[i].classList.add('checked_label');
        }else{
            options[i].classList.remove('checked_label');
        }
    }
}
    const done = document.querySelector('.green');
    done.addEventListener('click', highlight);

    // var correctAnslable = document.createElement("DIV")
    // correctAnslable.textContent = 'Correct answer';
    // correctAnslable.classList.add('correctAnslable')
    // $(${id}).querySelector(div[id="${correctAnswers[id]}"]).append(correctAnslable)

    // if ($(${id}).querySelector(".box.selected") == null) {
   
    //     $(${id}).querySelector(div[id="${correctAnswers[id]}"]).classList.add('CorrectAnswerNotChoosed')
    // }

    // else {
    //     const a = $(${id}).querySelector(".box.selected").querySelector('input[type="radio"]').value
       
    //     if ($(${id}).querySelector(".box.selected") == $(${id}).querySelector(div[id="${correctAnswers[id]}"])) {
          
    //         $(${id}).querySelector(div[id="${correctAnswers[id]}"]).classList.add('CorrectAnswer')

    //         $(${id}).querySelector(div[id="${correctAnswers[id]}"]).classList.remove('selected')

    //     }

    //     else {

    //         var yourAnslable = document.createElement("DIV")
    //         yourAnslable.textContent = 'Your answer';
    //         yourAnslable.classList.add('yourAnslable')
    //         $(${id}).querySelector(".box.selected").append(yourAnslable)
    //         $(${id}).querySelector(".box.selected").classList.add('WrongAnswer')
    //         $(${id}).querySelector(div[id="${correctAnswers[id]}"]).classList.add('CorrectAnswerNotChoosed')
    //     }
    // }

