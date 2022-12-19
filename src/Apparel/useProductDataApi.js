import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const fetchProductData = async() => {
    let productResult = await axios.get('http://127.0.0.1:3001/dev/api/v1/goods')
        .then((response) => response.data)
        .catch( (error) => console.log(error));
    return productResult;
}

const useProductDataApi = () => {
    const [ productData, setProductData ] = useState([]);
    const getProductData = useCallback (() => {
        const gettingProductData = async() => {
            const currentData = await fetchProductData();
            setProductData(currentData["goodsList"]);
        };

        gettingProductData();
    },[productData]);
    
    return [productData, getProductData];
}

export default useProductDataApi;