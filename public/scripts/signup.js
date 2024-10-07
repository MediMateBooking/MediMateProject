const mainDetails = document.getElementById("mainDetails");
const userCrendtials = document.getElementById("userCrendtials");
const roleDropDown = document.getElementById("role");
const slmcregi = document.getElementById("slmcregi");
const topicHeader = document.getElementById("roleTopic");
const submitBtn = document.getElementById("submitBtn");
submitBtn.disabled = true;

const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const compassword = document.getElementById("compassword");
const slmcregistration = document.getElementById("slmcregistration");

const statusMessage = document.querySelector(".statusMessage p");
const statusMessageFrame = document.querySelector(".statusMessage");

let option;

roleDropDown.addEventListener("input", (e) => {
  option = e.target.value;
  statusMessageFrame.style.display = "none";

  userName.value = "";
  email.value = "";
  password.value = "";
  compassword.value = "";
  slmcregistration.value = "";

  clearBorderColor();

  if (option.trim() === "patient") {
    mainDetails.style.display = "block";
    userCrendtials.style.display = "block";
    slmcregi.style.display = "none";
    topicHeader.textContent = "Patient";
    submitBtn.disabled = false;
    return;
  }

  if (option.trim() === "doctor") {
    mainDetails.style.display = "block";
    slmcregi.style.display = "block";
    topicHeader.textContent = "Doctor";
    userCrendtials.style.display = "none";
    submitBtn.disabled = false;
    return;
  }

  mainDetails.style.display = "none";
  slmcregi.style.display = "none";
  topicHeader.textContent = "";
  submitBtn.disabled = true;
});

submitBtn.addEventListener("click", async () => {
  statusMessage.textContent = "";
  statusMessageFrame.style.display = "none";
  clearBorderColor();

  submitBtn.innerHTML = "";
  submitBtn.innerHTML = `<div id="preloader">
                          <div class="spinner">
                          </div>
                        </div>`;

  const userDetails = {

    
    userName: userName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    confirmPassword: compassword.value.trim(),
    role: option.trim(),
  };
  if (option.trim() === "doctor") {
    userDetails.slmcregi = slmcregistration.value.trim();

    try {
      const response = await fetch(`/signup/doctors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resonse = await response.json();

      if (!resonse.success) {
        statusMessage.textContent = resonse.message;
        statusMessage.classList.remove("successMessage");
        statusMessage.classList.add("warningMessage");
        statusMessageFrame.style.display = "block";
        submitBtn.innerHTML = "";
        submitBtn.textContent = "Signup";

        if (resonse.message.trim() === "Please fill all Fields") {
          clearBorderColor();
          inputTagsColorChnage();
          centerElement();
        } else if (resonse.message.trim() === "Check Your Email Address") {
          clearBorderColor();
          inputTagsColorChnage("Email");
          centerElement();
        } else if (resonse.message.trim().includes(' is already used')) {

          email.value = ''
          clearBorderColor();
          inputTagsColorChange("Email");
          centerElement();

        } else {
          clearBorderColor();
          inputTagsColorChnage();
          centerElement();
        }
      } else {
        statusMessage.textContent = resonse.message;
        statusMessage.classList.remove("warningMessage");
        statusMessage.classList.add("successMessage");
        statusMessageFrame.style.display = "block";
        submitBtn.innerHTML = "";
        submitBtn.textContent = "Signup";

        centerElement();

        userName.value = "";
        email.value = "";
        password.value = "";
        compassword.value = "";
        slmcregistration.value = "";

        // window.location.href = resonse.redirectUrl;
      }
    } catch (error) {
      console.error(error.message);
      preLoader.style.display = "none";
      alert("Cannot Send Data!");
    }

    return;
  }

  //
  if (option.trim() === "patient") {
    try {
      const response = await fetch(`/signup/patients`, {
        //
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const resonse = await response.json();

      if (!resonse.success) {
        statusMessage.textContent = resonse.message;
        statusMessage.classList.remove("successMessage");
        statusMessage.classList.add("warningMessage");
        statusMessageFrame.style.display = "block";
        submitBtn.innerHTML = "";
        submitBtn.textContent = "Signup";

        if (resonse.message.trim() === "Please fill all Fields") {
          clearBorderColor();
          inputTagsColorChnage();
          centerElement();
        } else if (resonse.message.trim() === "Confirm Password Not Matched") {
          clearBorderColor();
          inputTagsColorChnage("Confirm Password");
          centerElement();
        } else if (
          resonse.message.trim() ===
          "Password must be at least 6 characters long"
        ) {
          clearBorderColor();
          inputTagsColorChnage("Create Password");
          centerElement();
        } else if (resonse.message.trim() === "Check Your Email Address") {
          clearBorderColor();
          inputTagsColorChnage("Email");
          centerElement();
        } else if (resonse.message.trim().includes(' is already used')) {

          email.value = ''
          clearBorderColor();
          inputTagsColorChange("Email");
          centerElement();
        }
        else {
          clearBorderColor();
          inputTagsColorChnage();
          centerElement();
        }
      } else {
        statusMessage.textContent = resonse.message;
        statusMessage.classList.remove("warningMessage");
        statusMessage.classList.add("successMessage");
        statusMessageFrame.style.display = "block";
        submitBtn.innerHTML = "";
        submitBtn.textContent = "Signup";

        centerElement();

        userName.value = "";
        email.value = "";
        password.value = "";
        compassword.value = "";
        slmcregistration.value = "";

        // window.location.href = resonse.redirectUrl;
      }
    } catch (error) {
      console.error(error.message);
      preLoader.style.display = "none";
      alert("Cannot Send Data!");
    }

    return;
  }
});

// color change for input tags
function inputTagsColorChange(targetInputText) {
  const allInputs = document.querySelectorAll(".form-control.floating");
  allInputs.forEach((oneInput) => {
    if (targetInputText) {
      const parentDiv = oneInput.closest(".form-group");

      if (parentDiv) {
        const label = parentDiv.querySelector(".focus-label");
        if (label) {
          if (label.textContent.trim() === targetInputText) {
            oneInput.style.borderColor = "#ff0064";
          }
        }
      }

      return;
    }

    if (oneInput.value.trim() === "") {
      oneInput.style.borderColor = "#ff0064";
    }
  });

  return;
}

function clearBorderColor() {
  const allInputs = document.querySelectorAll(".form-control.floating");
  allInputs.forEach((oneInput) => {
    oneInput.style.borderColor = "#dcdcdc";
  });

  return;
}
