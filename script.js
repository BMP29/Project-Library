const myLibrary = [];

const btnAdd = document.getElementById('addCard');
const formBook = document.getElementById('formBook');
const btnConfirm = document.getElementById('confirm');
const btnCancel = document.getElementById('cancel');

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const remove = document.getElementById('remove');


function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read == true;
    this.index = index;
}

function addBookToLibrary() {
    myLibrary.push(new Book(title.value, author.value, pages.value, read.value, myLibrary.length-1));
    console.log(myLibrary.length-1);
    addBookToList();
}

function addBookToList() {
    const cards = document.getElementById('cards');

    const card = document.createElement('div');
    const h2Title = document.createElement('h2');
    const pAuthor = document.createElement('p');
    const pPages = document.createElement('p');
    const btnRead = document.createElement('button');
    const btnRemove = document.createElement('button');

    btnRemove.setAttribute('id', 'remove');

    card.classList.add('card');
    btnRemove.setAttribute('data-index-number', myLibrary.length-1);
    card.setAttribute('data-index-number', myLibrary.length-1);
    btnRead.setAttribute('data-index-number', myLibrary.length-1);

    btnRemove.addEventListener('click', () => {
        removeBook(btnRemove.getAttribute('data-index-number'));
    });

    btnRead.addEventListener('click', () => {
        toggleRead(btnRemove.getAttribute('data-index-number'), btnRead);
    });


    h2Title.textContent = title.value;
    pAuthor.textContent = author.value;
    pPages.textContent = pages.value;
    btnRead.textContent = (read.checked == true ? "Read" : "Not Yet");
    btnRemove.textContent = "Remove";

    btnRead.classList.add('btnCard');
    btnRemove.classList.add('btnCard');
    if(read.checked == true) {
        btnRead.style.backgroundColor = '#88ff88';
    }else {
        btnRead.style.backgroundColor = '#ff8888';
    }

    card.appendChild(h2Title);
    card.appendChild(pAuthor);
    card.appendChild(pPages);
    card.appendChild(btnRead);
    card.appendChild(btnRemove);
    cards.appendChild(card);
}

function removeBook(index) {
    myLibrary[index] = null;
    const card = document.querySelector(`[data-index-number="${index}"]`);
    card.remove();
}

function toggleRead(index, btn) {
    if(myLibrary[index].read === true) {
        myLibrary[index].read = false;
        btn.textContent = 'Not yet';
        btn.style.backgroundColor = '#ff8888';
    } else {
        myLibrary[index].read = true;
        btn.textContent = 'Read';
        btn.style.backgroundColor = '#88ff88';
    }
}

btnAdd.addEventListener('click', () => {
    formBook.showModal();
});

formBook.addEventListener('submit', (event) => {
    addBookToLibrary();
    event.preventDefault();
    formBook.close();
});

btnCancel.addEventListener('click', () => { 
    formBook.close(); 
});