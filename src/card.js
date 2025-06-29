import { cardDelete, putLikes, deleteLike } from "./api.js";

// Функция создания карточки
function createCard(
  cardItem,
  deleteCard,
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
  const popupFormTypeConfirm = document.querySelector(
    ".popup__form_type_confirm"
  );
  const popupTypeConfirm = document.querySelector(".popup_type_confirm");
  const popupConfirmButton = document.querySelector(".popup__confirm-button");

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  console.log(cardItem);

  likeCount.textContent = cardItem.likes.length;

  // console.log(cardItem.owner._id, profileData._id);
  if (cardItem.owner._id !== profileData._id) {
    deleteButton.classList.add("card__delete-button-disable");
  }

  deleteButton.addEventListener("click", function () {
    popupTypeConfirm.classList.add("popup_is-opened");
    // слушать клик по кнопке "ок"
    // при клике
    // - удалить карточку
    // - закрыть модалку
    // - перестать слушать клик по кнопке "ок"
    const onConfirmDeleteClick = () => {
      cardDelete(cardItem._id);
      deleteCard(cardElement);
      popupTypeConfirm.classList.remove("popup_is-opened");
      popupConfirmButton.removeEventListener("click", onConfirmDeleteClick);
    };

    popupConfirmButton.addEventListener("click", onConfirmDeleteClick);

    popupFormTypeConfirm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });

  likeButton.addEventListener("click", function () {
    likeCard(
      likeButton,
      cardItem._id,
      likeCount,
      cardItem.likes,
      profileData._id
    );
  });

  const userHasLiked = cardItem.likes.some(
    (user) => user._id === profileData._id
  );
  if (userHasLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  cardImage.addEventListener("click", function () {
    openImagePopup(cardItem.link, cardItem.name);
  });

  return cardElement;
}

// Функции удаления и лайка карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(button, cardId, likeCountElement, likesArray, currentUserId) {
  const userHasLiked = likesArray.some((user) => user._id === currentUserId);

  const request = userHasLiked ? deleteLike(cardId) : putLikes(cardId);

  request
    .then((updatedCard) => {
      // Обновим счётчик
      likeCountElement.textContent = updatedCard.likes.length;

      // Обновим стиль кнопки
      const userStillLikes = updatedCard.likes.some(
        (user) => user._id === currentUserId
      );

      if (userStillLikes) {
        button.classList.add("card__like-button_is-active");
      } else {
        button.classList.remove("card__like-button_is-active");
      }

      // Чтобы при следующем клике снова была актуальная информация:
      likesArray.length = 0;
      updatedCard.likes.forEach((like) => likesArray.push(like));
    })
    .catch((err) => {
      console.error("Ошибка лайка:", err);
    });
}

export { createCard, deleteCard, likeCard };
