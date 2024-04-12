// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", () => {
    removeCard(deleteButton);
  });
  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(deleteButton) {
  const deleteCard = deleteButton.closest(".card");
  deleteCard.remove();
}

// @todo: Вывести карточки на страницу
function addCard(item, removeCard) {
  const cardElement = createCard(item, removeCard);
  cardList.append(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard);
}
