
import './App.css';
import {Route, Router, Routes, useLocation, useNavigate} from "react-router-dom";
import Booklist from "./components/Booklist";
import axios from "axios";
import {useEffect, useState} from "react";
import Home from "./components/Home";
import BooksForSpecificAuthor from "./components/BooksForSpecificAuthor";
import Header from "./components/Header";
import CreateBook from "./components/CreateBook";

function App() {
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const navigator = useNavigate();



    useEffect(() => {
        axios.get('http://localhost:8080/listAllBooks')
            .then(response => {
                setBooks(response.data);
            });
    }, []);





  return (
    <div className="App">
        <Header/>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booklist" element={<Booklist books={books} />} />
            <Route path="/booksForAuthor" element={<BooksForSpecificAuthor />} />
            <Route path="/createANewBook" element={<CreateBook />} />
        </Routes>

    </div>
  );
}

export default App;
