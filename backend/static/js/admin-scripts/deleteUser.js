async function deleteUser(event) {
  const userId = event.target.getAttribute("user-id");
  const userName = event.target.getAttribute("user-name");
  console.log(userId);
 if(userId && userName){
    try {
        const response = await fetch(
          `http://localhost:5050/api/admin/deleteUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const data = await response.json();
    
        if (response.ok) {
          window.location.href = "/adminSideUserList";
        } else {
          alert.innerHTML = data.message;
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error");
      }
 }else{
    try {
        const response = await fetch(
          `http://localhost:5050/api/admin/deleteUserEntirely/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        const data = await response.json();
    
        if (response.ok) {
          window.location.href = "/adminSideUserList";
        } else {
          alert.innerHTML = data.message;
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error");
      }
 }
}
