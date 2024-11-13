// src/apiCalls.js
import axios from 'axios';
import {BASE_URL} from "./config";


export const fetchBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/listAllBooks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};
