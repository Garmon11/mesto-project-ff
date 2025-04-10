// Функция создания карточки
function createCard(cardItem, deleteCard, openImagePopup, likeCard, cardTemplate) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
  
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardTitle.textContent = cardItem.name;
  
    deleteButton.addEventListener("click", function () {
      deleteCard(cardElement);
    });
  
    likeButton.addEventListener("click", function () {
      likeCard(likeButton);
    });
  
    cardImage.addEventListener("click", function () {
      openImagePopup(cardItem.link, cardItem.name);
    });
  
    return cardElement;
  }
  
  // Функции удаления и лайка карточки
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  
  function likeCard(item) {
    item.classList.toggle("card__like-button_is-active");
  }
  
  export { createCard, deleteCard, likeCard };