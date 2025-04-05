// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// import '../pages/index.css';

// Получаем список, куда будем добавлять карточки
const cardsContainer = document.querySelector('.places__list');

// Функция удаления карточки
function deleteCard(event) {
    const cardElement = event.target.closest('.places__item');
    if (cardElement) {
        cardElement.remove();
    }
}

// Функция для лайка карточки
function toggleLike(event) {
    const likeButton = event.target.closest('.card__like-button');
    if (likeButton) {
        likeButton.classList.toggle('card__like-button_is-active');
    }
}

// Функция создания карточки
function createCard(cardData) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Устанавливаем обработчик для кнопки лайка
    likeButton.addEventListener('click', toggleLike);

    // Устанавливаем обработчик для удаления карточки
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

// Отображаем начальные карточки
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.append(cardElement);
});

// Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Все кнопки закрытия (крестики)
const closeButtons = document.querySelectorAll('.popup__close');

// Общая функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose); // Добавляем слушатель при открытии
}

// Общая функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose); // Убираем слушатель при закрытии
}

// Закрытие попапов по ESC
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Закрытие попапов по клику на оверлей
document.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
});

// Обработчики открытия
editButton.addEventListener('click', () => {
    const nameInput = popupEdit.querySelector('.popup__input_type_name');
    const descriptionInput = popupEdit.querySelector('.popup__input_type_description');

    // Заполняем поля попапа текущими значениями
    nameInput.value = document.querySelector('.profile__title').textContent;
    descriptionInput.value = document.querySelector('.profile__description').textContent;

    openPopup(popupEdit);
});

addButton.addEventListener('click', () => openPopup(popupAdd));

// Закрытие попапов по клику на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Открытие попапа с картинкой
const cardList = document.querySelector('.places__list');
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

cardList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const img = evt.target;
    popupImageImg.src = img.src;
    popupImageImg.alt = img.alt;
    popupImageCaption.textContent = img.alt;
    openPopup(popupImage);
  }
});

// Обработчик формы редактирования профиля
const editForm = popupEdit.querySelector('.popup__form');
editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const nameInput = popupEdit.querySelector('.popup__input_type_name');
    const descriptionInput = popupEdit.querySelector('.popup__input_type_description');

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Обновляем данные профиля на странице
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(popupEdit);
});

// Обработчик формы добавления карточки
const addForm = popupAdd.querySelector('.popup__form');
addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const placeNameInput = popupAdd.querySelector('.popup__input_type_card-name');
    const placeLinkInput = popupAdd.querySelector('.popup__input_type_url');

    const newCardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    const cardElement = createCard(newCardData);
    cardsContainer.prepend(cardElement);

    // Очистить форму и закрыть попап
    placeNameInput.value = '';
    placeLinkInput.value = '';
    closePopup(popupAdd);
});