import { initialCards } from './scripts/cards';
import { createCard, handleDeleteCard, handleLikeCard, handlePreviewImg } from './components/card';
import { openPopup, closePopup } from './components/modal';
import './pages/index.css';
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

const logoElement = document.querySelector('.header__logo');
logoElement.src = logo;
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleDeleteCard, handleLikeCard, handlePreviewImg);
  placesList.append(card);
});

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
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
  openPopup(editProfilePopup);
});

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeURLInput = document.querySelector('.popup__input_type_url');
const formAddCard = document.querySelector('.popup_type_new-card .popup__form');

formAddCard.addEventListener('submit', handleAddCardSubmit);

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const placeName = placeNameInput.value;
  const placeLink = placeURLInput.value;
  const newCard = createCard({ name: placeName, link: placeLink }, handleDeleteCard, handleLikeCard, handlePreviewImg);
  placesList.prepend(newCard);
  closePopup(addCardPopup);
  formAddCard.reset();
}

const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editProfilePopup);
}
formElement.addEventListener('submit', handleEditProfileSubmit);