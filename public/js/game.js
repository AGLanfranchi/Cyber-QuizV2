const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which of the following passwords is the most secure?",
        choice1: "123456",
        choice2: "Car789",
        choice3: "ILoveMySon",
        choice4: "WTh!5Z",
        answer: 4,
    },
    {
        question: "When is it OK to reuse a password?",
        choice1: "When you are logging into social media accounts",
        choice2: "When it is too hard to remember a long password",
        choice3: "Never",
        choice4: "If your boss or employers tell you to",
        answer: 3,
    },
    {
        question: "Which one of these things is most effective for maintaining your digital privacy?",
        choice1: "Unsubscribing from all spam emails",
        choice2: "Covering your computer's front-facing camera",
        choice3: "Not sharing personal information on social media",
        choice4: "Installing Antivirus",
        answer: 3,
    },
    {
        question: "Why it is important to update antivirus software regularly?",
        choice1: "To prevent the spread of malicious programs on the Internet.",
        choice2: "To protect your computer from unwanted bulk messages.",
        choice3: "To protect your computer from all known viruses",
        choice4: "To ensure the software identifies old viruses.",
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.getElementsByClassName.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
    
         }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()