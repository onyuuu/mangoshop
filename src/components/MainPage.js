import React, { useState, useEffect } from 'react';
import './MainPage.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Carousel} from 'antd';
import { API_URL } from '../config/constants';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const MainPage = () => {
    let [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/products`)
        .then((result) => {
            products = result.data.product;
            setProducts(products);
        }).catch((error) => {
            console.log(`통신실패 : ${error}`)
        });

        axios.get(`${API_URL}/banners`)
        .then((result) => {
            const banners = result.data.banners;
            setBanners(banners);
        }).catch((error) => {
            console.error('에러발생 : ', error);
        });
    }, []);

    return (
        <div>
            <Carousel autoplay autoplaySpeed={2000}>
                {banners.map((banner, idx) => {
                    return (
                        <div id="banner" key={idx}>
                            <img src={`${API_URL}/${banner.imageUrl}`} alt="mainImg" />
                        </div>
                    )
                })}
            </Carousel>
            <h1>Products</h1>
            <div id="product-list">
                {products.map((product, idx) => {
                    return (
                        <div className="product-card" key={idx}>
                            {product.soldout === 1 ? <div className="product-blur"></div> : null}
                            <Link className='product-link' to={`/ProductPage/${product.id}`}>
                                <div>
                                    <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} className="product-img" />
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