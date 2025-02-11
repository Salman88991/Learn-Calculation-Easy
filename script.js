// Get the answer input element
const answerInput = document.getElementById('answer');

// Focus event: When the input box is clicked, the placeholder text disappears
answerInput.addEventListener('focus', function() {
  if (this.placeholder === "Enter your answer") {
    this.placeholder = ''; // Hide the placeholder text
  }
});

// Blur event: When the input box loses focus, check if it's empty and show the placeholder text again
answerInput.addEventListener('blur', function() {
  if (this.value === '') {
    this.placeholder = 'Enter your answer'; // Show the placeholder text again if the field is empty
  }
});
