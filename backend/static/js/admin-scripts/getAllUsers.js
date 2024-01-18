const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[user-card-container]");
fetch("http://localhost:5050/api/user/getUsers")
  .then((res) => res.json())
  .then((data) => {
    data.allUsers.forEach((user, index) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = index + 1;
      body.textContent = user.userId;
      userCardContainer.append(card);
    });
  });
