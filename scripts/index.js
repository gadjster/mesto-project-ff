// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(item, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  deleteButton.addEventListener("click", () => {
    removeCard(deleteButton);
  });
  cardList.append(cardElement);
}
// @todo: Функция удаления карточки
function removeCard(deleteButton) {
  const deleteCard = deleteButton.closest(".card");
  deleteCard.remove();
}

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard);
}
