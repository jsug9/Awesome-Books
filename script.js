const collection = [
    {
        title: '1', 
        author: 'Teasteroo Testyy'
    }, 
    {
        title: '2', 
        author: 'Teasteroo Testyy'
    },
]

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

const books = document.getElementById('books');
collection.forEach((book) => {
 addBook(book);
})


const titleForm = document.getElementById('title');
const authorForm = document.getElementById('author');
const form = document.getElementById('add-book');
const submitButton = document.getElementById('submit');
const removeButtons = document.querySelectorAll('.remove-button');
const bookContainer = document.querySelectorAll('.book-container');

submitButton.addEventListener('click', () => {
    const book = {title: titleForm.value, author: authorForm.value};
    collection.push(book);
    addBook(book);
    console.log(collection);
});

removeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    collection.splice(index, 1)
    books.removeChild(bookContainer[index])
    console.log(collection)
  })
})