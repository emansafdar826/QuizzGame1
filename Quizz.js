const questions  = [
    {
        question:"What is the national animal of Pakistan",
        answers: [
            { text: "Chinkara", correct: false},
            { text: "Snow Leopard", correct: false},
            { text: "Markhor", correct: true},
            { text: "Blackbuck", correct: false},
        ]
    },
    {
         question:"Who painted the famous Mona Lisa?",
        answers: [
            { text: "Pablo Picasso", correct: false},
            { text: "Leonardo da Vinci", correct: true},
            { text: "Vincent van Gogh", correct: false},
            { text: "Michelangelo", correct: false},
        ]
    },
    {
         question:"Which is the largest ocean in the world?",
        answers: [
            { text: "Atlantic Ocean", correct: false},
            { text: "Indian Ocean", correct: false},
            { text: "Arctic Ocean", correct: false},
            { text: "Pacific Ocean", correct: true},
        ]
    },
    {
         question:"In which year did Islamabad become the capital of Pakistan?",
        answers: [
            { text: "1960", correct: true},
            { text: "1958", correct: false},
            { text: "1963", correct: false},
            { text: "1965", correct: false},
        ]
    },
    {
         question:"Who won the Cricket World Cup in 1992?",
        answers: [
            { text: "Australia", correct: false},
            { text: "England", correct: false},
            { text: "Pakistan", correct: true},
            { text: "India", correct: false},
        ]
    }
    ,
    {
         question:"Which is the largest organ in the human body?",
        answers: [
            { text: "Liver", correct: false},
            { text: "Skin", correct: true},
            { text: "Brain", correct: false},
            { text: "Lungs", correct: false},
        ]
    }
    ,
    {
         question:"A “Light Year” is a unit of what?",
        answers: [
            { text: "Distance", correct: true},
            { text: "Time", correct: false},
            { text: "Speed", correct: false},
            { text: "Energy", correct: false},
        ]
    },
    {
         question:"Which is the tallest mountain in the world?",
        answers: [
            { text: "Mount Kilimanjaro", correct: false},
            { text: "Mount Everest", correct: true},
            { text: "Mount Elbrus", correct: false},
            { text: "K2", correct: false},
        ]
    }
    ,
    {
         question:"Which is the smallest province of Pakistan by area?",
        answers: [
            { text: "Punjab", correct: false},
            { text: "Khyber Pakhtunkhwa", correct: false},
            { text: "Sindh", correct: true},
            { text: "Balochistan", correct: false},
        ]
    }
    ,
    {
         question:"Who is known as the “Father of the Internet”?",
        answers: [
            { text: "Vinton Cerf", correct: true},
            { text: "Charles Babbage", correct: false},
            { text: "Alan Turing", correct: false},
            { text: "Tim Berners-Lee", correct: false},
        ]
    }
     ,
    {
         question:"What is the approximate total length of the Great Wall of China?",
        answers: [
            { text: "15,300 km", correct: false},
            { text: "13,170 km", correct: true},
            { text: "10,220 km", correct: false},
            { text: "8,850 km", correct: false},
        ]
    }
     ,
    {
         question:"What is the full form of DNA?",
        answers: [
            { text: "Double Nucleotide Acid", correct: false},
            { text: "Dextrose Nitrogen Acid", correct: false},
            { text: "Deoxynitric Acid", correct: false},
            { text: "Deoxyribonucleic Acid", correct: true},
        ]
    }
     ,
    {
         question:"Which planet is known as the “Morning Star” and the “Evening Star”?",
        answers: [
            { text: "Jupiter", correct: false},
            { text: "Mars", correct: false},
            { text: "Venus", correct: true},
            { text: "Mercury", correct: false},
        ]
    }
     ,
    {
         question:"In which year was the first Nobel Prize awarded?",
        answers: [
            { text: "1895", correct: false},
            { text: "1901", correct: true},
            { text: "1910", correct: false},
            { text: "1925", correct: false},
        ]
    }
    ,
    {
         question:"Who was the teacher of Alexander the Great?",
        answers: [
            { text: "Socrates", correct: false},
            { text: "Aristotle", correct: true},
            { text: "Plato", correct: false},
            { text: "Pythagoras", correct: false},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;


function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    question = shuffleArray(questions);
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>  {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer);  
    });
}


function resetState(){
     nextButton.style.display = "none";
     while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct ===  "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();