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

// кнопки и попапы
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileImgWrapper = document.querySelector(".profile-img-wrapper");
const closeButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const editAvatar = document.querySelector(".edit-avatar");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__caption");

// профиль
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// формы
const profileFormElement = document.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

const popupAvatarForm = document.querySelector(".popup-edit-avatar");
const inoutAvatar = document.querySelector(".input-edit-avatar");
const popupButtonAvatar = document.querySelector(".popup-button-avatar");

const cardFormElement = document.forms["new-place"];
const cardNameInput = cardFormElement.querySelector(".popup__input_type_card-name");
const cardImageInput = cardFormElement.querySelector(".popup__input_type_url");

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

// Получение данных с сервера
Promise.all([cardGet(), profileGet()])
  .then(([cards, profile]) => {
    profileData = profile;

    renderCards(cards.slice(0, 6).reverse(), profileData);

    profileTitle.textContent = profile.name;
    profileDesc.textContent = profile.about;
    profileAvatar.src = profile.avatar;
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

// Обработчик отправки формы обновления аватара
popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const link = inoutAvatar.value;
  popupButtonAvatar.textContent = "Сохранение...";

  avatarPatch(link)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(editAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      popupButtonAvatar.textContent = "Сохранить";
    });
});

// Отрисовать карточки
function renderCards(initialCards, profileData) {
  initialCards.forEach((card) => addCard(card, profileData));
}

// Обработчики открытия попапов
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(profileFormElement, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener("click", function () {
  cardFormElement.reset();
  clearValidation(cardFormElement, validationConfig);
  openModal(addPopup);
});

profileImgWrapper.addEventListener("click", function () {
  popupAvatarForm.reset();
  clearValidation(popupAvatarForm, validationConfig);
  openModal(editAvatar);
});

// Закрытие попапов по кнопке и клику на оверлей
closeButtons.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Открытие попапа с картинкой
function openImagePopup(link, name) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupTitle.textContent = name;
  openModal(imagePopup);
}

// Обработчик формы профиля
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

// Обработчик добавления новой карточки
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

// Включаем валидацию
enableValidation(validationConfig);