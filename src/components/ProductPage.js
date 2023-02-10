import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.scss'
import { API_URL } from '../config/constants';
import { Button, message } from 'antd';

const ProductPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
        .then((result) => {
            setProduct(result.data.product);
        }).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        getProduct();
    }, [])
    if(product === null) {
        return <h1>상품정보를 받고 있습니다.</h1>
    }
    
    const onClickPurchase = () => {
        axios.post(`${API_URL}/purchase/${id}`)
        .then((result) => {
            message.info('결제가 완료되었습니다.');
            getProduct();
        })
        .catch((error) => {
            message.error(`에러가 발생했습니다. ${error.message}`);
        });
    } 

    return (
        <div>
            <button onClick={() => navigate(-1)} id="back-btn">이전화면</button>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt={product.seller} />
                <span className="product-seller">{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}원</div>
                <div id="createAt">2023.02.03</div>
                <Button type="primary" className='purchase' danger size='large' onClick={onClickPurchase} disabled={ product.soldout === 1 }>
                    즉시 결제하기
                </Button>
                <div id="description">{product.description}</div>
            </div>
        </div>
    );
};

export default ProductPage;