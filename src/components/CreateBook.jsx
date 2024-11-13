import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../utils/config";

function CreateBook({fetchBooks}) {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [publisherAddress, setPublisherAddress] = useState('');
    const [storeList, setStoreList] = useState([{ name: '', address: '' }]);
    const [isbn, setIsbn] = useState('');
    const [errors, setErrors] = useState({});

    const handleStoreChange = (index, event) => {
        const newStoreList = storeList.map((store, i) => {
            if (i === index) {
                return { ...store, [event.target.name]: event.target.value };
            }
            return store;
        });
        setStoreList(newStoreList);
    };

    const addStore = () => {
        setStoreList([...storeList, { name: '', address: '' }]);
    };

    const removeStore = (index) => {
        const newStoreList = storeList.filter((_, i) => i !== index);
        setStoreList(newStoreList);
    };

    const validate = () => {
        const errors = {};
        if (!title.trim()) {
            errors.title = 'Title is required';
        }
        if (!authorName.trim()) {
            errors.authorName = 'Author name is required';
        }
        if (!publisherName.trim()) {
            errors.publisherName = 'Publisher name is required';
        }
        if (!publisherAddress.trim()) {
            errors.publisherAddress = 'Publisher address is required';
        }
        if (!isbn.trim()) {
            errors.isbn = 'ISBN is required';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newBook = {
            title: title,
            author: { authorName: authorName },
            publisher: {
                publisherName: publisherName,
                publisherAddress: publisherAddress,
            },
            storeList: storeList,
            isbn: isbn,
        };

        axios.post(`${BASE_URL}/addNewBook`, newBook)
            .then(response => {
                console.log('Book created successfully:', response.data);

                setTitle('');
                setAuthorName('');
                setPublisherName('');
                setPublisherAddress('');
                setStoreList([{ name: '', address: '' }]);
                setIsbn('');
                setErrors({});
                fetchBooks();



            })

            .catch(error => {
                console.error('There was an error creating the book!', error);
            });


    };

    return (
        <div>
            <h1>Create New Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                </div>
                <div>
                    <label>Author Name:</label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                    />
                    {errors.authorName && <p style={{ color: 'red' }}>{errors.authorName}</p>}
                </div>
                <div>
                    <label>Publisher Name:</label>
                    <input
                        type="text"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                        required
                    />
                    {errors.publisherName && <p style={{ color: 'red' }}>{errors.publisherName}</p>}
                </div>
                <div>
                    <label>Publisher Address:</label>
                    <input
                        type="text"
                        value={publisherAddress}
                        onChange={(e) => setPublisherAddress(e.target.value)}
                        required
                    />
                    {errors.publisherAddress && <p style={{ color: 'red' }}>{errors.publisherAddress}</p>}
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                    {errors.isbn && <p style={{ color: 'red' }}>{errors.isbn}</p>}
                </div>
                <div>
                    <label>Stores:</label>
                    {storeList.map((store, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Store Name"
                                value={store.name}
                                onChange={(e) => handleStoreChange(index, e)}
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Store Address"
                                value={store.address}
                                onChange={(e) => handleStoreChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => removeStore(index)}>Remove Store</button>
                        </div>
                    ))}
                    <button type="button" onClick={addStore}>Add Store</button>
                </div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
}

export default CreateBook;