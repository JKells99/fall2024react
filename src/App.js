import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Booklist from "./components/Booklist";
import axios from "axios";
import {useEffect, useState} from "react";
import Home from "./components/Home";

function App() {
    const [books, setBooks] = useState([]);
    const[booksforauthor, setBooksforauthor] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/listAllBooks')
            .then(response => {
                setBooks(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/getBooksForAuthor?authorName=Lee%20Child')
            .then(response => {
                setBooksforauthor(response.data);
            });
    }, []);




  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home books ={books} booksForAuthor = {booksforauthor}/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
