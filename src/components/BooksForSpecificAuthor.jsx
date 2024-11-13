import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from "../utils/config";

const BooksForSpecificAuthor = () => {
    const [authorName, setAuthorName] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${BASE_URL}/getBooksForAuthor?authorName=${authorName}`); // Replace with your actual API URL
            setBooks(response.data);
        } catch (error) {
            console.error('There was an error fetching the author details!', error);
            setError('Author not found');
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search for an Author</h1>
            <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter author name"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {books.length > 0 ? (
                books.map(book => (
                    <div className="book-card" key={book.id}>
                        <h2>{book.title}</h2>
                        <p>Author Name: {book.author.authorName}</p>
                        <p>Publisher Name: {book.publisher.publisherName}</p>
                        <div>
                            <p>Stores Available:</p>
                            <ul>
                                {book.storeList.map(store => (
                                    <li key={store.id}>{store.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                !loading && <p>Please Enter An Author.</p>
            )}
        </div>
    );
};

export default BooksForSpecificAuthor;
