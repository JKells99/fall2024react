import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/booklist">Booklist</Link>
                    </li>
                    <li>
                        <Link to="/booksForAuthor">Books for author</Link>
                    </li>
                    <li>
                        <Link to="/createANewBook">Add New Book To System</Link>
                    </li>
                </ul>
            </nav>
        </div>


    );
}

export default Header;