function addData() {
  if (isStorageIsExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOKS_KEY, parsed);
  }
}

function getData() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
}

function loadData() {
  const getDataFromKey = localStorage.getItem(BOOKS_KEY);
  let data = JSON.parse(getDataFromKey);
  if (data !== null) {
    for (const book of data) {
      books.push(book);
      render(book.id);
    }
  }
}

const isStorageIsExist = () => {
  if (typeof Storage === undefined) {
    alert("Your browser does not support Web Storage");
    return false;
  }
  return true;
};
