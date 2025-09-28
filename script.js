// Get references to DOM elements
const attendeeCountSpan = document.getElementById("attendeeCount");
const checkInForm = document.getElementById("checkInForm");

// Track the number of attendees
let attendeeCount = 0;

// Load counts from localStorage if available
if (localStorage.getItem("attendeeCount")) {
  attendeeCount = parseInt(localStorage.getItem("attendeeCount"));
}
if (localStorage.getItem("waterCount")) {
  document.getElementById("waterCount").textContent =
    localStorage.getItem("waterCount");
}
if (localStorage.getItem("zeroCount")) {
  document.getElementById("zeroCount").textContent =
    localStorage.getItem("zeroCount");
}
if (localStorage.getItem("powerCount")) {
  document.getElementById("powerCount").textContent =
    localStorage.getItem("powerCount");
}

// Function to update the attendee count in the span
function updateAttendeeCount() {
  attendeeCountSpan.textContent = `${attendeeCount}`;
}

// Initial update on page load
updateAttendeeCount();

// Handle form submission to increment attendee count
checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  attendeeCount = attendeeCount + 1;
  updateAttendeeCount();
  // Save total count to localStorage
  localStorage.setItem("attendeeCount", attendeeCount);
  // ...existing code for handling check-in (if any)...
});
// Get all needed Dom elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Load total check-ins from localStorage if available
if (localStorage.getItem("totalCheckIns")) {
  count = parseInt(localStorage.getItem("totalCheckIns"));
}

// Progress bar element
const progressBar = document.getElementById("progressBar");

// Load attendee list from localStorage if available
let attendees = [];
if (localStorage.getItem("attendees")) {
  attendees = JSON.parse(localStorage.getItem("attendees"));
}

// Function to render attendee list
function renderAttendeeList() {
  const attendeeList = document.getElementById("attendeeList");
  attendeeList.innerHTML = "";
  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    const li = document.createElement("li");
    li.textContent = attendee.name;
    const span = document.createElement("span");
    span.className = "attendee-team";
    span.textContent = attendee.teamName;
    li.appendChild(span);
    attendeeList.appendChild(li);
  }
}

// Initial render on page load
renderAttendeeList();

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;
  // Save total check-ins to localStorage
  localStorage.setItem("totalCheckIns", count);
  console.log("Total Check-Ins: " + count);

  // Update progress bar width
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;
  console.log(`Progress: ${percentage}%`);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  let teamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = teamCount;
  // Save team count to localStorage
  localStorage.setItem(team + "Count", teamCount);

  // Add attendee to the list and save to localStorage
  attendees.push({ name: name, team: team, teamName: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  renderAttendeeList();

  // Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  console.log(message);

  // Display the message on the screen
  const greeting = document.getElementById("greeting");
  greeting.textContent = message;

  // Show a pop up message
  alert(message);

  // Check if attendee goal is reached
  if (count >= maxCount) {
    // Get team counts
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent
    );

    // Find the winning team
    let winningTeam = "Team Water Wise";
    let winningCount = waterCount;
    if (zeroCount > winningCount) {
      winningTeam = "Team Net Zero";
      winningCount = zeroCount;
    }
    if (powerCount > winningCount) {
      winningTeam = "Team Renewables";
      winningCount = powerCount;
    }

    // Show celebration message
    const celebration = `🏆 Check-in goal reached! Congratulations to ${winningTeam} for having the most attendees!`;
    greeting.textContent = celebration;
    alert(celebration);
  }

  form.reset();
});

// Add reset functionality
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", function () {
  // Reset all counters and attendee list
  attendeeCount = 0;
  count = 0;
  document.getElementById("waterCount").textContent = "0";
  document.getElementById("zeroCount").textContent = "0";
  document.getElementById("powerCount").textContent = "0";
  attendees = [];
  updateAttendeeCount();
  renderAttendeeList();
  progressBar.style.width = "0%";
  document.getElementById("greeting").textContent = "";

  // Remove from localStorage
  localStorage.removeItem("attendeeCount");
  localStorage.removeItem("totalCheckIns");
  localStorage.removeItem("waterCount");
  localStorage.removeItem("zeroCount");
  localStorage.removeItem("powerCount");
  localStorage.removeItem("attendees");
});
