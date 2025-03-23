import "./pages/index.css";
import { createCard, removeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
  updateAvatar,
} from "./components/api.js";

// DOM элементы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarEditButton = document.querySelector(
  ".profile__image-edit-button"
);
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imageViewPopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const profileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const avatarForm = document.forms["avatar-form"];
const deleteCardForm = document.forms["delete-card-form"];
const profileNameInput = profileForm.name;
const profileJobInput = profileForm.description;
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const newCardNameInput = newCardForm["place-name"];
const newCardLinkInput = newCardForm.link;
const avatarLinkInput = avatarForm.avatar;
const profileSaveButton = profileForm.querySelector(".popup__button");
const newCardSaveButton = newCardForm.querySelector(".popup__button");
const avatarSaveButton = avatarForm.querySelector(".popup__button");
const deleteCardButton = deleteCardForm.querySelector(".popup__button");
const cardList = document.querySelector(".places__list");

// Переменная для хранения ID текущего пользователя
let userId;

// Переменная для хранения ID карточки, которую нужно удалить
let cardToDeleteId = null;
let cardToDeleteElement = null;

// Настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

// Инициализация анимаций для попапов
profileEditPopup.classList.add("popup_is-animated");
newCardPopup.classList.add("popup_is-animated");
imageViewPopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is-animated");
deleteCardPopup.classList.add("popup_is-animated");

// Функция для закрытия попапа при клике на оверлей или крестик
function setCloseListener(popup) {
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
setCloseListener(profileEditPopup);
setCloseListener(newCardPopup);
setCloseListener(imageViewPopup);
setCloseListener(avatarPopup);
setCloseListener(deleteCardPopup);

// Функция для изменения текста кнопки сохранения
function renderLoading(button, isLoading, originalText = "Сохранить") {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = originalText;
  }
}

// Обработчик открытия попапа удаления карточки
function handleCardDeleteClick(cardId, cardElement) {
  cardToDeleteId = cardId;
  cardToDeleteElement = cardElement;
  openPopup(deleteCardPopup);
}

// Обработчик лайка карточки
function handleCardLike(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeAction = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  likeAction
    .then((card) => {
      if (likeButton.classList.contains("card__like-button_is-active")) {
        likeButton.classList.remove("card__like-button_is-active");
      } else {
        likeButton.classList.add("card__like-button_is-active");
      }
      likeCount.textContent = card.likes.length;
    })
    .catch((err) => {
      console.error(`Ошибка при обработке лайка: ${err}`);
    });
}

// Обработчик клика на изображение
function openImagePopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openPopup(imageViewPopup);
}

// Обработчик отправки формы добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(newCardSaveButton, true);

  addCard(newCardNameInput.value, newCardLinkInput.value)
    .then((cardData) => {
      const cardElement = createCard(cardData, userId, {
        handleCardDelete: handleCardDeleteClick,
        handleCardLike: handleCardLike,
        handleCardClick: openImagePopup,
      });

      cardList.prepend(cardElement);
      closePopup(newCardPopup);
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(newCardSaveButton, false);
    });
}

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileSaveButton, true);

  updateUserInfo(profileNameInput.value, profileJobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении данных пользователя: ${err}`);
    })
    .finally(() => {
      renderLoading(profileSaveButton, false);
    });
}

// Обработчик отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(avatarSaveButton, true);

  updateAvatar(avatarLinkInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(avatarSaveButton, false);
    });
}

// Обработчик отправки формы удаления карточки
function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(deleteCardButton, true, "Да");

  deleteCard(cardToDeleteId)
    .then(() => {
      removeCard(cardToDeleteElement);
      closePopup(deleteCardPopup);
      cardToDeleteId = null;
      cardToDeleteElement = null;
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(deleteCardButton, false, "Да");
    });
}

// Добавляем обработчики отправки форм
newCardForm.addEventListener("submit", handleNewCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleDeleteCardFormSubmit);

// Обработчики открытия попапов
profileEditButton.addEventListener("click", () => {
  clearValidation(profileForm, validationConfig);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openPopup(profileEditPopup);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openPopup(newCardPopup);
});

profileAvatarEditButton.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  avatarForm.reset();
  openPopup(avatarPopup);
});

// Загрузка начальных данных
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    // Сохраняем ID пользователя
    userId = userData._id;

    // Заполняем информацию о пользователе
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    // Отображаем карточки
    cardsData.forEach((cardData) => {
      const cardElement = createCard(cardData, userId, {
        handleCardDelete: handleCardDeleteClick,
        handleCardLike: handleCardLike,
        handleCardClick: openImagePopup,
      });
      cardList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(`Ошибка при загрузке начальных данных: ${err}`);
  });

// Включаем валидацию форм
enableValidation(validationConfig);
