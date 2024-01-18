const userCardTemplate = document.querySelector("[data-user-template]");
const userCardTemplateMobile = document.querySelector(
  "[data-user-template-mobile]"
);
const userCardContainerMobile = document.querySelector(
  "[user-card-container-mobile]"
);
const userCardContainer = document.querySelector("[user-card-container]");
fetch("http://localhost:5050/api/user/getUsers")
  .then((res) => res.json())
  .then((data) => {
    data.allUsers.forEach((user, index) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const mobileCard =
        userCardTemplateMobile.content.cloneNode(true).children[0];

      const header = card.querySelector("[data-user-id]");
      const body = card.querySelector("[data-user-name]");
      const photo = card.querySelector("[data-user-photo]");
      const doneButton = card.querySelector(".done-btn");
      const deleteButton = card.querySelector(".delete-btn");
      const doneBtnMobile = mobileCard.querySelector(".done-btn-mobile");
      const deleteBtnMobile = mobileCard.querySelector(".delete-btn-mobile");
      const mobileHeader = mobileCard.querySelector("[data-user-id]");
      deleteButton.setAttribute("user-id", user.userId);

      doneButton.setAttribute("user-id", user.userId);
      doneBtnMobile.setAttribute("user-id", user.userId);

      if (user.name) {
        deleteButton.setAttribute("user-name", user.name);
        deleteBtnMobile.setAttribute("user-name", user.name);
      }

      deleteBtnMobile.setAttribute("user-id", user.userId);

      const mobilebody = mobileCard.querySelector("[data-user-name]");
      const mobilephoto = mobileCard.querySelector("[data-user-photo]");

      mobileHeader.textContent = user.userId;
      mobilebody.textContent = user.name;

      header.textContent = user.userId;
      body.textContent = user.name;
      const userPhotoImg = photo.querySelector("img");
      const userPhotoImgMobile = mobilephoto.querySelector("img");
      let imgPath;
      console.log(user.approved);
     

      if (user.profileImage) {
        imgPath = `/${user.profileImage}`;
        doneBtnMobile.style.display = "inline-block";
        doneButton.style.display = "inline-block";
      } else {
        imgPath = `../../static/utils/imgs/profileImageIcon.jpg`;
        doneBtnMobile.style.display = "none";
        doneButton.style.display = "none";
      }
      if (user.approved) {
        doneBtnMobile.style.display = "none";
        doneButton.style.display = "none";
      }
      userPhotoImgMobile.src = imgPath;
      userPhotoImg.src = imgPath;
      userCardContainer.append(card);
      userCardContainerMobile.append(mobileCard);
    });
  });
