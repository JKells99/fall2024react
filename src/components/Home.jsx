import React from 'react';
import Booklist from "./Booklist";
import CreateBook from "./CreateBook";
import BooksForSpecificAuthor from "./BooksForSpecificAuthor";

function Home({books,booksForAuthor}) {
    return (
        <div>
            <Booklist books={books}/>
            <CreateBook/>
            <BooksForSpecificAuthor booksForAuthor = {booksForAuthor} />

        </div>
    );
}

export default Home;