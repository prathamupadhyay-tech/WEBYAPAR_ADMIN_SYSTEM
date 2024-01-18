const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[user-card-container]");
const apiUrl = "http://localhost:5050/api/user/getUsers";

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => {
    // Get only the first two users
    const firstTwoUsers = data.allUsers.slice(0, 2);

    firstTwoUsers.forEach((user, index) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = index + 1;
      body.textContent = user.userId;
      userCardContainer.append(card);
    });
  });
