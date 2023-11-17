let books = [];

const BOOKS_KEY = "BOOKSHELF_BOOKS";

const render = (idBook) => {
  const unreadBook = document.getElementById("unread");
  const readedBook = document.getElementById("readed");

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (bookItem.id == idBook) {
      if (bookItem.isComplete) {
        readedBook.append(bookElement);
      } else {
        unreadBook.append(bookElement);
      }
    }
  }

  countBook();
};

const findBook = (bookId) => {
  for (const book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
};

const findBookIndex = (bookId) => {
  index = 0;
  for (const book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
};

const generateBookObject = (id, title, author, year, isComplete) => {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
};

const addBook = () => {
  const title = document.getElementById("inputTitle").value;
  const author = document.getElementById("inputAuthor").value;
  const year = document.getElementById("inputYear").value;
  const isComplete = document.getElementById("inputCheckbox").checked;

  const id = +new Date();
  const bookObject = generateBookObject(id, title, author, year, isComplete);

  let isValid = true;
  removeValidation();

  if (!title.length) {
    validateForm("titleValidation");
    isValid = false;
  }
  if (!author.length) {
    validateForm("authorValidation");
    isValid = false;
  }
  if (!year.length) {
    validateForm("yearValidation");
    isValid = false;
  }

  const form = document.getElementById("formAddBook");

  if (isValid) {
    books.push(bookObject);
    openModalHandler(false);
    form.reset();
    toast(title, "added.", "#198754");
  }

  // document.dispatchEvent(new Event("render"));
  render(id);
  addData();
};

const validateForm = (elementId) => {
  const validation = document.getElementById(elementId);
  validation.classList.add("open");
};

const removeValidation = () => {
  const title = document.getElementById("titleValidation");
  const author = document.getElementById("authorValidation");
  const year = document.getElementById("yearValidation");

  title.classList.remove("open");
  author.classList.remove("open");
  year.classList.remove("open");
};

const makeBook = (bookObject) => {
  const { id, title, author, year, isComplete } = bookObject;

  const titleBook = document.createElement("h3");
  titleBook.innerText = title;
  const authorBook = document.createElement("p");
  authorBook.innerText = author;
  const yearBook = document.createElement("small");
  yearBook.innerText = year;

  const description = document.createElement("div");
  description.classList.add("description");
  description.append(titleBook, authorBook, yearBook);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("id", `${id}`);
  bookElement.append(description, actions);

  if (!isComplete) {
    actions.append(
      actionButton("Read", id, '<i class="bi bi-check"></i>'),
      actionButton("Delete", id, '<i class="bi bi-trash3-fill"></i>')
    );
  } else {
    actions.append(
      actionButton(
        "Undo",
        id,
        '<i class="bi bi-arrow-counterclockwise"></i>'
      ),
      actionButton("Delete", id, '<i class="bi bi-trash3-fill"></i>')
    );
  }

  return bookElement;
};

const actionButton = (action, idBook, icon) => {
  const button = document.createElement("button");
  button.innerHTML = icon;
  button.classList.add(`button-${action.toLowerCase()}`);
  button.addEventListener("click", () => {
    switch (action) {
      case "Read":
        readBook(idBook);
        break;
      case "Undo":
        unreadBook(idBook);
        break;
      case "Delete":
        deleteBook(idBook);
        break;
      default:
        break;
    }
  });

  return button;
};

const readBook = (id) => {
  const bookTarget = findBook(id);

  if (bookTarget === null) return;

  bookTarget.isComplete = true;

  // Remove the book from its current container
  const unreadContainer = document.getElementById("unread");
  const bookElement = document.getElementById(id);
  unreadContainer.removeChild(bookElement);

  toast(`${bookTarget.title}`, "readed.", "#455063");

  render(id);
  addData();
};

const unreadBook = (id) => {
  const bookTarget = findBook(id);

  if (bookTarget === null) return;

  bookTarget.isComplete = false;
  // Remove the book from its current container
  const readedContainer = document.getElementById("readed");
  const bookElement = document.getElementById(id);
  readedContainer.removeChild(bookElement);

  toast(`${bookTarget.title}`, "reverted.", "#fc7a00");

  render(id);
  addData();
};

const deleteBook = (id) => {
  const bookTargetIndex = findBookIndex(id);
  const bookTargetId = findBook(id);

  if (bookTargetIndex === -1) return;

  backdrop.removeAttribute("hidden");
  confirmationModal(`Delete ${bookTargetId.title}?`, () => {
    books.splice(bookTargetIndex, 1);

    const bookElement = document.getElementById(id);
    bookElement.remove();

    toast(bookTargetId.title, "deleted.", "#ef233c");

    render(id);
    addData();
  });
};

const countBook = () => {
  const unreadBook = document.getElementById("unreadCount");
  const readedBook = document.getElementById("readedCount");

  let countUnread = 0;
  let countReaded = 0;
  for (const book of books) {
    if (book.isComplete) {
      countReaded += 1;
    } else {
      countUnread += 1;
    }
  }

  unreadBook.innerText = countUnread;
  readedBook.innerText = countReaded;
};

const clearAllBook = () => {
  const allBookElement = document.querySelectorAll(".book");

  if (books.length === 0) return;

  backdrop.removeAttribute("hidden");
  confirmationModal("Are you sure to clear all book?", () => {
    books = [];
    allBookElement.forEach((book) => {
      book.remove();
    });
    localStorage.removeItem(BOOKS_KEY);
    countBook();

    toast("All Book", "cleared.", "#ef233c");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAddBook");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBook();
    console.log(books)
  });

  clearButton.addEventListener("click", () => {
    clearAllBook();
  });

  if (isStorageIsExist()) {
    loadData();
  }
});
