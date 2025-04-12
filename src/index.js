import { getUserInfo, getInitialCards, addNewCard, updateUserProfile, updateUserAvatar, likeCard, unlikeCard, deleteCard } from './api.js';
import { createCard } from './components/card';
import { openPopup, closePopup } from './components/modal';
import './pages/index.css';
import logo from './images/logo.svg';
import { enableValidation, clearValidation } from './components/validation';

const logoElement = document.querySelector('.header__logo');
logoElement.src = logo;
const profileImage = document.querySelector('.profile__image');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const confirmPopup = document.querySelector('.popup_type_confirm');
const confirmForm = confirmPopup.querySelector('.popup__form');

function handlePreview(link, name) {

  popupImagePic.src = link;
  popupImagePic.alt = name;
  popupImageCaption.textContent = name;

  openPopup(popupImage);
}

const placesList = document.querySelector('.places__list');

let currentUserId = '';
let cardToDelete = null;
let cardIdToDelete = null;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    currentUserId = userData._id;

    cards.reverse().forEach((cardData) => {
      const card = createCard(cardData, { handleDelete, handleLike, handlePreview, currentUserId, likeCard, unlikeCard });
      placesList.append(card);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных с сервера:', err);
  });

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup') ||
      event.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElement, validationConfig);
  openPopup(editProfilePopup);
});

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeURLInput = document.querySelector('.popup__input_type_url');
const formAddCard = document.querySelector('.popup_type_new-card .popup__form');

formAddCard.addEventListener('submit', handleAddCardSubmit);

addCardButton.addEventListener('click', () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openPopup(addCardPopup);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeURLInput.value;

  const submitButton = formAddCard.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, submitButton);

  addNewCard(placeName, placeLink)
    .then((newCard) => {
      const card = createCard(newCard, { handleDelete, handleLike, handlePreview, currentUserId, likeCard, unlikeCard });
      placesList.prepend(card);
      closePopup(addCardPopup);
      formAddCard.reset();
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

const formSelector = document.querySelector('.popup__form');
const formElement = document.querySelector('.popup_type_edit .popup__form');
const inputElement = document.querySelectorAll('.popup__input');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const submitButton = document.querySelector('.popup__button');

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, submitButton);

  updateUserProfile(name, about)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['update-avatar'];
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');

avatarEditButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);
  renderLoading(true, submitButton);

  const avatarUrl = avatarInput.value;

  updateUserAvatar(avatarUrl)
    .then((updatedUser) => {
      profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

formElement.addEventListener('submit', handleEditProfileSubmit);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

confirmForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!cardToDelete || !cardIdToDelete) return;

  deleteCard(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closePopup(confirmPopup);
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    })
    .finally(() => {
      cardToDelete = null;
      cardIdToDelete = null;
    });
});

const renderLoading = (isLoading, buttonElement, defaultText = 'Сохранить') => {
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
};

function handleLike(button, countEl, cardId) {
  const liked = button.classList.contains('card__like-button_is-active');
  const request = liked ? unlikeCard(cardId) : likeCard(cardId);

  request
    .then(updatedCard => {
      button.classList.toggle('card__like-button_is-active');
      countEl.textContent = updatedCard.likes.length;
    })
    .catch(console.error);
}

function handleDelete(cardEl, cardId) {
  cardToDelete = cardEl;
  cardIdToDelete = cardId;
  openPopup(confirmPopup);
}

enableValidation(validationConfig);