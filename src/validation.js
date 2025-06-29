const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  console.log(123, errorElement);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  let errorMessage = inputElement.validationMessage;

  if (inputElement.name === "link" && !inputElement.validity.valid) {
    errorMessage = "Введите адрес сайта";
  } else if (inputElement.validity.patternMismatch) {
    errorMessage =
      inputElement.dataset.patternMessage ||
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
  } else if (
    inputElement.validity.valueMissing &&
    inputElement.dataset.default
  ) {
    errorMessage = inputElement.dataset.default;
  }
  console.log(1);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (formElement) => {
  const button = formElement.querySelector(".popup__button");
  const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);

  if (hasInvalidInput) {
    button.classList.add("popup__button_disabled");
    button.disabled = true;
  } else {
    button.classList.remove("popup__button_disabled");
    button.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(formElement);
    });
  });
  toggleButtonState(formElement); // на старте при инициализации
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// функция очистки валидации
export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  const button = formElement.querySelector(".popup__button");
  button.classList.add("popup__button_disabled");
  button.disabled = true;
};
