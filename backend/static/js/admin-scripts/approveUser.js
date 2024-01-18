async function approveUser(event) {
  const userId = event.target.getAttribute("user-id");

  try {
    const response = await fetch(
      `http://localhost:5050/api/admin/approveUser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("user approved");
      window.location.href = "/adminSideUserList";
    } else {
      alert.innerHTML = data.message;
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
}
