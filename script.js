// Daily goals progress
const dailyGoals = document.querySelectorAll('.goal-item input');
const progressBar = document.querySelector('.progress-bar');

function updateProgress() {
  const checkedGoals = Array.from(dailyGoals).filter(goal => goal.checked).length;
  const totalGoals = dailyGoals.length;
  const progress = (checkedGoals / totalGoals) * 100;

  progressBar.style.width = progress + '%';
  progressBar.innerText = `${Math.round(progress)}%`;
}

dailyGoals.forEach(goal => goal.addEventListener('change', updateProgress));

updateProgress();

// Timer functionality
let timer;
let timerRunning = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

document.getElementById("startTimer").addEventListener("click", function() {
  const timeSelect = document.getElementById("timeSelect").value;
  let timeLeft = timeSelect * 60; // Convert to seconds
  
  if (!timerRunning) {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timer);
        timerRunning = false;
        alert("Time's up! Take a break or switch tasks!");
      }
    }, 1000);
    timerRunning = true;
  }
});

document.getElementById("resetTimer").addEventListener("click", function() {
  clearInterval(timer);
  timerRunning = false;
  document.getElementById("timerDisplay").textContent = "00:00";
});

// Weekly reset functionality
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
  dailyGoals.forEach(goal => goal.checked = false);
  updateProgress();
});
