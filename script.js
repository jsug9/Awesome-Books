const books = document.getElementById('books-container');
const formTitle = document.getElementById('title');
const formAuthor = document.getElementById('author');
const form = document.getElementById('form');

const today = new Date();
const date = document.getElementById('date');
date.innerHTML = today.toDateString();

const navItems = document.querySelectorAll('.nav-item');
const sectionBooks = document.querySelectorAll('.sect');

const newCollection = [];
class Books {
  constructor() {
    this.collection = [];
  }

  save() {
    window.localStorage.setItem('bookCollection', JSON.stringify(this.collection));
    for (let i = 0; i < this.collection.length; i += 1) {
      window.localStorage.setItem(i.toString(), JSON.stringify(this.collection[i]));
    }
  }

  add(book) {
    this.collection.push(book);
  }

  delete(index) {
    this.collection.splice(index, 1);
    this.save();
    window.location.reload();
  }

  checkStorage() {
    if (window.localStorage.getItem('bookCollection') !== null) {
      const array = JSON.parse(window.localStorage.getItem('bookCollection'));
      for (let i = 0; i < array.length; i += 1) {
        newCollection[i] = JSON.parse(window.localStorage.getItem(i.toString()));
      }
      this.collection = newCollection;
    }
  }

  showCollection() {
    for (let i = 0; i < this.collection.length; i += 1) {
      books.innerHTML += `  
      <div class="book-container">
        <p class="book-title">"${this.collection[i].title}" by ${this.collection[i].author}</p> 
        <button type="button" class="remove-button">Remove</button>
      </div>
      `;
    }
  }
}

const booksCollection = new Books();

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

if (storageAvailable('localStorage')) {
  booksCollection.add({ title: 'book 1', author: 'author 1' });
  booksCollection.add({ title: 'book 2', author: 'author 2' });
  booksCollection.checkStorage();

  booksCollection.showCollection();

  for (let i = 0; i < booksCollection.collection.length; i += 1) {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons[i].addEventListener('click', () => {
      booksCollection.delete(i);
    });
  }

  form.addEventListener('submit', () => {
    booksCollection.add({ title: formTitle.value, author: formAuthor.value });
    booksCollection.save();
    formTitle.value = '';
    formAuthor.value = '';
  });

  // window.localStorage.clear();
  // save();
}

navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    for (let i = 0; i < navItems.length; i += 1) {
      sectionBooks[i].style.display = 'none';
      sectionBooks[index].style.display = 'flex';
    }
  });
});

navItems[0].addEventListener('click', () => {
  window.location.reload();
});