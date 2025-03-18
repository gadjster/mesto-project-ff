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

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, removeCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  // Убедитесь, что обработчики событий добавляются только один раз
  deleteButton.removeEventListener("click", () => removeCard(deleteButton));
  deleteButton.addEventListener("click", () => removeCard(deleteButton));

  cardLikeBtn.removeEventListener("click", (evt) => likeCard(evt));
  cardLikeBtn.addEventListener("click", (evt) => likeCard(evt));

  cardImage.removeEventListener("click", () => openImage(cardImage));
  cardImage.addEventListener("click", () => openImage(cardImage));

  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(deleteButton) {
  const deleteCard = deleteButton.closest(".card");
  deleteCard.remove();
}

function likeCard(evt) {
  const likePlaced = evt.target;
  if (!likePlaced.classList.contains("card__like-button_is-active")) {
    likePlaced.classList.add("card__like-button_is-active");
  } else {
    likePlaced.classList.remove("card__like-button_is-active");
  }
}
