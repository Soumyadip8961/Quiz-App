const url = "https://opentdb.com/api.php?amount=5&type=multiple"
let questions = []
let currentQsIndex = 0
let score = 0
let number = 0
let count = 0
const qsAns = async () => {
    let response = await fetch(url)
    let resJson = await response.json()


    questions = []
    for (let i = 0; i < 5; i++) {
        questions.push({
            question: resJson.results[i].question,
            answers: []

        })
        number = Math.floor(Math.random() * 4)
        questions[i].answers[number] = { text: resJson.results[i].correct_answer, correct: true }
        count = 0
        for (let j = 0; j < resJson.results[i].incorrect_answers.length + 1; j++) {

            if (j === number) {
                continue
            }
            else {
                questions[i].answers[j] = { text: resJson.results[i].incorrect_answers[count], correct: false }
                count++
            }
        }

    }
    stratQiuz()




}
qsAns()

next_btn = document.getElementById('next-btn')
function stratQiuz() {
    currentQsIndex = 0
    score = 0
    next_btn.innerHTML = 'Next'
    showQs()
}
Answer_Buttons = document.getElementById('Answer_Buttons')
function showQs() {
    resetQs()
    let currentQsNum = currentQsIndex + 1
    let currentQs = questions[currentQsIndex]
    questionElem.innerHTML = currentQsNum + '. ' + currentQs.question

    currentQs.answers.forEach((ans) => {
        const button = document.createElement('button')
        button.innerHTML = ans.text
        button.classList.add('btn')
        Answer_Buttons.appendChild(button);
        if (ans.correct) {
            button.dataset.correct = ans.correct
        }
        button.addEventListener('click', chosenAns)

    });
}
function resetQs() {
    next_btn.style.display = "none"
    while (Answer_Buttons.firstChild) {
        Answer_Buttons.removeChild(Answer_Buttons.firstChild)
    }
}

function chosenAns(e) {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct
    next_btn.style.display = "block"
    if (isCorrect) {
        // selectBtn.classList.add("correct")
        score += 1
    }
    else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(Answer_Buttons.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true;


    })

}

next_btn.addEventListener('click', () => {
    if (currentQsIndex < questions.length) {
        nextQs()
    }
    else {
        qsAns()

    }
})

function nextQs() {
    currentQsIndex += 1;
    if (currentQsIndex < questions.length) {
        showQs()
    }
    else {
        showScore()
    }
}

function showScore() {
    resetQs()
    questionElem.innerHTML = `Your Score is ${score} out of ${questions.length}`
    next_btn.innerHTML = 'Play Again'
    next_btn.style.display = "block"


}








