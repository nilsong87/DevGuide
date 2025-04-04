// Quiz Data - Perguntas para JavaScript, Python e C++
const quizData = {
    javascript: [
        {
            question: "Qual método é usado para adicionar um elemento ao final de um array em JavaScript?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            answer: 0,
            explanation: "O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array."
        },
        {
            question: "Como você declara uma variável que não pode ser reatribuída em JavaScript?",
            options: ["let", "var", "const", "static"],
            answer: 2,
            explanation: "A palavra-chave 'const' é usada para declarar constantes em JavaScript. O valor não pode ser reatribuído, embora objetos e arrays declarados com const possam ter seus conteúdos modificados."
        },
        {
            question: "Qual é o resultado de '2' + 2 em JavaScript?",
            options: ["4", "'22'", "NaN", "Erro"],
            answer: 1,
            explanation: "O operador + realiza concatenação quando um dos operandos é uma string. Neste caso, o número 2 é convertido para string e concatenado com '2'."
        },
        {
            question: "O que é hoisting em JavaScript?",
            options: [
                "Elevação de variáveis e funções para o topo de seu escopo",
                "Um tipo de loop",
                "Um método de ordenação de arrays",
                "Um padrão de design"
            ],
            answer: 0,
            explanation: "Hoisting é um comportamento do JavaScript onde declarações de variáveis e funções são movidas para o topo de seu escopo antes da execução do código."
        },
        {
            question: "Qual destes NÃO é um tipo primitivo em JavaScript?",
            options: ["string", "number", "boolean", "array"],
            answer: 3,
            explanation: "Os tipos primitivos em JavaScript são: string, number, boolean, null, undefined, symbol (ES6) e bigint (ES11). Arrays são objetos."
        }
    ],
    python: [
        {
            question: "Como você cria uma lista vazia em Python?",
            options: ["list()", "[]", "Ambos acima", "Nenhum acima"],
            answer: 2,
            explanation: "Em Python, você pode criar uma lista vazia usando list() ou [] - ambos são equivalentes."
        },
        {
            question: "Qual é a saída de print(3 * 'abc') em Python?",
            options: ["abcabcabc", "3abc", "Erro", "abc abc abc"],
            answer: 0,
            explanation: "Em Python, multiplicar uma string por um inteiro n concatena a string n vezes."
        },
        {
            question: "O que faz a função range(5) em Python?",
            options: [
                "Retorna uma lista de 0 a 5",
                "Retorna um iterável de 0 a 4",
                "Retorna um iterável de 1 a 5",
                "Gera números aleatórios até 5"
            ],
            answer: 1,
            explanation: "range(5) gera uma sequência de números de 0 até 4 (5 não incluso). Em Python 3, range retorna um objeto range (iterável), não uma lista."
        },
        {
            question: "Qual é usado para comentários de múltiplas linhas em Python?",
            options: [
                "/* ... */",
                "// ... //",
                "''' ... ''' ou \"\"\" ... \"\"\"",
                "# ... #"
            ],
            answer: 2,
            explanation: "Python usa triplas aspas simples ou duplas para docstrings e comentários de múltiplas linhas, embora não seja tecnicamente um comentário (é uma string não atribuída)."
        },
        {
            question: "Como você verifica se uma chave existe em um dicionário?",
            options: [
                "key in dict",
                "dict.has_key(key)",
                "dict.exists(key)",
                "dict.contains(key)"
            ],
            answer: 0,
            explanation: "A forma Pythonica de verificar se uma chave existe em um dicionário é usando o operador 'in' (ex: 'key in my_dict')."
        }
    ],
    cpp: [
        {
            question: "Qual é o operador para acessar membros de uma classe através de um ponteiro?",
            options: [".", "::", "->", "*"],
            answer: 2,
            explanation: "O operador -> é usado para acessar membros de uma classe ou estrutura através de um ponteiro. O operador . é usado para acesso direto a membros."
        },
        {
            question: "O que significa 'OOP' em C++?",
            options: [
                "Object-Oriented Programming",
                "Operator Overloading Principle",
                "Object Operation Protocol",
                "Oriented Operation Programming"
            ],
            answer: 0,
            explanation: "OOP significa Programação Orientada a Objetos (Object-Oriented Programming), um paradigma de programação que usa objetos e classes."
        },
        {
            question: "Qual destes NÃO é um tipo de herança em C++?",
            options: ["Pública", "Privada", "Protegida", "Estática"],
            answer: 3,
            explanation: "C++ suporta herança pública, privada e protegida. 'Estática' não é um tipo de herança."
        },
        {
            question: "Para que serve a palavra-chave 'virtual' em C++?",
            options: [
                "Para permitir polimorfismo em funções membro",
                "Para criar variáveis que podem mudar de tipo",
                "Para declarar constantes",
                "Para otimizar o desempenho do código"
            ],
            answer: 0,
            explanation: "A palavra-chave 'virtual' é usada para criar funções virtuais que permitem polimorfismo em tempo de execução."
        },
        {
            question: "Qual é a complexidade de tempo do std::sort() na STL?",
            options: [
                "O(n log n)",
                "O(n²)",
                "O(log n)",
                "O(n)"
            ],
            answer: 0,
            explanation: "A função std::sort() da Standard Template Library (STL) tem complexidade O(n log n) no pior caso."
        }
    ]
};

// Quiz State
let currentQuiz = {
    language: 'javascript',
    currentQuestion: 0,
    score: 0,
    userAnswers: []
};

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizNext = document.getElementById('quiz-next');
const quizProgress = document.querySelector('#quiz-progress .progress-bar');

// Initialize Quiz
function initQuiz(language = 'javascript') {
    currentQuiz = {
        language,
        currentQuestion: 0,
        score: 0,
        userAnswers: []
    };
    
    // Update UI
    document.querySelectorAll('#langTabs button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${language}-tab`).classList.add('active');
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const questions = quizData[currentQuiz.language];
    const questionObj = questions[currentQuiz.currentQuestion];
    
    // Update progress
    const progress = ((currentQuiz.currentQuestion) / questions.length) * 100;
    quizProgress.style.width = `${progress}%`;
    quizProgress.setAttribute('aria-valuenow', progress);
    
    // Set question
    quizQuestion.innerHTML = `
        <h5>${currentQuiz.currentQuestion + 1}. ${questionObj.question}</h5>
    `;
    
    // Set options
    quizOptions.innerHTML = '';
    questionObj.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'list-group-item list-group-item-action';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        quizOptions.appendChild(optionElement);
    });
    
    // Disable next button until answer is selected
    quizNext.classList.add('disabled');
}

// Select Answer
function selectAnswer(answerIndex) {
    const questions = quizData[currentQuiz.language];
    const questionObj = questions[currentQuiz.currentQuestion];
    
    // Highlight selected answer
    const options = quizOptions.querySelectorAll('.list-group-item');
    options.forEach(option => option.classList.remove('active'));
    options[answerIndex].classList.add('active');
    
    // Store user answer
    currentQuiz.userAnswers[currentQuiz.currentQuestion] = answerIndex;
    
    // Enable next button
    quizNext.classList.remove('disabled');
}

// Check Answer and Move to Next Question
quizNext.addEventListener('click', function() {
    const questions = quizData[currentQuiz.language];
    const questionObj = questions[currentQuiz.currentQuestion];
    const userAnswer = currentQuiz.userAnswers[currentQuiz.currentQuestion];
    
    // Check if answer is correct
    const options = quizOptions.querySelectorAll('.list-group-item');
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === questionObj.answer) {
            option.classList.add('correct');
        } else if (index === userAnswer && userAnswer !== questionObj.answer) {
            option.classList.add('incorrect');
        }
    });
    
    // Add explanation
    const explanation = document.createElement('div');
    explanation.className = 'alert alert-info mt-3';
    explanation.innerHTML = `<strong>Explicação:</strong> ${questionObj.explanation}`;
    quizQuestion.appendChild(explanation);
    
    // Update score if correct
    if (userAnswer === questionObj.answer) {
        currentQuiz.score++;
    }
    
    // Update next button text or show results
    if (currentQuiz.currentQuestion < questions.length - 1) {
        quizNext.textContent = 'Próxima Pergunta';
        quizNext.onclick = nextQuestion;
    } else {
        quizNext.textContent = 'Ver Resultados';
        quizNext.onclick = showResults;
    }
    
    quizNext.classList.remove('disabled');
});

// Next Question
function nextQuestion() {
    currentQuiz.currentQuestion++;
    loadQuestion();
    
    // Reset next button
    quizNext.textContent = 'Próxima';
    quizNext.onclick = function() {
        quizNext.click();
    };
}

// Show Results
function showResults() {
    const questions = quizData[currentQuiz.language];
    const percentage = Math.round((currentQuiz.score / questions.length) * 100);
    
    let resultMessage = '';
    if (percentage >= 80) {
        resultMessage = 'Excelente trabalho! Você domina este tópico.';
    } else if (percentage >= 50) {
        resultMessage = 'Bom trabalho! Com mais prática você vai melhorar ainda mais.';
    } else {
        resultMessage = 'Continue estudando! Revise os conceitos e tente novamente.';
    }
    
    quizContainer.innerHTML = `
        <div class="text-center">
            <h4 class="mb-4">Quiz Completo!</h4>
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="display-4">${currentQuiz.score}/${questions.length}</h2>
                    <h3 class="mb-3">${percentage}%</h3>
                    <p class="lead">${resultMessage}</p>
                </div>
            </div>
            <div class="d-flex justify-content-center gap-3">
                <button id="restart-quiz" class="btn btn-primary">
                    <i class="fas fa-redo me-2"></i> Refazer Quiz
                </button>
                <button id="change-language" class="btn btn-outline-secondary">
                    <i class="fas fa-exchange-alt me-2"></i> Trocar Linguagem
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to result buttons
    document.getElementById('restart-quiz').addEventListener('click', () => {
        initQuiz(currentQuiz.language);
    });
    
    document.getElementById('change-language').addEventListener('click', () => {
        // Show language selection modal or implement your logic
        alert('Selecione uma linguagem diferente nas abas acima.');
    });
}

// Language Tab Change Event
document.querySelectorAll('#langTabs button').forEach(tab => {
    tab.addEventListener('click', function() {
        const language = this.id.split('-')[0];
        initQuiz(language);
    });
});

// Initialize with JavaScript quiz by default
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});