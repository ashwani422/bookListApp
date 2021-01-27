const form = document.querySelector('#form');
const list = document.querySelector('#list');
let deleteBtn = document.querySelectorAll('.list-delete');


const demo = document.querySelector('#demo');

let books = [];

console.log(localStorage);

// To show the list of Stored books on refresh or obloading
if (localStorage.length) {

  books = JSON.parse(localStorage.getItem("books"));
  
  books.forEach((book, index) => {

    const li = document.createElement('li');
    li.className = "list-items";
    li.innerHTML = `${book}<span class="list-delete">&#10008;</span>`;

    if (list.appendChild(li)) {
      deleteBtn = document.querySelectorAll('.list-delete');
      const lastDeleteBtn = deleteBtn[deleteBtn.length - 1];
      lastDeleteBtn.addEventListener('click', e => {

        if (confirm("Are you sure?")) {
          e.target.parentElement.remove();

          let str = e.target.parentElement.innerText;
          const bookName = str.slice(0, str.length - 1);

          if (book == bookName) {
            books.splice(index, 1);
            localStorage.setItem("books", JSON.stringify(books));
          }          

          showMessage('Item deleted', 'success');
        }

      });
    }

  });

}


// Event Handler
form.addEventListener('submit', e => {

  e.preventDefault();  //To prevent form submition by default
  
  const itemValue = document.querySelector('input[type = text]').value;

  if(itemValue == "") {
    showMessage('Enter something in the box', 'danger');
    return 0;
  }

  books.push(itemValue);

  localStorage.setItem("books", JSON.stringify(books));

  document.querySelector('input[type = text]').value = '';

  const li = document.createElement('li');
  li.className = "list-items";
  li.innerHTML = `${itemValue}<span class="list-delete">&#10008;</span>`;

  if (list.appendChild(li)) { 
    showMessage('Item added', 'success');
    deleteBtn = document.querySelectorAll('.list-delete');
    const lastDeleteBtn = deleteBtn[deleteBtn.length - 1];
    lastDeleteBtn.addEventListener('click', e => {

      if (confirm("Are you sure?")) {
        e.target.parentElement.remove();

          let str = e.target.parentElement.innerText;
          const bookName = str.slice(0, str.length - 1);

          books.forEach((book, index) => {
            if (book == bookName) {
              books.splice(index, 1);
              localStorage.setItem("books", JSON.stringify(books));
            }
          });         

          showMessage('Item deleted', 'success');
      }

    });
  }

});



// Message div
function showMessage(msg, type) {
  const listWrapper = document.querySelector('#list-wrapper');
  const listBox = document.querySelector('.list-box');

  const div = document.createElement('div');

  div.className = `${type}`;

  div.textContent = msg;

  listWrapper.insertBefore(div, listBox);

  setTimeout(() => {
    div.remove();
  }, 2000);
}

