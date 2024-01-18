async function validateLogin() {
  const userIdInput = document.getElementById("floatingInput");
  const passwordInput = document.getElementById("floatingPassword");
  const errorMessage = document.getElementById("error-message");

  const userId = userIdInput.value.trim();
  const password = passwordInput.value.trim();

  if (!userId || !password) {
    errorMessage.textContent = "Please enter both user ID and password.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5050/api/user/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data = await response.json();

    if (response.ok) {
      errorMessage.textContent = "";

      localStorage.setItem("jwtToken", data.token);
      alert(data.message);

      
      window.location.href = "/userPhotoPage";
    } else {
      errorMessage.textContent = data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent = "An error occurred. Please try again.";
  }
}
