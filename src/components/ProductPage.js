import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>상품 상세 페이지</h1>
            <h2>{id}번째 상품 상세 페이지</h2>
        </div>
    );
};

export default ProductPage;