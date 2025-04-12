export function handleLikeCard(button, countEl, cardId, likeCard, unlikeCard) {
    const liked = button.classList.contains('card__like-button_is-active');
    const request = liked ? unlikeCard(cardId) : likeCard(cardId);

    request
        .then(updatedCard => {
            button.classList.toggle('card__like-button_is-active');
            countEl.textContent = updatedCard.likes.length;
        })
        .catch(console.error);
}

export function createCard(cardData, { handleDelete, handleLike, handlePreview, currentUserId, likeCard, unlikeCard }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    const likeCount = cardElement.querySelector('.card__like-count');
    likeCount.textContent = cardData.likes.length;

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    if (cardData.owner._id === currentUserId) {
        deleteButton.addEventListener('click', () => handleDelete(cardElement, cardData._id));
    } else {
        deleteButton.remove();
    }

    if (cardData.likes.some(user => user._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        handleLikeCard(likeButton, likeCount, cardData._id, likeCard, unlikeCard);
    });
    cardImage.addEventListener('click', () => {
        handlePreview(cardData.link, cardData.name);
    });

    return cardElement;
}