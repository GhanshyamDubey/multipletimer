document.addEventListener("DOMContentLoaded", () => {
  const activeTimers = [];

  function startTimer(hours, minutes, seconds) {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) {
      return;
    }

    const timer = {
      totalSeconds,
      intervalId: null,
    };

    activeTimers.push(timer);

    const timerElement = document.createElement("div");
    timerElement.classList.add("timer");

    const timerTextElement = document.createElement("div");
    timerTextElement.classList.add("timer-text");
    timerTextElement.innerHTML = formatTime(totalSeconds);

    const deleteBtn = document.createElement("button")
    deleteBtn.id="deletebtn"
    deleteBtn.innerText = "Delete ";
    deleteBtn.setAttribute("data-timer-index", activeTimers.length - 1);
    deleteBtn.addEventListener("click", () => deleteTimer(deleteBtn));

    timerElement.appendChild(timerTextElement);
    timerElement.appendChild(deleteBtn);

    document.getElementById("active-timers").appendChild(timerElement);

    timer.intervalId = setInterval(() => {
      if (timer.totalSeconds > 0) {
        timer.totalSeconds--;
        timerTextElement.innerHTML = formatTime(timer.totalSeconds);
      } else {
        clearInterval(timer.intervalId);
        timerElement.classList.add("timer-ended");
        timerTextElement.innerHTML = "Time's up!";
        playAudioAlert();
      }
    }, 1000);
  }

  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function deleteTimer(deleteBtn) {
    const timerIndex = deleteBtn.getAttribute("data-timer-index");
    activeTimers.splice(timerIndex, 1);
    deleteBtn.parentElement.remove();
  }

  function playAudioAlert() {
    const audio = new Audio("alert.mp3"); 
    audio.play();
  }

  document.getElementById("start-timer-btn").addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value);
    const seconds = parseInt(document.getElementById("seconds").value);
    startTimer(hours, minutes, seconds);
  });
});
