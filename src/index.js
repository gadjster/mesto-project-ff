import "./pages/index.css";
import { createCard, removeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditClose = popupTypeEdit.querySelector(".popup__close");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeNewCardClose = popupTypeNewCard.querySelector(".popup__close");
const popupTypeImage = document.querySelector(".popup_type_image");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;

popupTypeEdit.classList.add("popup_is-animated");
popupTypeNewCard.classList.add("popup_is-animated");
popupTypeImage.classList.add("popup_is-animated");

function newPlaceFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = formNewPlace["place-name"];
  const linkInput = formNewPlace.link;
  const cardTemplate = document.querySelector("#card-template").content;
  const placeList = document.querySelector(".places__list");
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = linkInput.value;
  cardElement.querySelector(".card__title").textContent = nameInput.value;
  placeList.prepend(cardElement);
  closePopup(popupTypeNewCard);
  linkInput.value = "";
  nameInput.value = "";
}
formNewPlace.addEventListener("submit", newPlaceFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = formEditProfile.name;
  const jobInput = formEditProfile.description;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}
formEditProfile.addEventListener("submit", handleFormSubmit);

profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  nameInput.value = "Жак-Ив Кусто";
  jobInput.value = "Исследователь океана";
});

popupTypeEditClose.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

popupTypeEdit.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupTypeEdit);
  }
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});
popupTypeNewCardClose.addEventListener("click", () => {
  closePopup(popupTypeNewCard);
});
popupTypeNewCard.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupTypeNewCard);
  }
});
