export { openPopup, closePopup };

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-animated");
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}
