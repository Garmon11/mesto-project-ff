import { cardDelete } from "./api.js";
import { openModal, closeModal } from "./modal.js";

const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = document.querySelector(".popup__confirm-button");

export function handleDeleteConfirm(cardId, cardElement, onDelete) {
  openModal(popupConfirm);

  const onConfirm = () => {
    cardDelete(cardId)
      .then(() => {
        onDelete(cardElement);
        closeModal(popupConfirm);
      })
      .catch((err) => {
        console.error("Ошибка удаления карточки:", err);
      })
      .finally(() => {
        popupConfirmButton.removeEventListener("click", onConfirm);
      });
  };

  popupConfirmButton.addEventListener("click", onConfirm);
}
