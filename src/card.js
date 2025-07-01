import { putLikes, deleteLike } from "./api.js";

function createCard(
  cardItem,
  onDelete,
  openImagePopup,
  likeCard,
  cardTemplate,
  profileData
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".like-count");

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  likeCount.textContent = cardItem.likes.length;

  if (cardItem.owner._id !== profileData._id) {
    deleteButton.classList.add("card__delete-button-disable");
  } else {
    deleteButton.addEventListener("click", () => onDelete(cardItem._id, cardElement));
  }

  const userHasLiked = cardItem.likes.some(
    (user) => user._id === profileData._id
  );
  likeButton.classList.toggle("card__like-button_is-active", userHasLiked);

  likeButton.addEventListener("click", () => {
    likeCard(
      likeButton,
      cardItem._id,
      likeCount,
      profileData._id
    );
  });

  cardImage.addEventListener("click", function () {
    openImagePopup(cardItem.link, cardItem.name);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(button, cardId, likeCountElement, currentUserId) {
  const userHasLiked = button.classList.contains("card__like-button_is-active");
  const request = userHasLiked ? deleteLike(cardId) : putLikes(cardId);

  request
    .then((updatedCard) => {
      likeCountElement.textContent = updatedCard.likes.length;
      const userStillLikes = updatedCard.likes.some(
        (user) => user._id === currentUserId
      );
      button.classList.toggle("card__like-button_is-active", userStillLikes);
    })
    .catch((err) => {
      console.error("Ошибка лайка:", err);
    });
}

export { createCard, deleteCard, likeCard };

// import { cardDelete, putLikes, deleteLike } from "./api.js";
// import { openModal, closeModal } from "./modal.js";

// let currentConfirmHandler = null;

// function createCard(
//   cardItem,
//   onDeleteConfirm,
//   openImagePopup,
//   likeCard,
//   cardTemplate,
//   profileData
// ) {
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   const cardTitle = cardElement.querySelector(".card__title");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const likeCount = cardElement.querySelector(".like-count");
//   const popupFormTypeConfirm = document.querySelector(
//     ".popup__form_type_confirm"
//   );
//   const popupTypeConfirm = document.querySelector(".popup_type_confirm");
//   const popupConfirmButton = document.querySelector(".popup__confirm-button");

//   cardImage.src = cardItem.link;
//   cardImage.alt = cardItem.name;
//   cardTitle.textContent = cardItem.name;
//   likeCount.textContent = cardItem.likes.length;

//   if (cardItem.owner._id !== profileData._id) {
//     deleteButton.classList.add("card__delete-button-disable");
//   }

//   deleteButton.addEventListener("click", function () {
//     openModal(popupTypeConfirm);

//     // Переназначаем обработчик подтверждения
//     popupConfirmButton.onclick = () => {
//       cardDelete(cardItem._id)
//         .then(() => {
//           onDeleteConfirm(cardElement);
//           closeModal(popupTypeConfirm);
//         })
//         .catch((err) => {
//           console.error("Ошибка удаления карточки:", err);
//         });
//     };

//     popupFormTypeConfirm.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//   });

//   likeButton.addEventListener("click", function () {
//     likeCard(
//       likeButton,
//       cardItem._id,
//       likeCount,
//       cardItem.likes,
//       profileData._id
//     );
//   });

//   const userHasLiked = cardItem.likes.some(
//     (user) => user._id === profileData._id
//   );
//   likeButton.classList.toggle("card__like-button_is-active", userHasLiked);

//   cardImage.addEventListener("click", function () {
//     openImagePopup(cardItem.link, cardItem.name);
//   });

//   return cardElement;
// }

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// function likeCard(button, cardId, likeCountElement, likesArray, currentUserId) {
//   const userHasLiked = likesArray.some((user) => user._id === currentUserId);
//   const request = userHasLiked ? deleteLike(cardId) : putLikes(cardId);

//   request
//     .then((updatedCard) => {
//       likeCountElement.textContent = updatedCard.likes.length;
//       const userStillLikes = updatedCard.likes.some(
//         (user) => user._id === currentUserId
//       );
//       button.classList.toggle("card__like-button_is-active", userStillLikes);
//       likesArray = updatedCard.likes;
//     })
//     .catch((err) => {
//       console.error("Ошибка лайка:", err);
//     });
// }

// export { createCard, deleteCard, likeCard };

// import { cardDelete, putLikes, deleteLike } from "./api.js";

// function createCard(
//   cardItem,
//   onDelete,
//   openImagePopup,
//   likeCard,
//   cardTemplate,
//   profileData
// ) {
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   const cardTitle = cardElement.querySelector(".card__title");
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const likeCount = cardElement.querySelector(".like-count");

//   cardImage.src = cardItem.link;
//   cardImage.alt = cardItem.name;
//   cardTitle.textContent = cardItem.name;
//   likeCount.textContent = cardItem.likes.length;

//   if (cardItem.owner._id !== profileData._id) {
//     deleteButton.classList.add("card__delete-button-disable");
//   } else {
//     deleteButton.addEventListener("click", () => onDelete(cardItem._id, cardElement));
//   }

//   likeButton.addEventListener("click", function () {
//     likeCard(
//       likeButton,
//       cardItem._id,
//       likeCount,
//       cardItem.likes,
//       profileData._id
//     );
//   });

//   const userHasLiked = cardItem.likes.some(
//     (user) => user._id === profileData._id
//   );
//   likeButton.classList.toggle("card__like-button_is-active", userHasLiked);

//   cardImage.addEventListener("click", function () {
//     openImagePopup(cardItem.link, cardItem.name);
//   });

//   return cardElement;
// }

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// function likeCard(button, cardId, likeCountElement, likesArray, currentUserId) {
//   const userHasLiked = likesArray.some((user) => user._id === currentUserId);
//   const request = userHasLiked ? deleteLike(cardId) : putLikes(cardId);

//   request
//     .then((updatedCard) => {
//       likeCountElement.textContent = updatedCard.likes.length;
//       const userStillLikes = updatedCard.likes.some(
//         (user) => user._id === currentUserId
//       );
//       button.classList.toggle("card__like-button_is-active", userStillLikes);
//       likesArray = updatedCard.likes;
//     })
//     .catch((err) => {
//       console.error("Ошибка лайка:", err);
//     });
// }

// export { createCard, deleteCard, likeCard };