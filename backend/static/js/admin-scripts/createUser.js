async function addUser() {
  const userId = document.getElementById("floatingInput").value;
  const password = document.getElementById("floatingPassword").value;

  var alert = document.getElementById("alert");

  try {
    const response = await fetch("http://localhost:5050/api/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/userLogin";
    } else {
      alert.innerHTML = data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
}
