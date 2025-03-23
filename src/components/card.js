export function handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function handleDeleteCard(cardElement) {
    cardElement.remove();
}

export function createCard(cardData, handleDeleteCard, handleLikeCard, handlePreviewImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    likeButton.addEventListener('click', handleLikeCard);
    cardImage.addEventListener('click', () => {
        handlePreviewImg(cardData.link, cardData.name);
    });

    return cardElement;
}