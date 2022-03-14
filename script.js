const collection = [
  {
      title: '1', 
      author: 'Teasteroo Testyy'
  }, 
  {
      title: '2', 
      author: 'Teasteroo Testyy'
  },
];

const books = document.getElementById('books');
const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const form = document.getElementById('add-book');
const submitButton = document.getElementById('submit');
const removeButtons = document.querySelectorAll('.remove-button');
const bookContainer = document.querySelectorAll('.book-container');

function storageAvailable(type) {
  let storage;
  const x = '__storage_test__';

  try {
    storage = window[type];
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0
    );
  }
}

function formValues() {
  const formValues = {
    title: titleForm.value,
    author: authorForm.value,
  };

  localStorage.setItem('formValues', JSON.stringify(formValues));
}

function checkLocalStorage() {
  let title = '';
  let author = '';

  if (JSON.parse(localStorage.getItem('formValues')) === null) {
    title = '';
    author = '';
  } else {
    ({ title, author } = JSON.parse(localStorage.getItem('formValues')));
  }

  if (title !== 'empty' || author !== 'empty') {
    titleForm.value = title;
    authorForm.value = author;
  }
}

if (storageAvailable('localStorage')) {
  titleForm.addEventListener('input', formValues);
  authorForm.addEventListener('input', formValues);
  
  document.addEventListener('DOMContentLoaded', () => {
    checkLocalStorage();
  });
}

function addBook(book) {
  const cardHTML = `
  <div class="book-container">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button class="remove-button">Remove</button>
    <hr/>
  </div>
  `;
  books.insertAdjacentHTML("beforeend", cardHTML);
}

collection.forEach((book) => {
 addBook(book);
})

submitButton.addEventListener('click', () => {
    const book = {title: titleForm.value, author: authorForm.value};
    collection.push(book);
    books.location.reload();
    console.log(collection);
});

removeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    collection.splice(index, 1);
    books.location.reload();
    console.log(collection)
  })
})