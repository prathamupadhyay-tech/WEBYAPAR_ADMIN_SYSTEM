async function validateLogin() {
  var userIdInput = document.getElementById("floatingInput").value;
  var passwordInput = document.getElementById("floatingPassword").value;
  var alertElement = document.getElementById("alert");
  if (userIdInput === "" || passwordInput === "") {
    alertElement.innerHTML = "Invalid credentials. Please try again.";
    return;
  }
  try {

    const response = await fetch("http://localhost:5050/api/admin/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userIdInput, password: passwordInput }),
    });

    if (response.ok) {
      const responseData = await response.json();

      window.location.href = "adminCreateUser";
    } else {
     
      alertElement.innerHTML = "Invalid credentials. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    alertElement.innerHTML = "An error occurred. Please try again later.";
  }
}
