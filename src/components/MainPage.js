import React, { useState, useEffect } from 'react';
import './MainPage.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const MainPage = () => {
    let [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/products')
        .then((result) => {
            products = result.data.product;
            setProducts(products);
        }).catch((error) => {
            console.log(`통신실패 : ${error}`)
        });
    }, []);

    return (
        <div>
            <div id="banner">
                <img src="./images/banners/banner1.png" alt="mainImg" />
            </div>
            <h1>Products</h1>
            <div id="product-list">
                {products.map((product, idx) => {
                    return (
                        <div className="product-card" key={idx}>
                            <Link className='product-link' to={`/ProductPage/${product.id}`}>
                                <div>
                                    <img src={product.imageUrl} alt={product.name} className="product-img" />
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-price">{product.price}</span>
                                    <div className='product-footer'>
                                        <span className="product-seller">
                                            <img src="./images/icons/avatar.png" alt="avatar" className="product-avatar" />
                                            <span>{product.seller}</span>
                                        </span>
                                        <span className='product-date'>{dayjs(product.createdAt).fromNow()}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MainPage;