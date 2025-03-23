export { createCard, removeCard, likeCard, cardList };
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Корневой элемент списка карточек
const cardList = document.querySelector(".places__list");
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
  }

  // Добавляем данные для идентификации карточки
  cardElement.dataset.cardId = item._id;

  // Добавляем обработчики событий
  deleteButton.addEventListener("click", () =>
    handleCardDelete(item._id, cardElement)
  );
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
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeCount.textContent = likes.length;
}

// Функция обработки лайка (устаревшая, оставлена для совместимости)
function likeCard(evt) {
  const likePlaced = evt.target;
  if (!likePlaced.classList.contains("card__like-button_is-active")) {
    likePlaced.classList.add("card__like-button_is-active");
  } else {
    likePlaced.classList.remove("card__like-button_is-active");
  }
}
