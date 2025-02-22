export { createCard, removeCard, likeCard };
import { openPopup, closePopup } from "./modal.js";
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
  deleteButton.addEventListener("click", () => {
    removeCard(deleteButton);
  });
  cardLikeBtn.addEventListener("click", (evt) => {
    likeCard(evt);
  });
  cardImage.addEventListener("click", () => openImage(cardImage));

  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(deleteButton) {
  const deleteCard = deleteButton.closest(".card");
  deleteCard.remove();
}

// @todo: Вывести карточки на страницу
function addCard(item, removeCard, likeCard, openImage) {
  const cardElement = createCard(item, removeCard, likeCard, openImage);
  cardList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard, likeCard, openImage);
}

function likeCard(evt) {
  const likePlaced = evt.target;
  if (!likePlaced.classList.contains("card__like-button_is-active")) {
    likePlaced.classList.add("card__like-button_is-active");
  } else {
    likePlaced.classList.remove("card__like-button_is-active");
  }
}

const image = document.querySelector(".popup_type_image");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");
const imagePopupClose = image.querySelector(".popup__close");

function openImage(cardData) {
  imagePopup.src = cardData.src;
  imagePopup.alt = cardData.alt;
  captionPopup.textContent = cardData.alt;
  openPopup(image);
  console.log(imagePopupClose);
  imagePopupClose.addEventListener("click", () => {
    closePopup(image);
  });
  image.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(image);
    }
  });
}
