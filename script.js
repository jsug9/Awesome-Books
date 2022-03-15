const books = document.getElementById('books');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const form = document.getElementById('form');

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

function save() {
  window.localStorage.setItem('bookCollection', JSON.stringify(collection));
  for (let i = 0; i < collection.length; i += 1) {
    window.localStorage.setItem(i.toString(), JSON.stringify(collection[i]));
  }
}

// -----------------

function Book(title, author) {
  this.title = title;
  this.author = author;
}
class Books {
  constructor() {
    this.books = [];
  }

  save() {
    window.localStorage.setItem('bookCollection', JSON.stringify(this.books));
    for (let i = 0; i < this.books.length; i += 1) {
      window.localStorage.setItem(i.toString(), JSON.stringify(this.books[i]));
    }
  }

  add(book) {
    this.books.push(book);
  }

  delete(index) {
    this.books.splice(index, 1);
    this.save();
    window.location.reload()
  }

  checkStorage() {
    
  }
}

//-----------------

const newCollection = [];

let collection = [
  {
    title: '1',
    author: 'Teasteroo Testyy',
  },
  {
    title: '2',
    author: 'Teasteroo Testyy',
  },
];

if (storageAvailable('localStorage')) {
  if (window.localStorage.getItem('bookCollection') !== null) {
    const array = JSON.parse(window.localStorage.getItem('bookCollection'));
    for (let i = 0; i < array.length; i += 1) {
      newCollection[i] = JSON.parse(window.localStorage.getItem(i.toString()));
    }
    collection = newCollection;
  }

  for (let i = 0; i < collection.length; i += 1) {
    books.innerHTML += `  
      <div class="book-container">
        <p class="book-title">${collection[i].title}</p>
        <p class="book-author">${collection[i].author}</p>
        <button type="button" class="remove-button">Remove</button>
        <hr/>
      </div>
    `;
  }

  for (let i = 0; i < collection.length; i += 1) {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons[i].addEventListener('click', () => {
      collection.splice(i, 1);
      save();
      window.location.reload();
    });
  }

  form.addEventListener('submit', () => {
    collection.push({ title: formTitle.value, author: formAuthor.value });
    save();
  });

  // window.localStorage.clear();
  // save();
}