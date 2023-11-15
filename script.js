// APIS
const CAMPAIGN_LEAD_API =
  "https://api.techpaathshala.com/api/v1/web/campaign/lead";
const campaignName = "499_masterclass";
let callToAction = "pay_499";

const popupPayment = document.getElementById("popup-payment");
const loader = document.getElementById('loader-main');

function createPayment(details) {
  loader.style.display = "block";

  const CREATE_PAYMENT_API =
    "https://api.techpaathshala.com/api/v1/web/payment";
  const {
    nimbbl_order_id: order_id,
    reference_id,
    nimbbl_transaction_id: transaction_id,
    nimbbl_signature: signature,
    status: payment_status,
  } = details;

  const body = {
    ...details,
    order_id,
    reference_id,
    transaction_id,
    signature,
    payment_status,
  };

  fetch(CREATE_PAYMENT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      loader.style.display = "none";

      window.location.href = "thankyou.html";
    })
    .catch((error) => console.error("Error:", error));
}

function handlePayment({ reference_id, email, name, mobileNo }) {
  const GENERATE_PAYMENT_API =
    "https://api.techpaathshala.com/api/v1/web/payment/generate";
  const body = {
    gateway_name: "NIMBBL",
    amount: 499,
    currency: "INR",
    tax: 0,
    other_details: {
      user: {
        mobile_number: mobileNo,
        email,
        first_name: name,
        last_name: " ",
      },
    },
  };

  fetch(GENERATE_PAYMENT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      loader.style.display = "none";

      let options = {
        access_key: resp.data.access_key,
        order_id: resp.data.order_id,
        callback_handler: function (response) {
          createPayment({ ...response, reference_id });
        },
      };
      console.log({ options });
      window.checkout = new NimbblCheckout(options);
      window.checkout.open();
    })
    .catch((error) => console.error("Error:", error));
}

function callLeadApi(email, name, mobileNo, utmCampaign, utmSource) {
  if(!utmCampaign){
    utmCampaign="test"
  }
  if(!utmSource){
    utmSource="test"
  }
let callToAction = "pay_499";
const campaignName = "499_masterclass";

  const body = {
    email,
    contact_no: mobileNo,
    name,
    cta: callToAction,
    campaign_name: campaignName,
    utm_campaign: utmCampaign,
    utm_source: utmSource,
  };
  body.raw_json = JSON.stringify(body);

  fetch(CAMPAIGN_LEAD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((detail) => {
      return handlePayment({
        reference_id: detail.data,
        email,
        name,
        mobileNo,
      });
    })
    .catch((error) => console.error("Error:", error));
}

// setting counter for reserve yoyr seat
// Set the target time for the countdown
const targetTime = new Date(); // use current time as a starting point
targetTime.setHours(targetTime.getHours() + 5); // set the target time (e.g., 2 hours from now)

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  // Get the current time
  const currentTime = new Date();

  // Calculate the remaining time in milliseconds
  const remainingTime = targetTime - currentTime;

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Update the HTML elements
  document.getElementById("hours").value = formatTime(hours);
  document.getElementById("minutes").value = formatTime(minutes);
  document.getElementById("seconds").value = formatTime(seconds);

  // Check if the countdown is complete
  if (remainingTime <= 0) {
    clearInterval(timerInterval); // Stop the timer
    alert("Countdown complete!");
  }
}

function formatTime(time) {
  // Add leading zero if the time is less than 10
  return time < 10 ? "0" + time : time;
}

const faq_answer = document.querySelectorAll(".faq-answer");
const faq_question = document.querySelectorAll(".faq-question");
const fa_chevron_down = document.querySelectorAll(".fa-chevron-down");

faq_question.forEach((question, index) => {
  question.addEventListener("click", () => {
    if (
      faq_answer[index].style.display === "none" ||
      faq_answer[index].style.display === ""
    ) {
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



const payBtn = document.getElementById("pay-btn");
let payment_stat = "";

payBtn.addEventListener("click", () => {
  // Step 1 : Data Initialization
  let name = document.getElementById("enter-name").value.trim();
  let mobileNumber = document.getElementById("mobile-number").value;
  let email = document.getElementById("email").value;
  let lower = document.querySelector(".lower");
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
    lower.style.display = "flex";
    errorMobile.innerHTML = "Mobile number must have exactly 10 digits";
    errorMobile.style.color = "red";
    error = true;
  } else {
    document.getElementById("mobile-number").style.border = "1px solid #576575";
    document.getElementById("number-span").style.border = "1px solid #576575";
  }

  if (email === null || email === "" ) {
    errorEmail.innerHTML = "Email is compulsory";
    errorEmail.style.color = "red";
    error = true;
  } else {
    document.getElementById("email").style.border = "1px solid #576575";
  }

  if (error) {
    return;
  }

  // 3. api call
  const urlParams = new URLSearchParams(window.location.search);
  const utmCampaign = urlParams.get("utm_campaign");
  const utmSource = urlParams.get("utm_source");
  loader.style.display = "block";

  callLeadApi(email, name, mobileNumber, utmCampaign, utmSource);
});

let ctaBtn = document.querySelectorAll(".CTA-btn");
let mainLeftContainer = document.querySelector(".main-left-container");

ctaBtn.forEach((cta) => {
  cta.addEventListener("click", function () {
    mainLeftContainer.scrollIntoView({ behavior: "smooth" });
  });
});

// CLOSE BTN START HERE

function updateCTA(cta) {
  callToAction = cta;
}

// CTA BTN END HERE