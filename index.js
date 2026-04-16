// DOM elements

const titleEl = document.getElementById("todo-title");
const statusBadgeEl = document.getElementById("todo-status-badge");
const checkboxEl = document.getElementById("todo-complete");
const timeRemainingEl = document.getElementById("time-remaining");

// State
const state = {
  dueDate: new Date("2026-05-01T18:00:00Z"),
  isComplete: false,
};

// Helper functions
function calculateTimeRemaining(dueDate) {
  const now = new Date();
  const diffMs = dueDate - now;
  const absDiffMs = Math.abs(diffMs);
  const totalMins = Math.floor(absDiffMs / 1000 / 60);
  const totalHours = Math.floor(totalMins / 60);
  const totalDays = Math.floor(totalHours / 24);

  const isOverdue = diffMs < 0;

  if (totalMins < 2)
    return { text: "Due now!", isOverdue: false, isSoon: true };

  if (!isOverdue) {
    if (totalDays >= 2)
      return {
        text: `Due in ${totalDays} days`,
        isOverdue: false,
        isSoon: false,
      };
    if (totalDays === 1)
      return { text: "Due tomorrow", isOverdue: false, isSoon: true };
    if (totalHours >= 1)
      return {
        text: `Due in ${totalHours} hour${totalHours > 1 ? "s" : ""}`,
        isOverdue: false,
        isSoon: true,
      };
    return {
      text: `Due in ${totalMins} minute${totalMins > 1 ? "s" : ""}`,
      isOverdue: false,
      isSoon: true,
    };
  }

  // Overdue branch
  if (totalDays >= 2)
    return {
      text: `Overdue by ${totalDays} days`,
      isOverdue: true,
      isSoon: false,
    };
  if (totalDays === 1)
    return { text: "Overdue by 1 day", isOverdue: true, isSoon: false };
  if (totalHours >= 1)
    return {
      text: `Overdue by ${totalHours} hour${totalHours > 1 ? "s" : ""}`,
      isOverdue: true,
      isSoon: false,
    };
  return {
    text: `Overdue by ${totalMins} minute${totalMins > 1 ? "s" : ""}`,
    isOverdue: true,
    isSoon: false,
  };
}

function getStatusBadgeClass(status) {
  const map = {
    Pending: "badge-pending",
    "In Progress": "badge-inprogress",
    Done: "badge-done",
  };
  return map[status] || "badge-pending";
}

// Handler functions
function updateTimeDisplay() {
  if (state.isComplete) {
    timeRemainingEl.textContent = "Completed";
    timeRemainingEl.className = "meta-value";
    return;
  }

  const result = calculateTimeRemaining(state.dueDate);

  timeRemainingEl.textContent = result.text;

  timeRemainingEl.classList.remove("is-overdue", "is-soon");
  if (result.isOverdue) timeRemainingEl.classList.add("is-overdue");
  else if (result.isSoon) timeRemainingEl.classList.add("is-soon");
}

function setCompletionState(isDone) {
  state.isComplete = isDone;
  checkboxEl.checked = isDone;

  if (isDone) {
    titleEl.classList.add("is-done");
    setStatus("Done");
  } else {
    titleEl.classList.remove("is-done");
    setStatus("Pending");
  }

  updateTimeDisplay();
}

function setStatus(status) {
  statusBadgeEl.textContent = status;
  statusBadgeEl.classList.remove(
    "badge-pending",
    "badge-inprogress",
    "badge-done",
  );
  statusBadgeEl.classList.add(getStatusBadgeClass(status));
  statusBadgeEl.setAttribute("aria-label", `Status: ${status}`);
}

function handleEdit() {
  alert("Edit clicked");
}

function handleDelete() {
  alert("Delete clicked");
}

function init() {
  updateTimeDisplay();

  const timeInterval = setInterval(updateTimeDisplay, 60000);

  checkboxEl.addEventListener("change", function (event) {
    setCompletionState(event.target.checked);
  });
}

init();
