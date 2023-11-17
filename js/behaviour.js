const startButton = document.querySelector(".container");
const startTitle = document.querySelector(".container h1");
const bookshelfContainer = document.querySelector(".bookshelf-container");
const modalButton = document.getElementById("openModal");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const closeButton = document.querySelector(".home");
const clearButton = document.querySelector(".clearall");
const creditText = document.getElementById("credit");

const OPENED_KEY = "APP_OPENED";

document.addEventListener("DOMContentLoaded", () => {
  if (!startButton.classList.contains("open")) {
    startButton.addEventListener("click", () => {
      sessionStorage.setItem(OPENED_KEY, "true");
      startAppsHandler(true);
    });
  }

  if (isStorageIsExist()) {
    const opened = sessionStorage.getItem(OPENED_KEY);

    if (opened !== null && opened === "true") {
      startAppsHandler(true);
    } else {
      startButton.style.transition = "0.5s";
      startTitle.style.transition = "0.5s";
    }
  }

  modalButton.addEventListener("click", () => {
    if (!modalButton.classList.contains("open")) {
      openModalHandler(true);
    } else {
      openModalHandler(false);
    }
  });

  closeButton.addEventListener("click", () => {
    sessionStorage.removeItem(OPENED_KEY);
    startButton.style.transition = "0.5s";
    startTitle.style.transition = "0.5s";
    startAppsHandler(false);
  });

  backdrop.addEventListener("click", () => {
    const confirmationModal = document.querySelector(".confirmation");

    openModalHandler(false);
    confirmationModal.remove();

    modalButton.style.zIndex = "101";
  });
});

const startAppsHandler = (isOpened) => {
  if (isOpened) {
    startButton.classList.add("open");
    bookshelfContainer.removeAttribute("hidden");
    modalButton.style.display = "block";
    clearButton.style.display = "block";
    closeButton.style.display = "block";
    startTitle.style.display = "none";
    creditText.style.display = "none";
  } else {
    startButton.classList.remove("open");
    bookshelfContainer.setAttribute("hidden", "");
    modalButton.style.display = "none";
    closeButton.style.display = "none";
    clearButton.style.display = "none";
    startTitle.style.display = "block";
    creditText.style.display = "block";
  }
};

const openModalHandler = (isOpened) => {
  if (isOpened) {
    modalButton.classList.add("open");
    modal.classList.add("open");
    backdrop.removeAttribute("hidden");
  } else {
    modalButton.classList.remove("open");
    modal.classList.remove("open");
    modal.classList.add("closed");
    backdrop.setAttribute("hidden", "");
  }
};
