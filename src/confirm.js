// Импорт функции для удаления карточки с сервера
import { cardDelete } from "./api.js";

// Импорт утилит открытия и закрытия модальных окон
import { openModal, closeModal } from "./modal.js";

// Находим попап подтверждения и кнопку подтверждения
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = document.querySelector(".popup__confirm-button");

export function handleDeleteConfirm(cardId, cardElement, onDelete) {
  // Открываем попап подтверждения
  openModal(popupConfirm);

  //Колбэк, который будет выполнен при подтверждении удаления
  const onConfirm = () => {
    cardDelete(cardId)
      .then(() => {
        // Удаляем карточку с интерфейса
        onDelete(cardElement);
        // Закрываем попап
        closeModal(popupConfirm);
      })
      .catch((err) => {
        console.error("Ошибка удаления карточки:", err);
      })
      .finally(() => {
        // Удаляем обработчик, чтобы избежать накопления
        popupConfirmButton.removeEventListener("click", onConfirm);
      });
  };

  // Назначаем обработчик клика на кнопку подтверждения
  popupConfirmButton.addEventListener("click", onConfirm);
}
