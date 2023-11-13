
const faq_answer = document.querySelectorAll(".faq-answer");
const faq_question = document.querySelectorAll(".faq-question");
const fa_chevron_down = document.querySelectorAll(".fa-chevron-down");

faq_question.forEach((question, index) => {
    question.addEventListener("click", () => {
        if (faq_answer[index].style.display === "none" || faq_answer[index].style.display === "") {
            // Hide all answers first
            faq_answer.forEach((answer) => {
                answer.style.display = "none";
            });

            // Reset all chevron icons
            fa_chevron_down.forEach((chevron) => {
                chevron.style.transform = "rotate(0deg)";
            });

            // Show the answer for the clicked question
            faq_answer[index].style.display = "block";
            fa_chevron_down[index].style.transform = "rotate(180deg)";
            faq_answer[index].style.transition = "0.3s";
        } else {
            // If the answer is already visible, hide it
            faq_answer[index].style.display = "none";
            fa_chevron_down[index].style.transform = "rotate(0deg)";
        }
    });
});



// form validation

const payBtn = document.getElementById("pay-btn");
let payment_stat = ""

payBtn.addEventListener("click", () => {
  // Step 1 : Data Initialization
  let name = document.getElementById("enter-name").value.trim();
  let mobileNumber = document.getElementById("mobile-number").value;
  let email = document.getElementById("email").value;

  let error = false;
  let errorName = document.getElementById("name-error");
  let errorMobile = document.getElementById("number-error");
  let errorEmail = document.getElementById("email-error");

  //reset error message
  errorName.innerHTML = "";
  errorMobile.innerHTML = "";
  errorEmail.innerHTML = "";

  document.getElementById("enter-name").style.border = "3px solid red";
  document.getElementById("mobile-number").style.border = "3px solid red";
  document.getElementById("email").style.border = "3px solid red";
  document.getElementById("number-span").style.border = "3px solid red";
  document.getElementById("number-span").style.borderRight = "0px";

  // 2. Validation
  if (name === null || name === "") {
    errorName.innerHTML = "Name can't be blank";
    errorName.style.color = "red";
    
    error = true;
  } else {
    document.getElementById("enter-name").style.border = "1px solid #576575";
  }

  if (
    mobileNumber === null ||
    mobileNumber.length < 10 ||
    mobileNumber.length > 10
  ) {
    errorMobile.innerHTML = "Mobile number must have exactly 10 digits";
    errorMobile.style.color = "red";
    error = true;
  } else {
    document.getElementById("mobile-number").style.border = "1px solid #576575";
    document.getElementById("number-span").style.border = "1px solid #576575";
  }

  if (email === null || email === "") {
    errorEmail.innerHTML = "Email is compulsory";
    errorEmail.style.color = "red";
    error = true;
  } else {
    document.getElementById("email").style.border = "1px solid #576575";
  }

  if (error) {
    return;
  }
  
})



// setting counter for reserve yoyr seat



// Set the target time for the countdown
// const targetTime = new Date(); // use current time as a starting point
// targetTime.setHours(targetTime.getHours() + 5); // set the target time (e.g., 2 hours from now)

// // Update the timer every second
// const timerInterval = setInterval(updateTimer, 1000);

// function updateTimer() {
//     // Get the current time
//     const currentTime = new Date();

//     // Calculate the remaining time in milliseconds
//     const remainingTime = targetTime - currentTime;

//     // Calculate hours, minutes, and seconds
//     const hours = Math.floor(remainingTime / (1000 * 60 * 60));
//     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//     // Update the HTML elements
//     document.getElementById('hours').value = formatTime(hours);
//     document.getElementById('minutes').value = formatTime(minutes);
//     document.getElementById('seconds').value = formatTime(seconds);

//     // Check if the countdown is complete
//     if (remainingTime <= 0) {
//         clearInterval(timerInterval); // Stop the timer
//         alert('Countdown complete!');
//     }
// }

// function formatTime(time) {
//     // Add leading zero if the time is less than 10
//     return time < 10 ? '0' + time : time;
// }
