import React, {useState, useEffect, useCallback} from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import { Pagination, PaginationItem, } from '@mui/material';
import useProductDataApi from './useProductDataApi';
import axios from 'axios';


const pageSize = 4;
const ProductPagination = ({setProducts}) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageNum = parseInt(query.get('page') || '1', 10);
    // const [productData, getProductData] = useProductDataApi();
    const [productData, setProductData] = useState([]);
    const [ pagination, setPagination ] = useState({
        count: 0,
        from: (pageNum - 1) * pageSize,
        to: (pageNum - 1) * pageSize + pageSize,
    });

    // const getData = ({from, to}) => {
    //     return new Promise((resolve, reject) => {
    //         const data = productData.slice(from, to);

    //         resolve({
    //             count: productData.length,
    //             data: data
    //         })
    //     });
    // }
    
    // useEffect(() => {
    //     const data = productData.slice(pagination.from, pagination.to);
    //     console.log("productData:", data)

    //     getData({from: pagination.from, to: pagination.to}).then(response => {
    //     // console.log("response:",response)
    //         setPagination({
    //             ...pagination,
    //             count: response.count
    //         });
    //         setProducts(response.data);
    //     })
    // },[pagination.from, pagination.to])

    
    console.log("pageNum:", pageNum)
    console.log("pagination:", pagination)

    useEffect(() => {
        const gettingProductData = async() => {
            const currentData = await axios.get('http://127.0.0.1:3001/dev/api/v1/goods')
                .then((response) => response.data)
                .catch( (error) => console.log(error));

            const result = currentData &&  currentData.goodsList.length > 0 ? currentData.goodsList.slice(pagination.from, pagination.to) : [];
            setPagination({
                ...pagination,
                count: currentData.goodsList.length,
                // count: productData.length
            });
            setProducts(result);
            console.log("1:", 1)
        };
        gettingProductData();
        
    
    },[pagination.from, pagination.to])
 
    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({...pagination, from: from, to: to})
        console.log("2:", 2)
    }

    // const getPageChange = useCallback (() => {
    //     const start = (pageNum - 1) * pageSize;
    //     const end = (pageNum - 1) * pageSize + pageSize;
    //     const data = productData.slice(start, end);
    //     setProducts(data);
    //     console.log("3:", 3)
    // },[]);

    // useEffect(() => {
    //     if(pageNum < `${Math.ceil(pagination.count / pageSize)}` || pageNum === `${Math.ceil(pagination.count / pageSize)}`) {
    //         getPageChange();
    //     } else {
    //         console.log("4:", 4)        
    //         return
    //     } 
    // },[getPageChange])

    return (
        <Pagination
            showFirstButton 
            showLastButton 
            size="large"
            page={pageNum}
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}
            renderItem={(item) => (
                <PaginationItem
                    disableRipple
                    component={NavLink}
                    to={`/newArrivals${item.page === 1 ? '' : `?page=${item.page}`}`}
                    // onChange={e=> setSearchParams({page: e.target.value})}
                    // onChange={handlePageChange}
                    {...item}
                />
            )}
        />
    )
}

export default ProductPagination;