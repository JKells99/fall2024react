import './App.css';
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Booklist from "./components/Booklist";
import Home from "./components/Home";
import BooksForSpecificAuthor from "./components/BooksForSpecificAuthor";
import Header from "./components/Header";
import CreateBook from "./components/CreateBook";
import { BASE_URL } from "./utils/config";

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/listAllBooks`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booklist" element={<Booklist books={books} />} />
                <Route path="/booksForAuthor" element={<BooksForSpecificAuthor />} />
                <Route path="/createANewBook" element={<CreateBook fetchBooks={fetchBooks} />} />
            </Routes>
        </div>
    );
}

export default App;
