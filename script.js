document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-control");
  const inputs = form.querySelectorAll("input[required]");
  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeat-password");

  inputs.forEach((input) => {
    input.addEventListener("blur", function (event) {
      if (!input.checkValidity()) {
        event.preventDefault(); // Prevent default browser validation message
        showError(input);
      } else {
        hideError(input);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    let hasError = false;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        showError(input);
        event.preventDefault();
        hasError = true;
      }
    });

    // Check if passwords match
    if (passwordInput.value !== repeatPasswordInput.value) {
      showError(repeatPasswordInput);
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
    }
  });

  function showError(input) {
    const errorDiv = input.parentNode.querySelector(".error-message");
    if (!errorDiv) {
      const newErrorDiv = document.createElement("div");
      newErrorDiv.className = "error-message";
      newErrorDiv.textContent =
        input.validationMessage || "Passwords do not match.";
      newErrorDiv.style.color = "red";
      newErrorDiv.style.fontSize = "1em";
      newErrorDiv.style.marginTop = "5px";
      input.parentNode.appendChild(newErrorDiv);
    }
    input.setCustomValidity(""); // Clear the default error message
  }

  function hideError(input) {
    const errorDiv = input.parentNode.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
  }
});
