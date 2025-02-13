// Get necessary elements
const answerInput = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const questionDisplay = document.getElementById('question');
const slate = document.getElementById('slate');

// Initialize variables
let score = 0;
let correctAnswer = 0;

// Function to generate a new question
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  if (operator === '/') {
    correctAnswer = num1;
    const divisor = Math.floor(Math.random() * 10) + 1;
    questionDisplay.textContent = `What is ${num1 * divisor} ÷ ${divisor}?`;
    correctAnswer = num1;
  } else if (operator === '-') {
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
  answerInput.value = '';
  setTimeout(generateQuestion, 1000);
}

// Event Listeners
submitBtn.addEventListener('click', checkAnswer);
clearBtn.addEventListener('click', function () {
  resultDisplay.textContent = "";
  answerInput.value = "";
  slate.classList.remove('drawing');
  ctx.clearRect(0, 0, drawingArea.width, drawingArea.height);
});

// Drawing functionality for slate (Supports Desktop + Mobile)
const drawingArea = document.createElement('canvas');
drawingArea.id = "drawingArea";
drawingArea.width = slate.clientWidth;
drawingArea.height = slate.clientHeight;
slate.appendChild(drawingArea);
const ctx = drawingArea.getContext('2d');

let drawing = false;

function startDrawing(event) {
  drawing = true;
  slate.classList.add('drawing');
  ctx.beginPath();
  ctx.moveTo(getPosition(event).x, getPosition(event).y);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(event) {
  if (!drawing) return;
  const pos = getPosition(event);
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

// Get touch/mouse position relative to canvas
function getPosition(event) {
  const rect = drawingArea.getBoundingClientRect();
  if (event.touches) {
    return {
      x: event.touches[0].clientX - rect.left,
      y: event.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}

// Event Listeners for Desktop (Mouse)
drawingArea.addEventListener('mousedown', startDrawing);
drawingArea.addEventListener('mouseup', stopDrawing);
drawingArea.addEventListener('mousemove', draw);

// Event Listeners for Mobile (Touch)
drawingArea.addEventListener('touchstart', startDrawing);
drawingArea.addEventListener('touchend', stopDrawing);
drawingArea.addEventListener('touchmove', draw);

// Prevent scrolling when drawing on mobile
drawingArea.addEventListener('touchmove', function (event) {
  event.preventDefault();
}, { passive: false });

// Initialize first question
generateQuestion();
