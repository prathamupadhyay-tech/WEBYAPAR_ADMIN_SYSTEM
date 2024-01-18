function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

async function updateUser() {
  const usernameInput = document.getElementById("formGroupExampleInput");
  const hiddenDiv = document.getElementById("hiddenDiv");
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("JWT Token not available");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.userId;
    const formData = new FormData();
    formData.append("name", usernameInput.value);

    const croppedImageData = hiddenDiv.querySelector("img").src;
    const blob = base64toBlob(croppedImageData, "image/png");
    formData.append("profileImage", blob);

    const response = await fetch(
      `http://localhost:5050/api/user/updateUser/${userId}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      window.location.href = "userPhotoPage";
    } else {
      console.error("Failed to update user information");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
