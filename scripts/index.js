// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const template = document.querySelector('#card-template');

// Функция создания карточки
function createCard(cardData) {
    const templateClone = template.content.cloneNode(true);
    const cardImage = templateClone.querySelector('.card__image');
    const cardTitle = templateClone.querySelector('.card__title');
    const deleteButton = templateClone.querySelector('.card__delete-button');

    // Передаем данные в карточку
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Удаление карточки
    deleteButton.addEventListener('click', () => {
        deleteButton.closest('.places__item').remove();
    });

    return templateClone;
}

// Отображаем стартовые карточки
initialCards.forEach((card) => {
    const newCard = createCard(card);
    placesList.append(newCard);
});

// Добавление новой карточки
const addBtn = document.querySelector('.profile__add-button');
addBtn.addEventListener('click', () => {
    const randomCard = initialCards[Math.floor(Math.random() * initialCards.length)];
    const newCard = createCard(randomCard);
    placesList.append(newCard);
});