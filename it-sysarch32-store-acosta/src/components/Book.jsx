import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebase';
import { doc, getDoc } from 'firebase/firestore';
import shoppingCart from '../assets/shopping-cart.png';
import './Book.css';

import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library with your publishable API key
const stripePromise = loadStripe('pk_test_51PFBXKFVDefnONPLYmhsZqNYBE0VQpKljHZXQ0lvIYCMVK6woY4GEpZGUFHu6Zf7IjIeb5FHBsPvBvHUCk0a1b1K00dNNKSbo9'); // Replace with your publishable key

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

     // Handle the click event when the user clicks the "Checkout" button
  const handleClick = async (title, price) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

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
                <button onClick={() => handleClick(book.title, book.price)}>Checkout</button>
            </div>
        </div>
    );
}

export default Book;
