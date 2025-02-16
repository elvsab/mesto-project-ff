function createCard(cardData, handleDeleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));

    return cardElement;
}

function handleDeleteCard(cardElement) {
    cardElement.remove();
}

const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const card = createCard(cardData, handleDeleteCard);
    placesList.append(card);
});
