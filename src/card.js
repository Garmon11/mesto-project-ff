// Импорт функций API для работы с карточками
import { putLikes, deleteLike } from "./api.js";

function createCard(
  cardItem,
  onDelete,
  openImagePopup,
  likeCard,
  cardTemplate,
  profileData
) {
  // Клонируем шаблон карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Находим необходимые элементы внутри карточки
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".like-count");

  // Устанавливаем данные карточки
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  likeCount.textContent = cardItem.likes.length;
  
  // Если карточка не принадлежит текущему пользователю — скрываем кнопку удаления
  if (cardItem.owner._id !== profileData._id) {
    deleteButton.classList.add("card__delete-button-disable");
  } else {
    // Если принадлежит — вешаем обработчик на удаление
    deleteButton.addEventListener("click", () => onDelete(cardItem._id, cardElement));
  }

  // Проверяем, ставил ли текущий пользователь лайк
  const userHasLiked = cardItem.likes.some(
    (user) => user._id === profileData._id
  );
  likeButton.classList.toggle("card__like-button_is-active", userHasLiked);

  // Обработка клика по лайку
  likeButton.addEventListener("click", () => {
    likeCard(
      likeButton,
      cardItem._id,
      likeCount,
      profileData._id
    );
  });

  // Открытие попапа с изображением при клике на картинку
  cardImage.addEventListener("click", function () {
    openImagePopup(cardItem.link, cardItem.name);
  });

  return cardElement;
}

// Удаляет карточку из DOM
function deleteCard(cardElement) {
  cardElement.remove();
}

// Обработка лайка/дизлайка
function likeCard(button, cardId, likeCountElement, currentUserId) {
  const userHasLiked = button.classList.contains("card__like-button_is-active");
  const request = userHasLiked ? deleteLike(cardId) : putLikes(cardId);

  request
    .then((updatedCard) => {

      // Обновляем счётчик лайков
      likeCountElement.textContent = updatedCard.likes.length;

      // Обновляем внешний вид кнопки
      const userStillLikes = updatedCard.likes.some(
        (user) => user._id === currentUserId
      );
      button.classList.toggle("card__like-button_is-active", userStillLikes);
    })
    .catch((err) => {
      console.error("Ошибка лайка:", err);
    });
}

// Экспортируем функции для использования в других модулях
export { createCard, deleteCard, likeCard };