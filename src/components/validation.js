export const isValid = (formSelector, inputElement, config) => {
    if (!inputElement.validity.valid) {
        const errorMessage = inputElement.validity.patternMismatch
            ? inputElement.dataset.errorMessage
            : inputElement.validationMessage;
        showInputError(formSelector, inputElement, errorMessage, config);
    } else {
        hideInputError(formSelector, inputElement, config);
    }
};

export const showInputError = (formSelector, inputElement, errorMessage, config) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

export const hideInputError = (formSelector, inputElement, config) => {
    const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, submitButton, config) => {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.disabled = false;
    }
};

export const setEventListeners = (formSelector, config) => {
    const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
    const submitButton = formSelector.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, submitButton, config);

    inputList.forEach((inputElement) => {

        inputElement.addEventListener('input', () => {

            isValid(formSelector, inputElement, config);
            toggleButtonState(inputList, submitButton, config);
        });
    });
};

export const enableValidation = (config) => {

    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formSelector) => {

        setEventListeners(formSelector, config);
    });
};

export const clearValidation = (formSelector, config) => {
    const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
    const submitButton = formSelector.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formSelector, inputElement, config);
    });

    toggleButtonState(inputList, submitButton, config);
};