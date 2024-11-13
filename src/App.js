import './App.css';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Booklist from "./components/Booklist";
import Home from "./components/Home";
import BooksForSpecificAuthor from "./components/BooksForSpecificAuthor";
import Header from "./components/Header";
import CreateBook from "./components/CreateBook";
import {fetchBooks} from "./utils/apicalls";

function App() {
    const [books, setBooks] = useState([]);

    const loadBooks = useCallback(async () => {
        try {
            const booksData = await fetchBooks();
            setBooks(booksData);
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booklist" element={<Booklist books={books} />} />
                <Route path="/booksForAuthor" element={<BooksForSpecificAuthor />} />
                <Route path="/createANewBook" element={<CreateBook fetchBooks={loadBooks} />} />
            </Routes>
        </div>
    );
}

export default App;
