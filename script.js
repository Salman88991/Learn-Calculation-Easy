// Get necessary elements
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const questionDisplay = document.getElementById('question');
const slate = document.getElementById('slate');
const drawingArea = document.getElementById('drawingArea');

// Initialize variables
let score = 0;
let correctAnswer = 0;

// Function to generate a new question
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1; // Random number between 1-20
  const num2 = Math.floor(Math.random() * 20) + 1; // Random number between 1-20
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)]; // Random operator

  if (operator === '/') {
    // Ensure division has an integer result
    correctAnswer = num1; // Store original number
    const divisor = Math.floor(Math.random() * 10) + 1; // Random divisor
    questionDisplay.textContent = `What is ${num1 * divisor} ÷ ${divisor}?`;
    correctAnswer = num1; // Store correct answer
  } else if (operator === '-') {
    // Ensure subtraction doesn't give negative answers
    const [larger, smaller] = num1 > num2 ? [num1, num2] : [num2, num1];
    questionDisplay.textContent = `What is ${larger} - ${smaller}?`;
    correctAnswer = larger - smaller;
  } else if (operator === '*') {
    questionDisplay.textContent = `What is ${num1} × ${num2}?`;
    correctAnswer = num1 * num2;
  } else {
    questionDisplay.textContent = `What is ${num1} + ${num2}?`;
    correctAnswer = num1 + num2;
  }
}

// Function to check answer
function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  if (userAnswer === correctAnswer) {
    resultDisplay.textContent = "Correct! 🎉";
    resultDisplay.style.color = "green";
    score += 1;
    scoreDisplay.textContent = score;
  } else {
    resultDisplay.textContent = "Wrong! Try again.";
    resultDisplay.style.color = "red";
  }
  answerInput.value = ''; // Clear input after checking
  setTimeout(generateQuestion, 1000); // Generate a new question after 1 second
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
clearBtn.addEventListener('click', function () {
  resultDisplay.textContent = "";
  answerInput.value = "";
  slate.classList.remove('drawing');
  const ctx = drawingArea.getContext('2d');
  ctx.clearRect(0, 0, drawingArea.width, drawingArea.height);
});

// Drawing functionality for slate
drawingArea.width = slate.clientWidth;
drawingArea.height = slate.clientHeight;
const ctx = drawingArea.getContext('2d');
let drawing = false;

drawingArea.addEventListener('mousedown', () => {
  drawing = true;
  slate.classList.add('drawing');
});

drawingArea.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

drawingArea.addEventListener('mousemove', draw);

function draw(event) {
  if (!drawing) return;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';

  ctx.lineTo(event.clientX - slate.offsetLeft, event.clientY - slate.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.clientX - slate.offsetLeft, event.clientY - slate.offsetTop);
}

// Initialize first question
generateQuestion();
