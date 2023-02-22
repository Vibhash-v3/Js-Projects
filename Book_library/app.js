//Book Cunstructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI cunstructor
function UI(){}

UI.prototype.addBook = function(Book){
    //create Element
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${Book.title}</tr>
                    <td>${Book.author}</tr>
                    <td>${Book.isbn}</tr>
                    <td><a href= '#' class = 'delete'>X</a></tr>`;

    list.appendChild(row);
}

UI.prototype.setMessage = function(msg, className){

    const box = document.createElement('div');//create element
    box.className = `alert ${className}`;//set class
    box.appendChild(document.createTextNode(msg));//providing text

    //get element
    const container = document.querySelector('.container');//parent element
    const form = document.querySelector('#book-form');//insert before this
    container.insertBefore(box , form);//insert

    //timeout of message
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2000);

}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


//clear field
UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    author = document.getElementById('author').value = '';
    isbn = document.getElementById('isbn').value = '';
}



//Event

document.getElementById('book-form').addEventListener('submit',
function (e){
    //variables
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    const book = new Book(title, author, isbn);
    
    const ui = new UI();

    //validate
    if(title === ''|| author === ''|| isbn === ''){
        ui.setMessage('No field should be Empty','error');
    }else{
        ui.addBook(book);
        ui.setMessage('Book added', 'success');
        ui.clearField();
    }
    
    e.preventDefault();
});

//delete book
document.querySelector('#book-list').addEventListener('click', function(e){
    
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.setMessage('book removed', 'success');

    e.preventDefault();
})