const toast = (message, action, color) => {
  const toastList = document.querySelector(".toast-list");
  const toastClass = document.getElementsByClassName("toast");
  const length = toastClass.length + 1;

  if (length > 3) {
    toastList.removeChild(toastList.firstChild);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.style.borderBottom = `5px solid ${color}`;
  const toastTitle = document.createElement("p");
  const toastAction = document.createElement("span");
  toastTitle.innerText = message;
  toastAction.style.color = color;
  toastAction.innerText = `is ${action}`;

  toast.append(toastTitle, toastAction);

  toastList.appendChild(toast);
  setTimeout(() => {
    removeToast(toast);
  }, 3000);
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  setTimeout(() => {
    toast.remove();
  }, 500);
};

const confirmationModal = (title, callback) => {
  const wrapper = document.querySelector(".wrapper");

  const modal = document.createElement("div");
  modal.classList.add("confirmation");

  const titleModal = document.createElement("div");
  titleModal.classList.add("confirmation-text");
  titleModal.innerText = title;

  const buttons = document.createElement("div");
  buttons.classList.add("confirmation-buttons");

  const buttonCancel = document.createElement("button");
  buttonCancel.classList.add("cancel");
  buttonCancel.innerText = "Cancel";

  const buttonConfirm = document.createElement("button");
  buttonConfirm.classList.add("confirm");
  buttonConfirm.innerText = "Confirm";

  buttons.append(buttonCancel, buttonConfirm);
  modal.append(titleModal, buttons);
  wrapper.appendChild(modal);

  modalButton.style.zIndex = "90";

  buttonCancel.addEventListener("click", () => {
    backdrop.setAttribute("hidden", "");
    modalButton.style.zIndex = "101";
    modal.remove();
  });

  buttonConfirm.addEventListener("click", () => {
    callback();
    backdrop.setAttribute("hidden", "");
    modal.remove();
  });
};
