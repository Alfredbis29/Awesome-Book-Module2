/* eslint-disable no-loop-func */
/* eslint-disable max-classes-per-file */
const list = document.getElementById('list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addButton = document.querySelector('.buttonClass');
let current = 1;

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UseBook {
  static pages(pages) {
    const paginationUl = document.querySelector('.css-pagination');
    paginationUl.innerHTML = '';
    for (let i = 1; i <= pages; i += 1) {
      const paginationLi = document.createElement('li');
      paginationLi.className = 'p-item rounded-circle text-center d-flex justify-content-center';
      paginationLi.id = i;
      if (current === paginationLi.id) {
        paginationLi.classList.add('bg-dark');
        paginationLi.classList.add('p-active');
      } else {
        paginationLi.classList.remove('active');
      }
      paginationLi.addEventListener('click', () => {
        current = paginationLi.id;
        UseBook.displayBooks(current);
      });
      paginationLi.innerHTML = `<a class='p-link' href='#'>${i}
    </a>`;
      paginationUl.appendChild(paginationLi);
    }
  }

  static paginate(currentPage = 1, rows, array) {
    currentPage -= 1;
    const loopStart = rows * currentPage;
    const paginatedItems = array.slice(loopStart, loopStart + rows);
    return paginatedItems;
  }

  static createBook() {
    return new Book(bookTitle.value, bookAuthor.value);
  }

  static saveBook(newBook) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books === null) {
      localStorage.setItem('books', JSON.stringify([]));
    } else {
      const searchBooks = UseBook.findBooks();
      for (let i = 0; i < searchBooks.length; i += 1) {
        if (newBook.title === searchBooks[i].title) {
          return;
        }
      }
      if (newBook.title !== '') {
        books.push(newBook);
      }
      localStorage.setItem('books', JSON.stringify(books)); //
    }
  }

  static findBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  static displayBooks(currentPage) {
    const bookFound = UseBook.findBooks() || [];
    const reloadBooks = UseBook.paginate(currentPage, 6, bookFound);
    list.innerHTML = '';
    reloadBooks.forEach((abook) => {
      const book = document.createElement('tr');
      const btnContainer = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Remove';
      book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
      book.appendChild(btnContainer);
      deleteBtn.id = abook.title;
      deleteBtn.className = 'btn btn-dark';
      btnContainer.className = 'd-flex justify-content-end';
      list.appendChild(book);
      btnContainer.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', () => {
        if (deleteBtn.id === abook.title) {
          const index = bookFound.findIndex((rBook) => rBook.title === deleteBtn.id);
          bookFound.splice(index, 1);
          localStorage.setItem('books', JSON.stringify(bookFound));
          UseBook.displayBooks(current);
        }
      });
    });
    const paginationSize = Math.ceil(bookFound.length / 6);
    UseBook.pages(paginationSize);
  }
}

const newAdd = document.querySelector('.openNew');
const contactInfo = document.getElementsByClassName('contact')[0];
const bookList = document.getElementsByClassName('listBook')[0];
const inputs = document.querySelector('.inputs');
const openList = document.querySelector('.openList');
const openContact = document.querySelector('.openContact');

const menu = document.querySelector('.humburger');
const nav = document.querySelector('.navigation');
const cancelMenu = document.querySelector('.cancel-btn');

addButton.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  contactInfo.classList.remove('d-flex');
  bookList.classList.remove('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');
  const newBook = UseBook.createBook();
  UseBook.saveBook(newBook);
  UseBook.displayBooks();
  const books = UseBook.findBooks();
  if (books.length === 0) {
    const abook = UseBook.createBook();
    const book = document.createElement('tr');
    const btnContainer = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Remove';
    book.innerHTML = `
          <td class="p-3" ><span class="font-weight-bold text-capitalize">"${abook.title}" </span> by <span class="text-capitalize">  ${abook.author}</span></td
      `;
    book.appendChild(btnContainer);
    deleteBtn.id = abook.title;
    deleteBtn.className = 'btn btn-dark';
    btnContainer.className = 'd-flex justify-content-end';
    list.appendChild(book);
    btnContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      if (deleteBtn.id === abook.title) {
        const index = books.findIndex((rBook) => rBook.title === deleteBtn.id);
        books.splice(index, 1);
        list.removeChild(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    UseBook.saveBook(abook);
  }
  bookTitle.value = '';
  bookAuthor.value = '';
});

window.onload = () => {
  UseBook.displayBooks();
};

const timeNow = document.querySelector('.timeNow');

function getNumberSuffix(num) {
  if (num >= 11 && num <= 13) return 'th';

  const lastDigit = num.toString().slice(-1);

  switch (lastDigit) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'rd';
    default:
      return 'th';
  }
}

/* eslint-disable */
const { DateTime } = luxon;
/* eslint-enable */
setInterval(() => {
  const today = DateTime.local();
  const modified = today
    .toLocaleString({ ...DateTime.DATETIME_MED_WITH_SECONDS, month: 'long' })
    .split(' ');
  const dateNum = parseInt(modified[1], 10);
  modified[1] = dateNum + getNumberSuffix(dateNum);
  modified[modified.length - 1] = modified[modified.length - 1].toLowerCase();
  timeNow.innerHTML = modified.join(' ');
}, 1000);

newAdd.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  bookList.classList.add('d-none');
  inputs.classList.remove('d-none');
  inputs.classList.add('d-flex');
  contactInfo.classList.remove('d-flex');

  nav.classList.add('navigation-Anim');
  setTimeout(() => {
    nav.classList.remove('navigation-Anim');
    nav.classList.remove('mob-navigation');
    nav.classList.add('navigation');
    contactInfo.classList.remove('flue');
    inputs.classList.remove('flue');
    bookList.classList.remove('flue');
    timeNow.parentElement.classList.remove('flue');
  }, 400);
});

openContact.addEventListener('click', () => {
  contactInfo.classList.remove('d-none');
  contactInfo.classList.add('d-flex');
  bookList.classList.add('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');

  nav.classList.add('navigation-Anim');
  setTimeout(() => {
    nav.classList.remove('navigation-Anim');
    nav.classList.remove('mob-navigation');
    nav.classList.add('navigation');
    contactInfo.classList.remove('flue');
    inputs.classList.remove('flue');
    bookList.classList.remove('flue');
    timeNow.parentElement.classList.remove('flue');
  }, 400);
});

openList.addEventListener('click', () => {
  contactInfo.classList.add('d-none');
  contactInfo.classList.remove('d-flex');
  bookList.classList.remove('d-none');
  inputs.classList.add('d-none');
  inputs.classList.remove('d-flex');

  nav.classList.add('navigation-Anim');
  setTimeout(() => {
    nav.classList.remove('navigation-Anim');
    nav.classList.remove('mob-navigation');
    nav.classList.add('navigation');
    contactInfo.classList.remove('flue');
    inputs.classList.remove('flue');
    bookList.classList.remove('flue');
    timeNow.parentElement.classList.remove('flue');
  }, 400);
});

menu.addEventListener('click', () => {
  nav.classList.add('mob-navigation-anim');
  nav.classList.remove('navigation');
  contactInfo.classList.add('flue');
  inputs.classList.add('flue');
  bookList.classList.add('flue');
  timeNow.parentElement.classList.add('flue');
  setTimeout(() => {
    nav.classList.remove('mob-navigation-anim');
    nav.classList.add('mob-navigation');
  }, 10);
});

cancelMenu.addEventListener('click', () => {
  nav.classList.add('navigation-Anim');
  setTimeout(() => {
    nav.classList.remove('navigation-Anim');
    nav.classList.remove('mob-navigation');
    nav.classList.add('navigation');
    contactInfo.classList.remove('flue');
    inputs.classList.remove('flue');
    bookList.classList.remove('flue');
    timeNow.parentElement.classList.remove('flue');
  }, 400);
});
