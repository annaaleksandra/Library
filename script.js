//Firebase initilizz
var firebaseConfig = {
    apiKey: "AIzaSyACSkmE4UPawLbUQrw3nLCojIHDHE2cfkM",
    authDomain: "library-a2290.firebaseapp.com",
    databaseURL: "https://library-a2290.firebaseio.com",
    projectId: "library-a2290",
    storageBucket: "library-a2290.appspot.com",
    messagingSenderId: "952967245108",
    appId: "1:952967245108:web:e3454580393f68fc370961"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const button = document.getElementById('button');
button.addEventListener('click', addBookToLibrary);

let myLibrary = [];

function Book (title, author, numOfPages) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;

    this.info = function() {
        return this.title + " by " + this.author + ", " + this.numOfPages + " pages, "
    }
}

//store information in firebase

let messagesRef = firebase.database().ref('messages');

document.getElementById("button").addEventListener('click', submitForm);

function submitForm(e) {
    e.preventDefault();

    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    
    saveMessage(bookTitle, bookAuthor, bookPages);

}

function saveMessage(bookTitle, bookAuthor, bookPages) {
    let newMessagesRef = messagesRef.push();
    newMessagesRef.set({
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages
    });
}




function addBookToLibrary() {

    //get user input and store it in a variable
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookPages = document.getElementById('pages').value;

    let newBook = new Book(bookTitle, bookAuthor, bookPages)

    let addToArray = myLibrary.push(newBook);

    //create "book cover" and its information 
    const newDiv = document.createElement('div'); 
    newDiv.classList.add('book');

    const newTitle = document.createElement('h1');
    newTitle.textContent = bookTitle;
    
    const newAuthor = document.createElement('p');
    newAuthor.textContent = "by " + bookAuthor;
    newAuthor.style.fontStyle = "italic";
    
    const newPages = document.createElement('p');
    newPages.textContent = bookPages + " pages ";
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.classList.add("top-right")
    deleteButton.addEventListener('click', deleteBook)

    function deleteBook() {
        bookshelf.removeChild(newDiv)
    };

    const toggleButton = document.createElement('button');
    toggleButton.textContent = "Read";
    toggleButton.style.backgroundColor = "white";
    toggleButton.style.color = "black";
    toggleButton.classList.add("toggle");
    toggleButton.addEventListener('click', toggle)

    function toggle() {
        if (toggleButton.textContent === "Read") {
            toggleButton.textContent = "Not read";
            toggleButton.style.backgroundColor = "black";
            toggleButton.style.color = "white";
        } else if (toggleButton.textContent === "Not read") {
            toggleButton.textContent = "Read";
            toggleButton.style.backgroundColor = "white";
            toggleButton.style.color = "black";
        }   
    }

    newDiv.appendChild(deleteButton);
   
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newPages);
    
    newDiv.appendChild(toggleButton);
    bookshelf.appendChild(newDiv);

    
    /*empty input fields    I DISABLED THIS  to allow firebase work for this project
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";*/
}

// to allow adding books without using the form
function addBooksManually(title, author, numOfPages) {
    let newManualBook = new Book(title, author, numOfPages)
    myLibrary.push(newManualBook);

    const newDiv = document.createElement('div'); 
    newDiv.classList.add('book');

    const newTitle = document.createElement('h1');
    newTitle.textContent = title;
    
    const newAuthor = document.createElement('p');
    newAuthor.textContent = "by " + author;
    newAuthor.style.fontStyle = "italic";
    
    const newPages = document.createElement('p');
    newPages.textContent = numOfPages + " pages ";

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.classList.add("top-right")
    deleteButton.addEventListener('click', deleteBook)

    function deleteBook() {
        bookshelf.removeChild(newDiv)
    };

    const toggleButton = document.createElement('button');
    toggleButton.textContent = "Read";
    toggleButton.style.backgroundColor = "white";
    toggleButton.style.color = "black";
    toggleButton.classList.add("toggle");
    toggleButton.addEventListener('click', toggle)

    function toggle() {
        if (toggleButton.textContent === "Read") {
            toggleButton.textContent = "Not read";
            toggleButton.style.backgroundColor = "black";
            toggleButton.style.color = "white";
        } else if (toggleButton.textContent === "Not read") {
            toggleButton.textContent = "Read";
            toggleButton.style.backgroundColor = "white";
            toggleButton.style.color = "black";
        }   
    }

    newDiv.appendChild(deleteButton);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newAuthor);
    newDiv.appendChild(newPages);
    newDiv.appendChild(toggleButton);
    
    bookshelf.appendChild(newDiv);
}



addBooksManually("The Hobbit", "J.R.R Tolkien", 295)
addBooksManually("JavaScript & JQuery", "Jon Duckett", 615)

