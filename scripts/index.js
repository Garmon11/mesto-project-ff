// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Получаем список, куда будем добавлять карточки
const cardsContainer = document.querySelector('.places__list');

// Функция удаления карточки
function deleteCard(event) {
    const cardElement = event.target.closest('.places__item');
    if (cardElement) {
        cardElement.remove();
    }
}

// Функция создания карточк
function createCard(cardData, handleDelete) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Устанавливаем обработчик удаления
    deleteButton.addEventListener('click', handleDelete);

    return cardElement;
}

// Отображаем начальные карточки
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    cardsContainer.append(cardElement);
});