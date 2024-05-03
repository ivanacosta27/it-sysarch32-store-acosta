import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import shoppingCart from '../assets/shopping-cart.png';
import './Book.css';

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null); 

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookDoc = await getDoc(doc(db, 'Books', id));
                if (bookDoc.exists()) {
                    setBook({ id: bookDoc.id, ...bookDoc.data() });
                } else {
                    console.log('Book not found');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]); 

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="grid-container book-details">
            <div className="grid-item">
                <img src={book.cover} alt={book.title} />
            </div>
            <div className="grid-item">
               <h2 className="book-title">{book.title}</h2>
                <p className="book-synopsis">Synopsis: {book.summary}</p>
                <p className="book-author">Author: {book.author}</p>
                <p className="book-price">Price: {book.price}</p>
            </div>
        </div>
    );
}

export default Book;
