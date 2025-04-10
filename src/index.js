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