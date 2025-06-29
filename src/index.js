// import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { validationConfig } from "./config.js";
import {
  cardGet,
  profilePatch,
  profileGet,
  cardPost,
  avatarPatch,
} from "./api.js";
import "../pages/index.css";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const places = document.querySelector(".places__list");

// переменные
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const editAvatar = document.querySelector(".edit-avatar");
const closeButtons = document.querySelectorAll(".popup__close");
const addButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__caption");

const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);
const profileAvatar = document.querySelector(".profile__image");
const popupAvatarForm = document.querySelector(".popup-edit-avatar");
const inoutAvatar = document.querySelector(".input-edit-avatar");
const popupButtonAvatar = document.querySelector(".popup-button-avatar");

const cardFormElement = document.forms["new-place"];
const cardNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardImageInput = cardFormElement.querySelector(".popup__input_type_url");

const profileImgWrapper = document.querySelector(".profile-img-wrapper");

let profileData;

// Вывести карточки на страницу
function addCard(cardItem, profileData) {
  const cardElement = createCard(
    cardItem,
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate,
    profileData
  );
  places.prepend(cardElement);
}

Promise.all([cardGet(), profileGet()]).then((data) => {
  // console.log(data)
  const cards = data[0];
  profileData = data[1];

  renderCards(cards.slice(0, 6).reverse(), profileData);

  profileTitle.textContent = profileData.name;
  profileDesc.textContent = profileData.about;

  profileAvatar.src = profileData.avatar;
});

popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const link = inoutAvatar.value;
  popupButtonAvatar.textContent = "Сохранить...";
  avatarPatch(link).then((data) => {
    console.log(data);
    profileAvatar.src = data.avatar;
    popupButtonAvatar.textContent = "Сохранить";
    closeModal(editAvatar);
  });
});

function renderCards(initialCards, profileData) {
  initialCards.forEach((card) => addCard(card, profileData));
}

// обработчик кликов на кнопки
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  openModal(editPopup);
});

addButton.addEventListener("click", function () {
  openModal(addPopup);
});

profileImgWrapper.addEventListener("click", function () {
  openModal(editAvatar);
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

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  const defaultText = saveButton.textContent;

  saveButton.textContent = "Сохранение...";

  profilePatch({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDesc.textContent = data.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.error("Ошибка при сохранении профиля:", err);
    })
    .finally(() => {
      saveButton.textContent = defaultText;
    });
}

profileFormElement.addEventListener("submit", handleProfileSubmit);

// добавление новых карточек
function handleCardSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  const defaultText = saveButton.textContent;

  saveButton.textContent = "Сохранение...";

  cardPost({
    name: cardNameInput.value,
    link: cardImageInput.value,
  })
    .then((data) => {
      addCard(data, profileData);
      closeModal(addPopup);
      cardFormElement.reset();
    })
    .catch((err) => {
      console.error("Ошибка при создании карточки:", err);
    })
    .finally(() => {
      saveButton.textContent = defaultText;
    });
}

cardFormElement.addEventListener("submit", handleCardSubmit);
enableValidation(validationConfig);
