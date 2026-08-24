const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0
    },

    {
        question: "Bahasa yang digunakan untuk mengatur tampilan website adalah?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: 1
    },

    {
        question: "Planet terbesar di tata surya adalah?",
        answers: [
            "Bumi",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        correct: 2
    },

    {
        question: "Berapa hasil dari 12 × 8?",
        answers: [
            "86",
            "96",
            "108",
            "88"
        ],
        correct: 1
    },

    {
        question: "Bahasa pemrograman yang berjalan di browser adalah?",
        answers: [
            "JavaScript",
            "C++",
            "Java",
            "Assembly"
        ],
        correct: 0
    },

    {
        question: "Organ yang digunakan manusia untuk memompa darah adalah?",
        answers: [
            "Paru-paru",
            "Ginjal",
            "Jantung",
            "Lambung"
        ],
        correct: 2
    },

    {
        question: "Ibu kota Indonesia saat ini adalah?",
        answers: [
            "Bandung",
            "Jakarta",
            "Surabaya",
            "Medan"
        ],
        correct: 1
    },

    {
        question: "H2O adalah rumus kimia untuk?",
        answers: [
            "Oksigen",
            "Hidrogen",
            "Air",
            "Karbon dioksida"
        ],
        correct: 2
    },

    {
        question: "Tag HTML untuk membuat judul terbesar adalah?",
        answers: [
            "<h1>",
            "<h6>",
            "<title>",
            "<head>"
        ],
        correct: 0
    },

    {
        question: "Apa fungsi utama JavaScript pada website?",
        answers: [
            "Menyimpan listrik",
            "Membuat website interaktif",
            "Mengatur kabel komputer",
            "Mengganti sistem operasi"
        ],
        correct: 1
    }
];


const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const timerElement = document.getElementById("timer");

const questionNumberElement =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const feedbackElement =
    document.getElementById("feedback");

const finalScoreElement =
    document.getElementById("finalScore");

const resultMessageElement =
    document.getElementById("resultMessage");


let currentQuestion = 0;
let score = 0;
let lives = 3;
let timeLeft = 15;
let timer = null;
let answered = false;


// Memulai game
function startGame() {

    currentQuestion = 0;
    score = 0;
    lives = 3;

    scoreElement.textContent = score;
    livesElement.textContent = lives;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}


// Menampilkan soal
function showQuestion() {

    clearInterval(timer);

    answered = false;
    feedbackElement.textContent = "";

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumberElement.textContent =
        'Soal ${currentQuestion + 1} / ${questions.length}';

    const progress =
        '(currentQuestion / questions.length) * 100';

    progressBar.style.width = '${progress}%';

    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer");

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });

    startTimer();
}


// Timer
function startTimer() {

    timeLeft = 15;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            timeOut();
        }

    }, 1000);
}


// Jawaban dipilih
function checkAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    clearInterval(timer);

    const current = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedIndex === current.correct) {

        selectedButton.classList.add("correct");

        score += 100;

        feedbackElement.textContent =
            "✅ Benar! +100 poin";

        scoreElement.textContent = score;

    } else {

        selectedButton.classList.add("wrong");

        buttons[current.correct].classList.add("correct");

        lives--;

        livesElement.textContent = lives;

        feedbackElement.textContent =
            "❌ Salah!";

        if (lives <= 0) {

            setTimeout(() => {
                endGame();
            }, 1000);

            return;
        }
    }

    setTimeout(nextQuestion, 1000);
}


// Waktu habis
function timeOut() {

    if (answered) {
        return;
    }

    answered = true;

    const current = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(button => {
        button.disabled = true;
    });

    buttons[current.correct].classList.add("correct");

    lives--;

    livesElement.textContent = lives;

    feedbackElement.textContent =
        "⏰ Waktu habis!";

    if (lives <= 0) {

        setTimeout(() => {
            endGame();
        }, 1000);

        return;
    }

    setTimeout(nextQuestion, 1000);
}


// Soal berikutnya
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        endGame();

    } else {

        showQuestion();
    }
}


// Game selesai
function endGame() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreElement.textContent =
        score;

    let message;

    if (score >= 900) {
        message = "🔥 Luar biasa! Kamu Quiz Master!";
    } else if (score >= 700) {
        message = "😎 Mantap! Pengetahuanmu bagus!";
    } else if (score >= 400) {
        message = "👍 Lumayan! Terus latihan!";
    } else {
        message = "💪 Jangan menyerah, coba lagi!";
    }

    resultMessageElement.textContent = message;
}


// Tombol mulai
startBtn.addEventListener("click", startGame);


// Tombol main lagi
restartBtn.addEventListener("click", startGame);