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
    // Question 1
    {
        question: "Which of the following passwords is the most secure?",
        choice1: "123456",
        choice2: "Car789",
        choice3: "ILoveMySon",
        choice4: "WTh!5Z",
        answer: 4,
    },
    {
        // Question 2
        question: "When is it OK to reuse a password?",
        choice1: "When you are logging into social media accounts",
        choice2: "When it is too hard to remember a long password",
        choice3: "Never",
        choice4: "If your boss or employers tell you to",
        answer: 3,
    },
    {
        // Question 3
        question: "Which of the following describes Ransomware?",
        choice1: "Software that tracks a person's movements then takes them hostage when alone",
        choice2: "Takes control of your computer or phone while you are using it",
        choice3: "Malicious software designed to block access to a computer system until a sum of money is paid",
        choice4: "Spies on you and gathers information",
        answer: 3,
    },
    {
        // Question 4
        question: "The best defence against ransomware is being proactive when you___",
        choice1: "Purchase comprehensive cybersecurity insurance",
        choice2: "Back up your data regularly",
        choice3: "Regularly update all your devices and software with the latest security patches",
        choice4: "Change your password regularly",
        answer: 2,
    },
    {
        // Question 5
        question: "Which one of these things is most effective for maintaining your digital privacy?",
        choice1: "Unsubscribing from all spam emails",
        choice2: "Covering your computer's front-facing camera",
        choice3: "Not sharing personal information on social media",
        choice4: "Installing Antivirus",
        answer: 3,
    },
    {
        // Question 6
        question: "Why it is important to update antivirus software regularly?",
        choice1: "Prevent the spread of malicious programs on the Internet",
        choice2: "Protect your computer from unwanted bulk messages",
        choice3: "Protect your computer from all known viruses",
        choice4: "To ensure the software identifies old viruses",
        answer: 3,
    },
    {
        // Question 7
        question: "You received an email from Microsoft explaining that your password it out of date, and you must set a new one. The link within the email will guide you through it. Your next step is?",
        choice1: "Follow the link and reset your password",
        choice2: "Ignore the email and delete it",
        choice3: "Reset your password manually",
        choice4: "Forward email on to friends/family",
        answer: 2,
    },
    {
        // Question 8
        question: "What is recommended  to prevent the risk of unauthorised access to home Wi-Fi?",
        choice1: "Change the default login credentials and password for the home router",
        choice2: "Disconnect the computer from the network",
        choice3: "Adjust the Internet security settings",
        choice4: "Complain to the Internet Service Provider",
        answer: 1,
    },
    {
        // Question 9
        question: "Which one of the following is MOST likely to be a hoax?",
        choice1: "An email from a friend you have not seen recently",
        choice2: "An email asking you to go to a website for a free computer scan",
        choice3: "An email advertisement from a local shop you subscribe to",
        choice4: "An email with an attachment sent by a colleague using their personal email address",
        answer: 2,
    },
    {
        // Question 10
        question: "What's the best way to secure a weak password like 'house123'?",
        choice1: "Add an uppercase letter and a special character, such as @",
        choice2: "Don't reuse it anywhere else or share it with anyone",
        choice3: "Enable Two-Factor Authentication",
        choice4: "Add more numbers",
        answer: 3,
    },
    {
        // Question 11
        question: "What should you do if you think your identity or accounts have been compromised?",
        choice1: "Monitor your email address and accounts for fraudulent activity",
        choice2: "Subscribe to a monitoring service such as LifeLock or WebWatcher",
        choice3: "Respond to the warning email you have received",
        choice4: "Nothing, banks have systems in place to deal with this",
        answer: 1,
    },
    {
        // Question 12
        question: "Which one of the following statements about a password is TRUE?",
        choice1: "It should be changed regularly",
        choice2: "It cannot contain special character symbols",
        choice3: "It must be changed only if it is compromised",
        choice4: "Write it down somewhere in case you forget it",
        answer: 1,
    },
    {
        // Question 13
        question: "Which one of the following ensures your Computer/Laptop is kept safe in a busy enviorment?",
        choice1: "Use a VPN",
        choice2: "Turn off the Bluetooth",
        choice3: "Only use it in private surroundings",
        choice4: "Never leave it unattended",
        answer: 4,
    },
    {
        // Question 14
        question: "Which of the following describes Phishing?",
        choice1: "Attacks pretending to be legitimate with the aim of tricking people into revealing passwords or bank details",
        choice2: "Tracking your computer movements and 'Phishing out' your actions",
        choice3: "A way of stealing your identity",
        choice4: "All of the above",
        answer: 1,
    },
    {
        // Question 15
        question: "What is the best way to stop falling for Phishing scams?",
        choice1: "Email filters that block suspicious attachments",
        choice2: "Pop-up blockers",
        choice3: "Cybersecurity awareness training",
        choice4: "Antivirus software",
        answer: 3,
    },

]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

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