const collection = [
    {
        title: 'loreum ipsum', 
        author: 'Teasteroo Testyy'
    }, 
    {
        title: 'loreum ipsum', 
        author: 'Teasteroo Testyy'
    },
]

const books = document.getElementById('books');
collection.forEach((book) => {
 const cardHTML = `<div>
 <p>${book.title}</p>
 <p>${book.author}</p>
 <button class="remove-button">Remove</button>
 <hr />
</div>`;
books.insertAdjacentHTML("beforeend", cardHTML);
})


const title = document.getElementById('title');
const author = document.getElementById('author');
const form = document.getElementById('add-book');

form.addEventListener('submit', (event)=>{
    collection.push({title: title.innerHTML, author: author.innerHTML
    });
    console.log(collection);
});



