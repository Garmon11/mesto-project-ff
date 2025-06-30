const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  let errorMessage = inputElement.validationMessage;

  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.patternMessage || errorMessage;
  } else if (inputElement.validity.valueMissing && inputElement.dataset.default) {
    errorMessage = inputElement.dataset.default;
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const disableSubmitButton = (button, config) => {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
};

const enableSubmitButton = (button, config) => {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (formElement, config) => {
  const button = formElement.querySelector(config.submitButtonSelector);
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);

  if (hasInvalidInput) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(formElement, config);
    });
  });
  toggleButtonState(formElement, config);
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  const button = formElement.querySelector(config.submitButtonSelector);
  disableSubmitButton(button, config);
};