export { createCard, removeCard, likeCard };
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  item,
  userId,
  { handleCardDelete, handleCardLike, handleCardClick }
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Устанавливаем данные карточки
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCount.textContent = item.likes.length;

  // Проверяем, поставлен ли лайк текущим пользователем
  const isLiked = item.likes.some((user) => user._id === userId);
  if (isLiked) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  // Проверяем, является ли пользователь владельцем карточки
  if (item.owner._id !== userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  } else {
    // Добавляем обработчик только если пользователь - владелец карточки
    deleteButton.addEventListener("click", () =>
      handleCardDelete(item._id, cardElement)
    );
  }

  // Добавляем данные для идентификации карточки
  cardElement.dataset.cardId = item._id;

  // Добавляем обработчики событий
  cardLikeBtn.addEventListener("click", () =>
    handleCardLike(item._id, cardLikeBtn, likeCount)
  );
  cardImage.addEventListener("click", () => handleCardClick(cardImage));

  return cardElement;
}

// Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

// Функция для обновления счетчика лайков
function updateLikeCount(likeButton, likeCount, likes) {
  likeButton.classList.toggle("card__like-button_is-active");
  likeCount.textContent = likes.length;
}

// Функция обработки лайка (устаревшая, оставлена для совместимости)
function likeCard(evt) {
  const likePlaced = evt.target;
  likePlaced.classList.toggle("card__like-button_is-active");
}
