import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import "../pages/index.css";
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const places = document.querySelector(".places__list");

// переменные
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__caption");

// форма профиля
const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

const cardFormElement = document.forms["new-place"];
const cardNameInput = cardFormElement.querySelector(".popup__input_type_card-name");
const cardImageInput = cardFormElement.querySelector(".popup__input_type_url");

// Вывести карточки на страницу
function addCard(cardItem) {
  const cardElement = createCard(cardItem, deleteCard, openImagePopup, likeCard, cardTemplate);
  places.prepend(cardElement);
}

function renderCards() {
  initialCards.forEach(addCard);
}

renderCards();

// обработчик кликов на кнопки
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  openModal(editPopup);
});

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

// закрытие попапов по кнопке закрытия и оверлею
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// открытие попапа с картинкой
function openImagePopup(link, name) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupTitle.textContent = name;
  openModal(imagePopup);
}
// изменение информации в профиле
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;

  closeModal(editPopup);
}

// const showInputError = (inputElement) => {
//   const errorElement = document.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add('form__input_type_error');
//   errorElement.classList.add('form__input-error_active');
// };

// const hideInputError = (inputElement) => {
//   const errorElement = document.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove('form__input_type_error');
//   errorElement.classList.remove('form__input-error_active');
// };

// const isValid = () => {
//   if (!nameInput.validity.valid) {
//     showInputError(nameInput);
//   } else {
//     hideInputError(nameInput);
//   }

//   if (!jobInput.validity.valid) {
//     showInputError(jobInput);
//   } else {
//     hideInputError(jobInput);
//   }
// };

// nameInput.addEventListener('input', isValid);
// jobInput.addEventListener('input', isValid);

// Валидация полей
const showInputError = (inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');

  if (errorElement) {
    errorElement.classList.add('form__input-error_active');

    if (inputElement.validity.valueMissing) {
      // Используем дефолтное сообщение из HTML, если поле пустое
      errorElement.textContent = errorElement.dataset.default;
    }
  }
};

const hideInputError = (inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');

  if (errorElement) {
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }
};

const isValid = (evt) => {
  const inputElement = evt.target;
  if (!inputElement.validity.valid) {
    showInputError(inputElement);
  } else {
    hideInputError(inputElement);
  }
};

const toggleButtonState = (form) => {
  const button = form.querySelector('button[type="submit"]');
  const inputs = Array.from(form.querySelectorAll('input'));
  const hasInvalidInput = inputs.some(input => !input.validity.valid);

  if (hasInvalidInput) {
    button.setAttribute('disabled', true);
    button.classList.add('button_disabled');
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled');
  }
};

const allForms = document.querySelectorAll('form');

allForms.forEach(form => {
  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (errorElement) {
      errorElement.dataset.default = errorElement.textContent; // сохраняем дефолтную подпись
    }

    input.addEventListener('input', (evt) => {
      isValid(evt);
      toggleButtonState(form);
    });
  });

  toggleButtonState(form);
});


profileFormElement.addEventListener("submit", handleProfileSubmit);

// добавление новых карточек
function handleCardSubmit(evt) {
  evt.preventDefault();

  const newCardItem = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };

  addCard(newCardItem);

  closeModal(addPopup);

  cardFormElement.reset();
}

cardFormElement.addEventListener("submit", handleCardSubmit);