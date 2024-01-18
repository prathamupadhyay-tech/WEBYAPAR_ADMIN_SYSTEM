document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    const response = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      localStorage.removeItem("jwtToken");
     
      window.location.href = "/";
    } else {
      console.error("Logout failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
});
