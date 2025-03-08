// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsContainer = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// Функция создания карточки
function createCard(cardData) {
    const templateClone = template.content.cloneNode(true);
    const cardElement = templateClone.querySelector('.places__item');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    setupDeleteButton(cardElement); // Подключаем функцию удаления

    return cardElement;
}

// Отображаем стартовые карточки
initialCards.forEach((card) => {
    const newCard = createCard(card);
    cardsContainer.append(newCard);
});

// уделние карточки
function setupDeleteButton(cardElement) {
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
}


// Добавление новой карточки
// const addBtn = document.querySelector('.profile__add-button');
// addBtn.addEventListener('click', () => {
//     const randomCard = initialCards[Math.floor(Math.random() * initialCards.length)];
//     const newCard = createCard(randomCard);
//     cardsContainer.append(newCard);
// });