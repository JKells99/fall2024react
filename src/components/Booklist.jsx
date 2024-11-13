import React from 'react';

function Booklist({books}) {
    return (
        <div className="book-list">
            {books.map(book => (
                <div className="book-card" key={book.id}>
                    <h2>{book.title}</h2>
                    <p>Author Name: {book.author.authorName}</p>
                    <p>Publisher Name: {book.publisher.publisherName}</p>

                    <p> Stores Avail: {book.storeList.map(store => (
                        <p key={store.id}>{store.name}</p>

                    ))}</p>

                </div>
            ))}
        </div>
    );
}

export default Booklist;