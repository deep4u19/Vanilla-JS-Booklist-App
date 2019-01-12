// Book class : Represents a Book

class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}



// UI class : Handles UI Tasks

class UI{
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }

// Shows books to UI
    static addBookToList(book){
        const list=document.getElementById('book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
            <td>${book.title}</td>         
            <td>${book.author}</td>         
            <td>${book.isbn}</td>         
            <td><a class='delete btn btn-danger sm'>X</a></td>         
        `;
        list.appendChild(row);
    }

// Deletes Book

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            
        };
    } 

//Shows alert
    
    static showAlert(message, alertClass){
        let div=document.createElement('div');
        div.className=`alert alert-${alertClass}`;
        div.appendChild(document.createTextNode(message));
        let container=document.querySelector('.cont');
        let form=document.getElementById('book-form');
        container.insertBefore(div,form);

// Removes after 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);

    }



// Clears inputs after each submission
    static clearField(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }

}



// Storage class : Handles Storage Tasks


class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static deleteBook(isbn){
        let books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}



// Event : Displays Book

document.addEventListener('DOMContentLoaded',UI.displayBooks);


// Event : Adds a Book

const bookForm=document.getElementById('book-form');

// Handling form submit
    bookForm.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        const title=document.getElementById('title').value;
        const author=document.getElementById('author').value;
        const isbn=document.getElementById('isbn').value;


// Form validation

        if(title===''||author===''||isbn===''){
            UI.showAlert('Please fill every field','danger');
        }else{

//  Book instance with form values
                const book=new Book(title,author,isbn);
                console.log(book);
                UI.addBookToList(book);
                Store.addBook(book);
                UI.showAlert('Book Added','success');
                UI.clearField();
        }


    });



// Event : Deletes a Book
 
    document.getElementById('book-list')
    .addEventListener('click',(e)=>{
        // Delete from UI
        UI.deleteBook(e.target);

// Delete from localstorage
        Store.deleteBook(
            e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('Book deleted','success')
    })