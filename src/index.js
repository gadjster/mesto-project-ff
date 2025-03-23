import "./pages/index.css";
import {
  initialCards,
  createCard,
  removeCard,
  likeCard,
  cardList,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imageViewPopup = document.querySelector(".popup_type_image");
const profileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const profileNameInput = profileForm.name;
const profileJobInput = profileForm.description;
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardNameInput = newCardForm["place-name"];
const newCardLinkInput = newCardForm.link;

const cardTemplate = document.querySelector("#card-template")?.content;

// Проверка на существование элементов
if (
  !profileEditButton ||
  !profileAddButton ||
  !profileEditPopup ||
  !newCardPopup ||
  !imageViewPopup ||
  !profileForm ||
  !newCardForm ||
  !popupImage ||
  !popupCaption ||
  !profileTitle
) {
  console.error("Не удалось найти необходимые элементы DOM");
}

profileEditPopup.classList.add("popup_is-animated");
newCardPopup.classList.add("popup_is-animated");
imageViewPopup.classList.add("popup_is-animated");

// Функция для закрытия попапа при клике на оверлей или крестик
function setCloseListeners(popup) {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
}

// Добавляем обработчики закрытия для всех попапов
setCloseListeners(profileEditPopup);
setCloseListeners(newCardPopup);
setCloseListeners(imageViewPopup);

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };

  const cardElement = createCard(newCard, removeCard, likeCard);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => openImagePopup(cardImage));

  cardList.prepend(cardElement);
  closePopup(newCardPopup);
  newCardForm.reset();
}
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
}

// @todo: Вывести карточки на страницу
function addCard(item, removeCard, likeCard) {
  const cardElement = createCard(item, removeCard, likeCard);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => openImagePopup(cardImage));

  cardList.append(cardElement);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

profileAddButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard, likeCard);
}

function openImagePopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(imageViewPopup);
}
