// Get references to DOM elements
const attendeeCountSpan = document.getElementById("attendeeCount");
const checkInForm = document.getElementById("checkInForm");

// Track the number of attendees
let attendeeCount = 0;

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
  // ...existing code for handling check-in (if any)...
});
// Get all needed Dom elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Progress bar element
const progressBar = document.getElementById("progressBar");

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
  console.log("Total Check-Ins: " + count);

  // Update progress bar width
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;
  console.log(`Progress: ${percentage}%`);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  console.log(message);

  // Display the message on the screen
  const greeting = document.getElementById("greeting");
  greeting.textContent = message;

  // Show a pop up message
  alert(message);

  form.reset();
});
