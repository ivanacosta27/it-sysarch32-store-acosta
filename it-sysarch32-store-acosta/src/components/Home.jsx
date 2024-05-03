import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import { Link } from 'react-router-dom';
import './Home.css';
import { db } from '../configs/firebase';
import { getDocs, collection } from 'firebase/firestore';

function Home() {
    const [bookList, setBookList] = useState([]);
    const bookCollectionRef = collection(db, "Books");

    useEffect(() => {
        const getItemList = async () => {
            try {
                const querySnapshot = await getDocs(bookCollectionRef);
                const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBookList(fetchedItems);
            } catch (error) {
                console.error(error);
            }
        };

        getItemList();
    }, []);

    return (
        <div>
            <Banner />
            <div className="home-container">
                <div className="items-grid">
                    {bookList.map((book, index) => (
                        <Link to={`/book/${book.id}`} key={book.id} className="item-card">
                            <div className="item-card">
                                <img className="item-image" src={book.cover} alt={book.title} />
                                <div className="item-details">
                                    <h4>{book.title}</h4>
                                    <p>Cost: {book.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
