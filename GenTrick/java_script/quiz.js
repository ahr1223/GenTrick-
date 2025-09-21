document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    
    const questionTextEl = document.getElementById('question-text');
    const answerButtonsEl = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');

    let currentQuestionIndex = 0;
    const questions = [
        { question: "When you have free time, what are you most likely to be doing?", answers: ["Reading or learning something new", "Tinkering with gadgets or building something", "Organizing an event with friends", "Creating art, music, or writing"] },
        { question: "How do you prefer to solve a problem?", answers: ["By analyzing data and looking for patterns", "By brainstorming creative, out-of-the-box ideas", "By discussing it with a team for different perspectives", "By creating a structured, step-by-step plan"] },
        { question: "A project you are leading is falling behind. What is your immediate action?", answers: ["Re-evaluate the project plan to find inefficiencies", "Talk to each team member to understand the roadblocks", "Look for a technical shortcut or a more efficient tool", "Communicate the delay to stakeholders with a revised plan"] },
        { question: "Which long-term achievement would give you the most satisfaction?", answers: ["Becoming a leading expert in a specialized technical field", "Launching a successful product or company from scratch", "Creating a famous piece of art or design that inspires people", "Building and mentoring a high-performing, happy team"] }
    ];

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', handleNextButton);

    function startQuiz() {
        startScreen.style.display = 'none';
        quizSection.style.display = 'block';
        currentQuestionIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionTextEl.innerText = `(${currentQuestionIndex + 1}/${questions.length}) ${currentQuestion.question}`;
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('btn-answer');
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
    }

    function resetState() {
        nextBtn.disabled = true;
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.innerText = 'Finish';
        } else {
            nextBtn.innerText = 'Next';
        }
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        Array.from(answerButtonsEl.children).forEach(button => button.classList.remove('selected'));
        e.target.classList.add('selected');
        nextBtn.disabled = false;
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        quizSection.style.display = 'none';
        resultsSection.style.display = 'block';
    }
});