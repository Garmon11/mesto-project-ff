//функции открытия и закрытия попапов
function openModal(item) {
    item.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeKey);
  }
  
  function closeModal(item) {
    item.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeKey);
  }
  
  // Функция закрытия попапа по esc
  function closeKey(evt) {
    if (evt.key === "Escape") {
      const openPopup = document.querySelector(".popup_is-opened");
      if (openPopup) {
        closeModal(openPopup);
      }
    }
  }
  
  export { openModal, closeModal };