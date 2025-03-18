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
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const image = document.querySelector(".popup_type_image");
const imagePopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");

const cardTemplate = document.querySelector("#card-template")?.content;

// Проверка на существование элементов
if (
  !profileEditButton ||
  !profileAddButton ||
  !popupTypeEdit ||
  !popupTypeNewCard ||
  !popupTypeImage ||
  !formEditProfile ||
  !formNewPlace ||
  !imagePopup ||
  !captionPopup ||
  !profileTitle
) {
  console.error("Не удалось найти необходимые элементы DOM");
}

popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeImage.classList.add("popup_is-animated");

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
setCloseListeners(popupTypeEdit);
setCloseListeners(popupTypeNewCard);
setCloseListeners(popupTypeImage);

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = formNewPlace["place-name"];
  const linkInput = formNewPlace.link;

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  cardList.prepend(createCard(newCard, removeCard, likeCard, openImage));
  closePopup(popupTypeNewCard);
  formNewPlace.reset();
}
formNewPlace.addEventListener("submit", handlePlaceFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

// @todo: Вывести карточки на страницу
function addCard(item, removeCard, likeCard, openImage) {
  const cardElement = createCard(item, removeCard, likeCard, openImage);
  cardList.append(cardElement);
}

formEditProfile.addEventListener("submit", handleFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openPopup(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard, likeCard, openImage);
}

function openImage(cardImage) {
  imagePopup.src = cardImage.src;
  imagePopup.alt = cardImage.alt;
  captionPopup.textContent = cardImage.alt;
  openPopup(image);
}
